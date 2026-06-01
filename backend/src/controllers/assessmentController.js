const {
  DailyInput,
  Todo
} = require('../models')

const { generatePersonalizedTodos } = require('../services/geminiTodoService');

const createAssessment =
  async (req, res) => {
    try {
      const userId =
        req.user.id

      const {
        stress,
        anxiety,
        emotional_pressure,
        academic_pressure,
        study_hours,
        sleep_hours,
        financial_pressure,
        family_expectation,
        social_support,
        activity_hours,
      } = req.body

      // =================
      // AI INTEGRATION
      // =================
      const { predictMentalHealth } = require('../services/aiPredictionService');
      const { Prediction } = require('../models');

      const { Op } = require('sequelize');

      // 0. Cegah Input Ganda di Hari yang Sama
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const existingAssessment = await DailyInput.findOne({
        where: {
          user_id: userId,
          createdAt: {
            [Op.gte]: startOfDay,
          },
        },
      });

      if (existingAssessment) {
        return res.status(400).json({
          message: 'Anda sudah mengisi asesmen hari ini. Silakan kembali besok untuk mengisi data harian baru.',
          assessment: existingAssessment
        });
      }

      // Kalkulasi skor mentah (Maksimum 70)
      const rawScore = stress + anxiety + emotional_pressure + academic_pressure + financial_pressure + family_expectation + (10 - social_support);
      
      // Konversi ke persentase 0-100% untuk UI
      const totalScore = Math.round((rawScore / 70) * 100);

      // Panggil API AI
      const aiResult = await predictMentalHealth(req.body);
      
      let burnoutLevel = 'Rendah';
      let mentalHealthPred = 'Normal';

      if (aiResult.success && !aiResult.fallback) {
        // Translasi response AI ("High", "Medium", "Low") ke format DB ("Tinggi", "Sedang", "Rendah")
        const rawPrediction = aiResult.data.burnout_prediction;
        if (rawPrediction === 'High' || rawPrediction === 'Tinggi') burnoutLevel = 'Tinggi';
        else if (rawPrediction === 'Medium' || rawPrediction === 'Sedang') burnoutLevel = 'Sedang';
        else burnoutLevel = 'Rendah';

        mentalHealthPred = aiResult.data.mental_health_prediction;
      } else {
        // Fallback Logic (jika API AI Railway mati/timeout)
        if (totalScore >= 70) burnoutLevel = 'Tinggi';
        else if (totalScore >= 40) burnoutLevel = 'Sedang';
        mentalHealthPred = 'Tidak dapat diakses (Fallback)';
      }

      // SMART OVERRIDE: Mencegah inkonsistensi AI. Jika skor persentase mentah sangat tinggi, paksa level Tinggi.
      if (totalScore >= 75) {
          burnoutLevel = 'Tinggi';
      } else if (totalScore <= 20) {
          burnoutLevel = 'Rendah';
      }

      // Rekomendasi berdasarkan level (Tetap menggunakan IF-ELSE karena AI tidak mengembalikan rekomendasi)
      let recommendation = [];
      if (burnoutLevel === 'Tinggi') {
        recommendation = ['Tidur cukup minimal 7 jam', 'Kurangi beban belajar', 'Istirahat berkala', 'Pertimbangkan konsultasi'];
      } else if (burnoutLevel === 'Sedang') {
        recommendation = ['Perbaiki manajemen waktu', 'Kurangi screen time', 'Tambah aktivitas fisik'];
      } else {
        recommendation = ['Pertahankan kebiasaan sehat'];
      }

      // =================
      // AI TODO GENERATION (GEMINI)
      // =================
      const { todos: generatedTodos, source: todoSource } = await generatePersonalizedTodos(burnoutLevel, mentalHealthPred, req.body, totalScore);

      // Duplicate Prevention: Hapus todo AI lama yang masih pending
      await Todo.destroy({
        where: {
          user_id: userId,
          generated_by_ai: true,
          status: 'pending'
        }
      });

      // Mapping format untuk database
      const todosToSave = generatedTodos.map(todo => ({
        user_id: userId,
        title: todo.title,
        description: todo.description,
        priority: todo.priority || 'medium',
        status: 'pending',
        generated_by_ai: true,
        source: todoSource
      }));

      // =================
      // DERIVE MOOD & INSIGHT
      // =================
      let moodToday = req.body.mood_today;
      if (!moodToday) {
        if (totalScore <= 20) moodToday = 'Sangat Baik';
        else if (totalScore <= 40) moodToday = 'Baik';
        else if (totalScore <= 60) moodToday = 'Lelah';
        else if (totalScore <= 80) moodToday = 'Stres Berat';
        else moodToday = 'Kritis';
      }

      const dailyInsightText = `Hari ini kondisimu berada di level ${burnoutLevel} dengan skor ${totalScore}%. Berdasarkan analisis, kamu perlu memperhatikan ${
        stress > 6 ? 'tingkat stres' : sleep_hours < 6 ? 'jam tidur' : 'beban aktivitas'
      }mu.`;

      // =================
      // SAVE DATABASE
      // =================

      // 1. Simpan ke DailyInput (Agar Result.jsx dan History.jsx tetap aman & kompatibel)
      const assessment = await DailyInput.create({
        user_id: userId,
        stress, anxiety, emotional_pressure, academic_pressure, study_hours,
        sleep_hours, financial_pressure, family_expectation, social_support, activity_hours,
        burnout_score: totalScore,
        burnout_level: burnoutLevel,
        recommendation,
      });

      // 2. Simpan ke tabel Predictions (Phase 4 & 5)
      await Prediction.create({
        daily_input_id: assessment.id,
        user_id: userId,
        risk_level: burnoutLevel,
        burnout_score: totalScore,
        mental_health_index: 0, 
        analysis_text: mentalHealthPred,
        recommendation: recommendation.join(', '),
        burnout_prediction: aiResult.success && !aiResult.fallback ? aiResult.data.burnout_prediction : 'N/A',
        mental_health_prediction: mentalHealthPred,
        raw_assessment_input: req.body,
        // FIELD BARU PHASE 4
        daily_insight: dailyInsightText,
        daily_recommendations: generatedTodos, // JSONB array of todos
        mood_today: moodToday
      });

      // Simpan Todo baru
      if (todosToSave.length > 0) {
        await Todo.bulkCreate(todosToSave);
      }

      res.status(201).json(
        assessment
      )
    } catch (error) {
      console.log(
        error
      )

      res.status(500).json(
        {
          message:
            'Server error',
          error:
            error.message,
        }
      )
    }
  }

module.exports = {
  createAssessment,
}