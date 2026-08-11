"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { reviews } from "@/data/data";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

export default function SocialProof() {
  const plugin = Autoplay({ delay: 3500, stopOnInteraction: false });

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section id="testimoni" className="py-24 bg-[#FAF8F5] relative overflow-hidden bg-noise">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[12px] font-medium tracking-[0.2em] uppercase text-[#B8943E] mb-3">
            Kata Mereka
          </p>
          <h2 className="font-playfair text-4xl md:text-[2.5rem] text-stone-900 mb-5">
            Cerita dari Mereka yang Sudah Percaya
          </h2>
          <p className="text-[15px] text-stone-500 max-w-lg mx-auto leading-relaxed">
            Menjadi bagian dari momen spesial adalah kehormatan bagi kami. Inilah pengalaman mereka bersama Calaraya.
          </p>
        </motion.div>

        {/* Swipeable Carousel — ALL reviews rendered */}
        <Carousel
          setApi={setApi}
          plugins={[plugin]}
          className="w-full"
          opts={{ align: "start", loop: true, dragFree: false }}
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {/* Every single review is rendered — no slicing */}
            {reviews.map((review, i) => (
              <CarouselItem
                key={i}
                className="pl-3 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="bg-white rounded-xl p-6 border border-stone-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-[#B8943E]/30 transition-all duration-300 h-full flex flex-col">
                  {/* Chat Screenshot */}
                  <div className="mb-4 rounded-lg overflow-hidden border border-stone-100 bg-stone-50">
                    <Image
                      width={400}
                      height={128}
                      src={review.reviewImage}
                      alt={`Review dari ${review.name}`}
                      className="w-full h-48 md:h-56 object-contain object-center"
                      unoptimized
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3.5 h-3.5 fill-[#B8943E] text-[#B8943E]"
                      />
                    ))}
                  </div>

                  {/* Comment — full text, no truncation */}
                  <p className="text-[13px] text-stone-600 leading-relaxed mb-4 flex-1 italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>

                  {/* Profile */}
                  <div className="pt-3 border-t border-stone-100">
                    <h4 className="text-[14px] font-semibold text-stone-900">
                      {review.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {review.product} — {review.type}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>

        {/* Dots */}
        <div className="mt-8 md:mt-10 flex justify-center gap-1.5">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === current
                  ? "bg-[#B8943E] w-6"
                  : "bg-stone-200 w-1.5 hover:bg-stone-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
