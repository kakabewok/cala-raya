"use client";

import { reviews } from "@/data/data";
import { Star } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

function Reviews() {
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
    <section id="reviews" className="py-20 md:py-28 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <p className="text-[12px] md:text-[13px] font-medium tracking-[0.2em] uppercase text-[#B8943E] mb-3">
            Testimoni
          </p>
          <h2 className="font-playfair text-4xl md:text-[2.5rem] text-stone-900 mb-5">
            Apa Kata Mereka?
          </h2>
          <p className="text-[15px] text-stone-500 max-w-md mx-auto leading-relaxed">
            Pengalaman klien setelah menggunakan layanan kami
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[220px] md:auto-rows-[280px] grid-flow-dense"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {reviews.slice(0, 7).map((review, i) => {
            const isLarge = i === 0;
            const isTall = i === 3 || i === 4;
            
            const colSpan = isLarge ? "col-span-2 md:col-span-2" : "col-span-1 md:col-span-1";
            const rowSpan = isLarge ? "row-span-2 md:row-span-2" : isTall ? "row-span-2 md:row-span-2" : "row-span-1 md:row-span-1";

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`bg-white rounded-xl border border-stone-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-4 md:p-5 h-full flex flex-col hover:border-[#B8943E]/30 hover:shadow-xl transition-all duration-500 ${colSpan} ${rowSpan}`}
              >
                {/* Chat Screenshot */}
                <div className={`mb-3 md:mb-4 rounded-lg overflow-hidden border border-stone-100 bg-stone-50 ${isLarge ? 'h-40 md:h-64' : isTall ? 'h-52 md:h-72' : 'h-24 md:h-32'}`}>
                  <Image
                    width={400}
                    height={128}
                    src={review.reviewImage}
                    alt={`Review dari ${review.name}`}
                    className="w-full h-full object-contain object-center scale-110"
                    unoptimized
                  />
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  {/* Profile */}
                  <div className="mb-2 md:mb-3">
                    <h4 className={`font-semibold text-stone-800 ${isLarge ? "text-lg md:text-xl" : "text-[13px] md:text-[15px]"}`}>
                      {review.name}
                    </h4>
                    <p className={`text-stone-400 mt-0.5 ${isLarge ? "text-[12px] md:text-sm" : "text-[9px] md:text-[11px]"}`}>
                      {review.product} — {review.type}
                    </p>
                    <div className="flex gap-0.5 mt-1.5 md:mt-2">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`text-amber-400 fill-current ${isLarge ? "w-4 h-4" : "w-3 h-3 md:w-3.5 md:h-3.5"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className={`text-stone-500 leading-relaxed italic ${isLarge ? "text-[14px] md:text-base line-clamp-3 md:line-clamp-none" : "text-[10px] md:text-[12px] line-clamp-2 md:line-clamp-4"}`}>
                    &ldquo;{review.comment}&rdquo;
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

export default Reviews;
