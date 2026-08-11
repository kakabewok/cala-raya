"use client";

import { motion } from "motion/react";
import { features } from "@/data/data";

export default function BentoFeatures() {
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
    <section id="fitur" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="text-[12px] font-medium tracking-[0.2em] uppercase text-[#B8943E] mb-3">
            Kenapa Memilih Calaraya?
          </p>
          <h2 className="font-playfair text-4xl md:text-[2.5rem] text-stone-900 mb-5">
            Dibuat dengan Sepenuh Hati
          </h2>
          <p className="text-[15px] text-stone-500 max-w-lg mx-auto leading-relaxed">
            Setiap detail dirancang untuk memberikan pengalaman terbaik bagi Anda dan tamu undangan Anda.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[160px] md:auto-rows-[200px] grid-flow-dense"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.slice(0, 7).map((feature, i) => {
            // Logic to create asymmetric bento grid
            // Feature 1 (Desain Premium) spans 2x2
            const isLarge = feature.title === "Desain Premium";
            // Feature 2 and 3 span 2x1
            const isMedium = feature.title === "Proses Cepat" || feature.title === "Custom Request";
            
            const colSpan = isLarge ? "col-span-2 md:col-span-2" : isMedium ? "col-span-2 md:col-span-2" : "col-span-1 md:col-span-1";
            const rowSpan = isLarge ? "row-span-2 md:row-span-2" : "row-span-1 md:row-span-1";
            const Icon = feature.IconComponent;

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`group bg-[#FAF8F5] rounded-xl p-4 md:p-8 border border-stone-200/60 hover:border-[#B8943E]/30 hover:bg-white hover:shadow-[0_8px_30px_rgb(184,148,62,0.08)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden ${colSpan} ${rowSpan}`}
              >
                {/* Decorative background glow for large item */}
                {isLarge && (
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#B8943E]/5 rounded-full blur-3xl group-hover:bg-[#B8943E]/10 transition-colors duration-500" />
                )}

                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-2xl bg-white border border-stone-100 flex items-center justify-center shadow-sm group-hover:bg-[#B8943E] group-hover:border-[#B8943E] transition-all duration-500 ${isLarge ? "mb-4 md:mb-8 w-10 h-10 md:w-14 md:h-14" : "mb-2 md:mb-4"}`}>
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 text-stone-600 group-hover:text-white transition-colors duration-500 ${isLarge ? "w-5 h-5 md:w-6 md:h-6" : ""}`} />
                </div>
                
                <div className="relative z-10">
                  <h3 className={`font-playfair text-stone-900 mb-1 md:mb-2 ${isLarge ? "text-xl md:text-3xl" : "text-[14px] md:text-xl"}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-stone-500 leading-relaxed ${isLarge ? "text-[12px] md:text-base max-w-sm" : "text-[10px] md:text-[13px]"}`}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
