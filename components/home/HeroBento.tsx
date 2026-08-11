"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { CONTACT_PERSON } from "@/data/data";
import { Star, Clock, ArrowRight } from "lucide-react";

export default function HeroBento() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
    <section id="home" className="relative min-h-[95vh] pt-32 pb-20 bg-[#FAF8F5] overflow-hidden bg-noise">
      {/* Decorative Gold Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(184,148,62,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(184,148,62,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-auto md:auto-rows-[240px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline Card (spans 2x2 on desktop) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 bg-white rounded-xl p-6 pb-10 sm:p-8 sm:pb-12 md:p-10 md:pb-10 border border-stone-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-start md:justify-center relative overflow-hidden group hover:border-[#B8943E]/30 transition-colors duration-500"
          >
            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-bl from-[#B8943E]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <p className="text-[10px] md:text-[12px] font-medium tracking-[0.2em] uppercase text-[#B8943E] mb-3 md:mb-4">
              Premium Digital Invitation
            </p>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] md:leading-[1.15] text-stone-900 mb-4 md:mb-5">
              Sentuhan Personal untuk Momen <br className="hidden sm:block" /> <i className="font-cursive text-[#B8943E] text-4xl sm:text-5xl md:text-6xl lg:text-7xl lowercase relative top-1 md:top-2">Tak Terlupakan</i>
            </h1>
            <p className="text-[14px] md:text-base text-stone-500 leading-relaxed max-w-md mb-6 md:mb-8">
              Kustomisasi tanpa batas dengan desain elegan yang benar-benar mewakili kisah cintamu.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <a
                href={`https://wa.me/${CONTACT_PERSON}?text=${encodeURIComponent(
                  "Halo, saya ingin bertanya tentang jasa pembuatan Undangan Digital/Website"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 md:py-3.5 bg-[#B8943E] text-white text-[13px] md:text-[14px] font-medium rounded-xl hover:bg-[#a07c2d] transition-all duration-300 shadow-lg shadow-[#B8943E]/20 hover:shadow-[#B8943E]/40"
              >
                Mulai Konsultasi
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </a>
              <a
                href="#koleksi"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 md:py-3.5 bg-stone-50 text-stone-700 text-[13px] md:text-[14px] font-medium rounded-xl hover:bg-stone-100 border border-stone-200/60 transition-all duration-300"
              >
                Lihat Koleksi
              </a>
            </div>
          </motion.div>

          {/* Image Showcase Card (spans 1x2 on desktop) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 lg:col-span-1 md:row-span-2 rounded-xl overflow-hidden relative border border-stone-200/60 shadow-md group hidden md:block"
          >
            <Image
              src="https://res.cloudinary.com/dk16ng09n/image/upload/v1779555221/personal/web-porto/mono_lu00dd.png"
              alt="Invitation Preview"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white/80 text-[11px] uppercase tracking-widest font-semibold mb-1">Featured</p>
              <p className="text-white font-playfair text-xl">Monochrome Elegance</p>
            </div>
          </motion.div>

          {/* Social Proof Stats (spans 1x1) */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl p-6 border border-stone-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-center items-center text-center group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-[#B8943E] text-[#B8943E]" />
              ))}
            </div>
            <p className="font-playfair text-3xl text-stone-900 mb-1">100%</p>
            <p className="text-[13px] text-stone-500 font-medium">Klien Puas & Merekomendasikan</p>
          </motion.div>

          {/* Countdown Feature Preview (spans 1x1) */}
          <motion.div
            variants={itemVariants}
            className="bg-[#1C1917] rounded-xl p-6 shadow-xl flex flex-col justify-center overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-noise opacity-10" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[#B8943E]" />
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-semibold">Live Countdown</p>
              </div>
              <div className="flex gap-3 justify-center">
                {[
                  { v: "14", l: "Hari" },
                  { v: "08", l: "Jam" },
                  { v: "45", l: "Mnt" }
                ].map((t, i) => (
                  <div key={i} className="flex flex-col items-center bg-white/10 rounded-xl px-3 py-2 border border-white/5 backdrop-blur-sm group-hover:bg-white/15 transition-colors">
                    <span className="text-white font-playfair text-2xl">{t.v}</span>
                    <span className="text-[9px] uppercase tracking-wider text-white/50">{t.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
