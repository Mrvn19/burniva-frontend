const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Fallback mapping based on Burnout Percentage (0-100)
 */
const getFallbackTodos = (score) => {
  let todos = [];

  if (score <= 10) { // 0-10% Very Healthy
    todos = [
      { title: "Pertahankan Rutinitas Sehat", description: "Pola hidupmu sudah sangat baik. Lanjutkan kebiasaan sehat ini.", priority: "low" },
      { title: "Evaluasi Goals", description: "Beri dirimu apresiasi dan tetapkan target kecil untuk minggu depan.", priority: "low" },
      { title: "Waktu Hobi", description: "Luangkan 30 menit untuk melakukan hobi yang kamu senangi.", priority: "low" }
    ];
  } else if (score <= 20) { // 10-20% Low Risk
    todos = [
      { title: "Jaga Keseimbangan", description: "Jangan lupa untuk tetap mengambil jeda di sela-sela belajar.", priority: "low" },
      { title: "Minum Air Putih", description: "Pastikan hidrasi tercukupi agar fokus tetap terjaga.", priority: "low" },
      { title: "Tidur Teratur", description: "Pertahankan jam tidur 7-8 jam per malam.", priority: "low" }
    ];
  } else if (score <= 30) { // 20-30% Mild Risk
    todos = [
      { title: "Jalan Santai", description: "Lakukan jalan santai 15 menit untuk meregangkan otot.", priority: "medium" },
      { title: "Batasi Multitasking", description: "Fokus kerjakan satu tugas pada satu waktu agar tidak cepat lelah.", priority: "medium" },
      { title: "Digital Detox Singkat", description: "Jauhkan layar HP selama 30 menit sebelum tidur.", priority: "low" }
    ];
  } else if (score <= 40) { // 30-40% Light Stress
    todos = [
      { title: "Terapkan Pomodoro", description: "Gunakan teknik 25 menit belajar, 5 menit istirahat.", priority: "medium" },
      { title: "Curhat dengan Teman", description: "Luangkan waktu ngobrol santai untuk melepas penat akademik.", priority: "medium" },
      { title: "Latihan Pernapasan", description: "Tarik napas dalam-dalam 3 kali saat merasa sedikit tertekan.", priority: "low" }
    ];
  } else if (score <= 50) { // 40-50% Moderate Stress
    todos = [
      { title: "Prioritaskan Tugas", description: "Catat tugas paling penting saja untuk dikerjakan hari ini.", priority: "high" },
      { title: "Kurangi Kafein", description: "Batasi konsumsi kopi agar tidur malam lebih berkualitas.", priority: "medium" },
      { title: "Istirahat Mental", description: "Tutup buku dan laptop selama 1 jam, lakukan aktivitas menyenangkan.", priority: "medium" }
    ];
  } else if (score <= 60) { // 50-60% Medium Burnout
    todos = [
      { title: "Evaluasi Beban Akademik", description: "Cek kembali jadwalmu, jangan ragu menolak tugas tambahan.", priority: "high" },
      { title: "Tidur Tepat Waktu", description: "Malam ini usahakan tidur sebelum jam 11 malam.", priority: "high" },
      { title: "Jeda Sosmed", description: "Kurangi paparan informasi berlebihan dari media sosial hari ini.", priority: "medium" },
      { title: "Makan Bergizi", description: "Perhatikan asupan makanan, jangan sampai telat makan.", priority: "medium" }
    ];
  } else if (score <= 70) { // 60-70% High Burnout
    todos = [
      { title: "Stop Kerjakan Tugas", description: "Hari ini hentikan dulu pekerjaan berat. Kamu butuh istirahat total.", priority: "high" },
      { title: "Hubungi Keluarga", description: "Berbicara dengan orang tua/keluarga bisa meredakan beban emosional.", priority: "high" },
      { title: "Tidur Ekstra", description: "Luangkan waktu untuk tidur siang atau tidur lebih awal malam ini.", priority: "high" },
      { title: "Journaling", description: "Tuliskan apa yang mengganjal di pikiranmu untuk melepaskan stres.", priority: "medium" }
    ];
  } else if (score <= 80) { // 70-80% Severe Burnout
    todos = [
      { title: "Self-Care Total", description: "Ambil cuti sehari dari tugas kampus. Keselamatan mentalmu nomor 1.", priority: "high" },
      { title: "Cari Bantuan Profesional", description: "Pertimbangkan untuk menjadwalkan konseling di layanan kampus.", priority: "high" },
      { title: "Lakukan Relaksasi", description: "Dengarkan musik menenangkan atau meditasi selama 30 menit.", priority: "high" }
    ];
  } else if (score <= 90) { // 80-90% Critical Burnout
    todos = [
      { title: "Cari Pertolongan", description: "Bicaralah dengan konselor atau psikiater secepatnya.", priority: "high" },
      { title: "Hentikan Semua Aktivitas", description: "Fokus 100% pada pemulihan diri. Jangan pikirkan nilai/tugas.", priority: "high" },
      { title: "Cerita ke Orang Terdekat", description: "Jangan pendam sendirian, bagikan kondisi ini pada sahabat/keluarga.", priority: "high" }
    ];
  } else { // 90-100% Emergency Burnout
    todos = [
      { title: "Hubungi Layanan Krisis", description: "Segera hubungi layanan kesehatan mental profesional atau hotline krisis.", priority: "high" },
      { title: "Jauhkan Diri dari Pemicu", description: "Isolasi diri dari sumber stres (tugas, lingkungan toksik) sementara waktu.", priority: "high" },
      { title: "Minta Pendampingan", description: "Pastikan ada orang terdekat yang mendampingimu hari ini.", priority: "high" }
    ];
  }

  return todos.slice(0, 5); // Max 5
};

/**
 * Sanitize and parse Gemini JSON response.
 */
const parseGeminiResponse = (text) => {
  try {
    let cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Sometimes it might not start with [, so let's find the array brackets
    const startIdx = cleanText.indexOf('[');
    const endIdx = cleanText.lastIndexOf(']');
    if (startIdx !== -1 && endIdx !== -1) {
      cleanText = cleanText.substring(startIdx, endIdx + 1);
    }

    const parsed = JSON.parse(cleanText);
    
    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title) {
      return parsed;
    }
    throw new Error("Invalid JSON structure from Gemini");
  } catch (error) {
    console.error("❌ Failed to parse Gemini response:", error.message);
    return null;
  }
};

/**
 * Main service function to generate personalized todos.
 */
const generatePersonalizedTodos = async (burnoutPrediction, mentalHealthPrediction, assessmentInput, totalScore) => {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy_key') {
      console.warn("⚠️ GEMINI_API_KEY is missing or dummy. Using fallback todos.");
      return { todos: getFallbackTodos(totalScore), source: 'fallback' };
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const prompt = `
Anda adalah seorang "Burnout Recovery Assistant" yang berempati, profesional, namun ramah dan sangat memahami kehidupan mahasiswa di Indonesia.
Tugas Anda adalah merancang rekomendasi To-Do List harian untuk membantu mahasiswa menurunkan tingkat burnout.

KONTEKS MAHASISWA:
- Persentase Burnout: ${totalScore}%
- Kategori Burnout (AI Utama Burniva): ${burnoutPrediction}
- Kondisi Mental: ${mentalHealthPrediction}
- Tingkat Stres (1-10): ${assessmentInput.stress}
- Beban Akademik (1-10): ${assessmentInput.academic_pressure}
- Jam Tidur Terakhir: ${assessmentInput.sleep_hours} jam
- Dukungan Sosial (1-10): ${assessmentInput.social_support}

ATURAN WAJIB (STRICT RULES):
1. PERSONALISASI: Berikan tugas yang SPESIFIK berdasarkan parameter di atas (Misal: jika stres 9 dan tidur 4 jam, prioritaskan tidur. Jika akademik tinggi, prioritaskan manajemen waktu).
2. REALISTIS & MAHASISWA-FRIENDLY: Tugas harus bisa dikerjakan anak kos. Jangan beri saran mahal/medis. Gunakan bahasa kasual namun memotivasi (contoh: "Terapkan pomodoro 25 menit", "Tidur siang 30 menit", "Hubungi ibu di rumah").
3. JUMLAH TUGAS: Buatkan TEPAT 5 tugas spesifik. Tidak boleh lebih dan tidak boleh kurang.
4. FORMAT WAJIB: Kembalikan HANYA format JSON Array yang valid. DILARANG menambahkan teks pembuka/penutup seperti "Ini hasilnya:" atau menggunakan markdown json.
5. PRIORITAS: Tentukan prioritas berdasarkan urgensi masalah ("high", "medium", "low").

Skema JSON:
[
  {
    "title": "Judul Tugas Pendek (Max 5 kata)",
    "description": "Deskripsi tindakan konkret dan kalimat penyemangat (Max 15 kata)",
    "priority": "high" | "medium" | "low"
  }
]
`;

    // Timeout protection (15 seconds to give Gemini enough time before falling back)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API Timeout")), 15000)
    );

    const result = await Promise.race([
      model.generateContent(prompt),
      timeoutPromise
    ]);

    const responseText = result.response.text();
    const todos = parseGeminiResponse(responseText);
    
    if (todos) {
      console.log(`✅ [LOG: Gemini Success] Sukses generate ${todos.length} Gemini To-Dos`);
      return { todos: todos, source: 'gemini' };
    } else {
      console.log("⚠️ [LOG: Gemini Failed] Gagal parse JSON. Menggunakan fallback system.");
      return { todos: getFallbackTodos(totalScore), source: 'fallback' };
    }

  } catch (error) {
    console.error("❌ [LOG: Gemini Failed] Gemini API Error:", error.message);
    return { todos: getFallbackTodos(totalScore), source: 'fallback' };
  }
};

module.exports = {
  generatePersonalizedTodos
};
