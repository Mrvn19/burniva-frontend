const { User, DailyInput, Todo, Prediction } = require("../models");
const { Op } = require("sequelize");

// GET STATS (Dashboard)
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.count({ where: { role: 'user' } });
    
    // Asumsi pengguna aktif = ada DailyInput hari ini
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const activeToday = await DailyInput.count({
      distinct: true,
      col: 'user_id',
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    const totalAssessments = await DailyInput.count();
    
    // AI Predictions Today = Assessment hari ini
    const aiPredictions = await DailyInput.count({
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    const burnoutTinggi = await DailyInput.count({ where: { burnout_level: 'Tinggi' } });
    const burnoutSedang = await DailyInput.count({ where: { burnout_level: 'Sedang' } });
    const burnoutRendah = await DailyInput.count({ where: { burnout_level: 'Rendah' } });

    res.json({
      totalUsers,
      activeToday,
      totalAssessments,
      aiPredictions,
      burnoutTinggi,
      burnoutSedang,
      burnoutRendah
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: 'user' },
      attributes: ['id', 'name', 'email', 'profile_image', 'university', 'major', 'semester', 'is_suspended', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });

    // Cari last burnout score tiap user (bisa dioptimasi dengan query yang lebih baik nanti, ini simple approach)
    const usersWithStats = await Promise.all(users.map(async (user) => {
      const lastInput = await DailyInput.findOne({
        where: { user_id: user.id },
        include: [{ model: Prediction }],
        order: [['createdAt', 'DESC']]
      });
      
      const assessmentsCount = await DailyInput.count({ where: { user_id: user.id } });

      return {
        ...user.toJSON(),
        last_burnout_score: lastInput?.burnout_score || null,
        last_burnout_prediction: lastInput?.Prediction?.burnout_prediction || lastInput?.burnout_level || 'Belum ada',
        last_mental_health_prediction: lastInput?.Prediction?.mental_health_prediction || 'N/A',
        total_assessments: assessmentsCount,
        last_assessment_date: lastInput ? lastInput.createdAt.toISOString().split('T')[0] : null
      };
    }));

    res.json(usersWithStats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id, role: 'user' },
      attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// SUSPEND USER
const suspendUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (user.role === 'admin') {
      return res.status(403).json({ message: "Tidak dapat menangguhkan admin" });
    }

    user.is_suspended = !user.is_suspended;
    await user.save();

    res.json({ message: user.is_suspended ? "User ditangguhkan" : "Status suspend dicabut", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// RESET DAILY INPUT (Allow user to submit again today)
const resetDailyInput = async (req, res) => {
  try {
    const { Op } = require("sequelize");
    const userId = req.params.id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Cari DailyInput hari ini
    const dailyInput = await DailyInput.findOne({
      where: {
        user_id: userId,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    if (!dailyInput) {
      return res.status(404).json({ message: "User belum melakukan assessment hari ini" });
    }

    // Hapus Prediction yang berelasi
    await Prediction.destroy({ where: { daily_input_id: dailyInput.id } });
    
    // Hapus Todo AI yang di-generate hari ini (karena AI akan generate ulang)
    await Todo.destroy({
      where: {
        user_id: userId,
        generated_by_ai: true,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    // Hapus DailyInput
    await dailyInput.destroy();

    res.json({ message: "Akses Cek Harian berhasil di-reset. User dapat mengisi ulang hari ini." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (user.role === 'admin') {
      return res.status(403).json({ message: "Tidak dapat menghapus admin" });
    }

    // Cascade delete via hooks/DB atau manual
    await DailyInput.destroy({ where: { user_id: user.id } });
    await Todo.destroy({ where: { user_id: user.id } });
    await user.destroy();

    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET MONITORING DATA (MOCK FOR NOW, BISA DIKEMBANGKAN LEBIH LANJUT)
const getMonitoringData = async (req, res) => {
  try {
    const { Op } = require('sequelize');
    const { period } = req.query; // 'hari_ini', 'mingguan', 'bulanan'
    
    let dateFilter = {};
    const now = new Date();
    
    if (period === 'hari_ini') {
      const startOfDay = new Date(now.setHours(0, 0, 0, 0));
      dateFilter = { createdAt: { [Op.gte]: startOfDay } };
    } else if (period === 'mingguan') {
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = { createdAt: { [Op.gte]: lastWeek } };
    } else if (period === 'bulanan') {
      const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      dateFilter = { createdAt: { [Op.gte]: lastMonth } };
    }

    const inputs = await DailyInput.findAll({
      where: dateFilter,
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: Prediction }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Menghapus duplikasi baris jika terjadi anomali di database (misal: 1 input punya 2 prediksi)
    const uniqueInputs = Array.from(new Map(inputs.map(item => [item.id, item])).values());

    const formatted = uniqueInputs.map(input => ({
      id: input.id,
      name: input.User?.name || 'Unknown',
      mentalHealth: input.Prediction?.mental_health_prediction || 'N/A',
      risk: input.burnout_level,
      burnoutScore: input.burnout_score,
      date: input.createdAt.toISOString().split('T')[0],
      createdAt: input.createdAt
    })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ANALYTICS DATA (REAL AGGREGATION OVER 7 DAYS WITH FILTERS)
const getAnalyticsData = async (req, res) => {
  try {
    const { period, univ, prodi } = req.query;
    
    // Konfigurasi Filter
    const userWhere = {};
    if (univ) userWhere.university = univ;
    if (prodi) userWhere.major = prodi;

    const today = new Date();
    // 7 Hari Terakhir
    const dates = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      return d;
    });

    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    // Ambil semua data 7 hari terakhir
    const startDate = dates[0];
    const endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999);

    let dateWhere = {
      createdAt: {
        [Op.between]: [startDate, endDate]
      }
    };
    
    if (period === 'Semua Periode') {
        dateWhere = {}; // Bebas
    }

    const inputs = await DailyInput.findAll({
      where: dateWhere,
      include: [{
          model: User,
          where: Object.keys(userWhere).length > 0 ? userWhere : undefined,
          attributes: ['id']
      }],
      attributes: ['burnout_score', 'createdAt']
    });

    // Inisialisasi map per hari
    const trendMap = {};
    const activityMap = {};

    dates.forEach(d => {
      const dayStr = dayNames[d.getDay()];
      trendMap[dayStr] = { sum: 0, count: 0 };
      activityMap[dayStr] = 0;
    });

    // Populate data
    inputs.forEach(input => {
      const dayStr = dayNames[input.createdAt.getDay()];
      if (trendMap[dayStr]) {
        trendMap[dayStr].sum += input.burnout_score;
        trendMap[dayStr].count += 1;
        activityMap[dayStr] += 1;
      }
    });

    // Konversi ke format array untuk chart
    const trendData = dates.map(d => {
      const dayStr = dayNames[d.getDay()];
      const item = trendMap[dayStr];
      const avg = item.count > 0 ? Math.round(item.sum / item.count) : 0;
      return { name: dayStr, value: avg };
    });

    const activityData = dates.map(d => {
      const dayStr = dayNames[d.getDay()];
      return { name: dayStr, value: activityMap[dayStr] };
    });

    // Distribusi Keseluruhan
    const includeUserOptions = Object.keys(userWhere).length > 0 ? [{ model: User, where: userWhere, attributes: ['id'] }] : [];

    const totalRendah = await DailyInput.count({ 
      where: { ...dateWhere, burnout_level: 'Rendah' },
      include: includeUserOptions
    });
    const totalSedang = await DailyInput.count({ 
      where: { ...dateWhere, burnout_level: 'Sedang' },
      include: includeUserOptions
    });
    const totalTinggi = await DailyInput.count({ 
      where: { ...dateWhere, burnout_level: 'Tinggi' },
      include: includeUserOptions
    });

    // --- DATA PERTUMBUHAN PENGGUNA (CUMULATIVE) ---
    const allUsers = await User.findAll({ where: { role: 'user' }, attributes: ['createdAt'] });
    
    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const currentMonthIndex = new Date().getMonth();
    const activeMonths = allMonths.slice(0, currentMonthIndex + 1);

    const growthMap = {};
    activeMonths.forEach(m => growthMap[m] = 0);

    allUsers.forEach(u => {
      const monthIdx = u.createdAt.getMonth();
      if (monthIdx <= currentMonthIndex) {
        const m = allMonths[monthIdx];
        if (growthMap[m] !== undefined) growthMap[m]++;
      }
    });
    
    let cumulative = 0;
    const userGrowthData = activeMonths.map(m => {
      cumulative += growthMap[m];
      return { name: m, value: cumulative };
    });

    // --- DATA KORELASI TIDUR & BURNOUT (GROUPED) ---
    const sleepInputs = await DailyInput.findAll({
      where: dateWhere,
      include: includeUserOptions,
      attributes: ['sleep_hours', 'burnout_score']
    });

    const sleepGroups = {
      '< 4 jam': { sum: 0, count: 0 },
      '4–6 jam': { sum: 0, count: 0 },
      '6–8 jam': { sum: 0, count: 0 },
      '> 8 jam': { sum: 0, count: 0 }
    };

    sleepInputs.forEach(input => {
      const h = Number(input.sleep_hours) || 0;
      let label = '';
      if (h < 4) label = '< 4 jam';
      else if (h >= 4 && h <= 6) label = '4–6 jam';
      else if (h > 6 && h <= 8) label = '6–8 jam';
      else label = '> 8 jam';

      sleepGroups[label].sum += input.burnout_score;
      sleepGroups[label].count += 1;
    });

    const sleepCorrelationData = Object.keys(sleepGroups).map(label => {
      const group = sleepGroups[label];
      const averageScore = group.count > 0 ? Math.round(group.sum / group.count) : 0;
      return {
        label,
        averageScore,
        count: group.count
      };
    });

    // --- DATA SEMESTER ---
    const semMap = {};
    for (let i = 1; i <= 8; i++) semMap[`S${i}`] = { rendah: 0, sedang: 0, tinggi: 0 };
    
    const inputsWithSemester = await DailyInput.findAll({
      where: dateWhere,
      include: [{
          model: User,
          where: Object.keys(userWhere).length > 0 ? userWhere : undefined,
          attributes: ['semester']
      }],
      attributes: ['burnout_level']
    });

    inputsWithSemester.forEach(input => {
      const semStr = `S${input.User?.semester || 1}`;
      if (!semMap[semStr]) semMap[semStr] = { rendah: 0, sedang: 0, tinggi: 0 };
      if (input.burnout_level === 'Rendah') semMap[semStr].rendah++;
      else if (input.burnout_level === 'Sedang') semMap[semStr].sedang++;
      else if (input.burnout_level === 'Tinggi') semMap[semStr].tinggi++;
    });

    const semesterData = Object.keys(semMap).sort().map(k => ({
      name: k,
      ...semMap[k]
    }));

    res.json({
      trendData,
      activityData,
      userGrowthData,
      sleepCorrelationData,
      semesterData,
      distributionData: [
        { name: 'Rendah', value: totalRendah, color: '#10b981' },
        { name: 'Sedang', value: totalSedang, color: '#f59e0b' },
        { name: 'Tinggi', value: totalTinggi, color: '#ef4444' }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET RECENT ACTIVITIES
const getRecentActivities = async (req, res) => {
  try {
    const recentInputs = await DailyInput.findAll({
      include: [{ model: User, attributes: ['name', 'profile_image'] }],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    const activities = recentInputs.map(input => ({
      id: input.id,
      name: input.User?.name || 'User',
      action: 'menyelesaikan assessment',
      time: input.createdAt.toISOString(),
      initial: (input.User?.name || 'U').charAt(0).toUpperCase(),
      photoUrl: input.User?.profile_image || null,
      color: 'bg-primary-500'
    }));

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET FILTER OPTIONS
const getFilterOptions = async (req, res) => {
  try {
    // Get unique universities
    const univs = await User.findAll({
      attributes: [[User.sequelize.fn('DISTINCT', User.sequelize.col('university')), 'university']],
      where: { role: 'user', university: { [Op.not]: null } }
    });

    // Get unique majors
    const majors = await User.findAll({
      attributes: [[User.sequelize.fn('DISTINCT', User.sequelize.col('major')), 'major']],
      where: { role: 'user', major: { [Op.not]: null } }
    });

    res.json({
      universities: univs.map(u => u.university).filter(Boolean),
      majors: majors.map(m => m.major).filter(Boolean)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// EXPORT CSV DATA
const exportAssessmentData = async (req, res) => {
  try {
    const inputs = await DailyInput.findAll({
      include: [
        { model: User, attributes: ['name', 'email', 'university', 'major'] },
        { model: Prediction }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Buat Header CSV
    const csvHeader = "ID,Nama,Email,Universitas,Program Studi,Kesehatan Mental,Prediksi Burnout,Jam Tidur,Tanggal Assessment\n";
    
    // Buat Baris CSV
    const csvRows = inputs.map(input => {
      const u = input.User || {};
      const date = input.createdAt.toISOString().split('T')[0];
      // Escape koma pada teks
      const escapeCSV = (text) => text ? `"${String(text).replace(/"/g, '""')}"` : '""';
      
      return [
        input.id,
        escapeCSV(u.name),
        escapeCSV(u.email),
        escapeCSV(u.university),
        escapeCSV(u.major),
        input.Prediction?.mental_health_prediction || 'N/A',
        input.Prediction?.burnout_prediction || input.burnout_level,
        input.sleep_hours || 0,
        date
      ].join(',');
    });

    const csvData = csvHeader + csvRows.join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="Burniva_Assessment_Report.csv"');
    res.status(200).send(csvData);

  } catch (error) {
    console.error("CSV Export Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const xlsx = require('xlsx');

// EXPORT EXCEL DATA (.XLSX)
const exportExcelData = async (req, res) => {
  try {
    const inputs = await DailyInput.findAll({
      include: [
        { model: User, attributes: ['name', 'email', 'university', 'major'] },
        { model: Prediction }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Format data untuk worksheet
    const excelData = inputs.map(input => {
      const u = input.User || {};
      const date = input.createdAt.toISOString().split('T')[0];
      return {
        'ID': input.id,
        'Nama Lengkap': u.name || '',
        'Email': u.email || '',
        'Universitas': u.university || '',
        'Program Studi': u.major || '',
        'Kesehatan Mental': input.Prediction?.mental_health_prediction || 'N/A',
        'Prediksi Burnout': input.Prediction?.burnout_prediction || input.burnout_level,
        'Jam Tidur': input.sleep_hours || 0,
        'Tanggal Assessment': date
      };
    });

    // Buat Workbook dan Worksheet
    const worksheet = xlsx.utils.json_to_sheet(excelData);
    
    // Autoresize kolom biar rapih
    const colWidths = [
      { wch: 36 }, // ID
      { wch: 25 }, // Nama
      { wch: 30 }, // Email
      { wch: 35 }, // Univ
      { wch: 25 }, // Prodi
      { wch: 20 }, // Kesehatan Mental
      { wch: 20 }, // Prediksi Burnout
      { wch: 10 }, // Tidur
      { wch: 20 }, // Tanggal
    ];
    worksheet['!cols'] = colWidths;

    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Laporan Burnout");

    // Convert ke Buffer
    const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Burniva_Assessment_Report.xlsx"');
    res.status(200).send(excelBuffer);

  } catch (error) {
    console.error("Excel Export Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getStats,
  getAllUsers,
  getUserById,
  suspendUser,
  resetDailyInput,
  deleteUser,
  getMonitoringData,
  getAnalyticsData,
  getRecentActivities,
  getFilterOptions,
  exportAssessmentData,
  exportExcelData
};
