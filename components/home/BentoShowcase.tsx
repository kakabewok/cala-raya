"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { allThemes, CONTACT_PERSON } from "@/data/data";
import { ArrowRight, Star } from "lucide-react";

export default function BentoShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 },
    },
  };

  // Bento grid sizing: first card large, alternate between medium and small
  const getCardSize = (index: number) => {
    if (index === 0) return "featured"; // 2 cols, 2 rows
    if (index === 3) return "tall";     // 1 col, 2 rows
    return "normal";                    // 1 col, 1 row
  };

  return (
    <section id="koleksi" className="py-24 bg-[#FAF8F5] relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="text-[12px] font-medium tracking-[0.2em] uppercase text-[#B8943E] mb-3">
            Koleksi Eksklusif
          </p>
          <h2 className="font-playfair text-4xl md:text-[2.5rem] text-stone-900 mb-5">
            Desain yang Menceritakan Kisahmu
          </h2>
          <p className="text-[15px] text-stone-500 max-w-lg mx-auto leading-relaxed">
            Pilih dari koleksi tema premium kami, dirancang khusus untuk memberikan kesan mendalam pada setiap tamu undanganmu.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 auto-rows-[250px] md:auto-rows-[300px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Render ALL themes — no slicing */}
          {allThemes.map((theme, i) => {
            const size = getCardSize(i);
            const isFeatured = size === "featured";
            const isTall = size === "tall";

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                onClick={() => window.open(theme.previewUrl, "_blank")}
                className={`group cursor-pointer relative bg-white rounded-xl overflow-hidden border border-stone-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-xl hover:border-[#B8943E]/30 transition-all duration-500 active:scale-[0.98] flex flex-col ${
                  isFeatured
                    ? "col-span-2 row-span-2"
                    : isTall
                    ? "col-span-1 row-span-2"
                    : "col-span-1 row-span-1"
                }`}
              >
                {/* Image Section */}
                <div className="relative w-full flex-1 min-h-[90px] md:min-h-[120px] overflow-hidden">
                  <Image
                    src={theme.image}
                    alt={theme.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                  
                  {isFeatured && (
                    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-[#B8943E] text-[#B8943E]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-800">Paling Diminati</span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className={`bg-white flex flex-col justify-between shrink-0 ${isFeatured ? "p-5 md:p-8" : "p-3 md:p-5"}`}>
                  <div>
                    <div className={`flex ${isFeatured ? "justify-between items-start gap-3" : "flex-col xl:flex-row xl:justify-between xl:items-start gap-1 xl:gap-3"} mb-2 md:mb-3`}>
                      <h3 className={`font-playfair text-stone-900 ${isFeatured ? "text-xl md:text-2xl" : "text-[14px] md:text-lg font-semibold"}`}>
                        {theme.name}
                      </h3>
                      <p className={`font-medium text-stone-900 ${isFeatured ? "text-[15px] md:text-lg" : "text-[11px] md:text-[13px]"}`}>
                        {theme.price}
                      </p>
                    </div>
                    
                    {/* Features list visible on all cards, with horizontal scroll */}
                    <div className="flex gap-1 md:gap-1.5 mb-3 md:mb-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-0.5">
                      {theme.features.map((f, idx) => (
                        <span key={idx} className="shrink-0 text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 md:py-1 bg-stone-50 text-stone-600 rounded-md border border-stone-100 whitespace-nowrap">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto relative z-10">
                    <a
                      href={`https://wa.me/${CONTACT_PERSON}?text=${encodeURIComponent(
                        `Halo admin, aku tertarik dengan tema ${theme.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full flex items-center justify-center gap-1 md:gap-1.5 py-1.5 md:py-2.5 bg-stone-900 text-white text-[10px] md:text-[12px] font-medium rounded-lg md:rounded-xl hover:bg-[#B8943E] transition-colors shadow-sm"
                    >
                      Pesan Sekarang
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
