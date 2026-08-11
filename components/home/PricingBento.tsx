"use client";

import { motion } from "motion/react";
import { websiteServices, CONTACT_PERSON } from "@/data/data";
import { ArrowRight, Check } from "lucide-react";

export default function PricingBento() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section id="harga" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="text-[12px] font-medium tracking-[0.2em] uppercase text-[#B8943E] mb-3">
            Pilih Paket yang Tepat
          </p>
          <h2 className="font-playfair text-4xl md:text-[2.5rem] text-stone-900 mb-5">
            Investasi untuk Momen Berharga
          </h2>
          <p className="text-[15px] text-stone-500 max-w-lg mx-auto leading-relaxed">
            Dari undangan digital elegan hingga sistem website custom, temukan paket yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 grid-flow-dense"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Digital Invitation Starter Package */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 md:col-span-3 bg-[#FAF8F5] rounded-xl p-5 md:p-10 border border-stone-200/60 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 relative overflow-hidden"
          >
            <div className="flex-1 relative z-10 w-full text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-white rounded-full border border-stone-200 text-[#B8943E] text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-4">Mulai Dari</div>
              <h3 className="font-playfair text-2xl md:text-4xl text-stone-900 mb-2">Undangan Digital</h3>
              <div className="flex items-end justify-center md:justify-start gap-2 mb-3 md:mb-4">
                <span className="text-xl md:text-3xl font-bold text-stone-900">Rp 100.000</span>
                <span className="text-stone-500 text-xs md:text-sm mb-0.5 md:mb-1">/ nett</span>
              </div>
              <p className="text-stone-500 text-[14px] leading-relaxed max-w-md">
                Sudah termasuk tema premium, galeri foto, RSVP form, backsound musik, dan masa aktif selamanya.
              </p>
            </div>
            <div className="relative z-10">
              <a
                href={`https://wa.me/${CONTACT_PERSON}?text=${encodeURIComponent(
                  "Halo admin Calaraya, saya tertarik membuat Undangan Digital. Boleh dibantu prosesnya?"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-stone-900 text-white text-[13px] md:text-[14px] font-medium rounded-xl hover:bg-[#B8943E] transition-all duration-300 whitespace-nowrap"
              >
                Pesan Sekarang
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
            </div>
            {/* Decorative background element */}
            <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-[#B8943E]/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* Website Services */}
          {websiteServices.slice(0, 3).map((service, i) => {
            const isPopular = service.popular;
            const colSpan = isPopular ? "col-span-2 md:col-span-1" : "col-span-1 md:col-span-1";
            
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`rounded-xl p-4 md:p-8 flex flex-col border transition-all duration-300 relative bg-white ${colSpan} ${
                  isPopular 
                    ? "border-[#B8943E] shadow-[0_10px_40px_rgba(184,148,62,0.1)] md:-translate-y-2 md:scale-105 z-10" 
                    : "border-stone-200/60 shadow-sm hover:border-[#B8943E]/40 hover:shadow-md"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 md:px-4 py-1 md:py-1.5 bg-[#B8943E] text-white text-[8px] md:text-[10px] font-bold tracking-wider uppercase rounded-full shadow-md whitespace-nowrap">
                    Paling Laris
                  </div>
                )}

                <h3 className={`font-playfair text-stone-900 mb-1 md:mb-2 ${isPopular ? "text-lg md:text-xl" : "text-[15px] md:text-xl"}`}>{service.title}</h3>
                <p className={`text-stone-500 mb-4 md:mb-6 ${isPopular ? "text-[11px] md:text-[12px]" : "text-[10px] md:text-[12px] line-clamp-2 md:line-clamp-none"}`}>{service.description}</p>
                
                <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b border-stone-100">
                  <p className="text-[8px] md:text-[10px] text-stone-400 mb-1 uppercase tracking-wider">Mulai Dari</p>
                  <p className={`${isPopular ? "text-xl md:text-2xl" : "text-sm md:text-2xl"} font-semibold text-stone-900`}>{service.priceStart}</p>
                </div>

                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-1">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 md:gap-2">
                      <div className="mt-0.5 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#B8943E]/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2 h-2 md:w-2.5 md:h-2.5 text-[#B8943E]" />
                      </div>
                      <span className="text-[10px] md:text-[13px] text-stone-600 leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${CONTACT_PERSON}?text=${encodeURIComponent(
                    `Halo admin, saya tertarik dengan paket pembuatan ${service.title}. Boleh konsultasi lebih lanjut?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 text-[11px] md:text-[13px] font-medium rounded-xl transition-all duration-300 ${
                    isPopular 
                      ? "bg-[#B8943E] text-white hover:bg-[#a07c2d] shadow-md shadow-[#B8943E]/20" 
                      : "bg-stone-50 text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200/60"
                  }`}
                >
                  Konsultasi Paket
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
