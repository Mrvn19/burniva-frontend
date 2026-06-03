import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Apa itu Burniva?',
    answer: 'Burniva adalah platform kesehatan mental berbasis AI yang membantu mahasiswa memahami kondisi mental harian dan mendeteksi burnout lebih dini.',
  },
  {
    question: 'Bagaimana AI Burniva bekerja?',
    answer: 'Burniva menganalisis data riwayat harianmu seperti jam tidur, aktivitas, dan tingkat stres untuk mendeteksi pola yang berpotensi menyebabkan burnout, kemudian memberikan rekomendasi yang spesifik.',
  },
  {
    question: 'Berapa lama assessment dilakukan?',
    answer: 'Proses assessment dirancang sangat efisien dan hanya membutuhkan waktu kurang dari 3 menit setiap harinya.',
  },
  {
    question: 'Apakah data saya aman?',
    answer: 'Ya, privasi dan keamanan data kamu adalah prioritas utama kami. Semua informasi disimpan dengan aman dan tidak akan dibagikan kepada pihak ketiga.',
  },
  {
    question: 'Apakah Burniva gratis?',
    answer: 'Ya, fitur inti Burniva sepenuhnya gratis untuk membantu seluruh mahasiswa menjaga keseimbangan hidup akademik dan kesehatan mental mereka.',
  },
]

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0) // Default buka yang pertama

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section id="faq" className="py-14 md:py-20 bg-slate-50 relative">
      <div className="w-full px-4 md:px-16 lg:px-24">
        
        <div className="text-center mb-10 md:mb-12">
          <p className="inline-block bg-primary-100 text-primary-600 text-xs md:text-sm font-medium px-3 py-1 rounded-full mb-3 md:mb-4">
            FAQ
          </p>
          <h2 className="text-xl md:text-3xl font-bold text-slate-800 mb-3 md:mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto">
            Semua yang perlu kamu tahu tentang Burniva.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            
            return (
              <div 
                key={index} 
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-transparent' 
                    : 'border border-slate-100 hover:border-slate-200'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer outline-none"
                >
                  <span className={`text-sm md:text-base font-semibold ${isOpen ? 'text-slate-900' : 'text-slate-700'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-5 md:pb-6' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed px-5 md:px-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default FAQSection
