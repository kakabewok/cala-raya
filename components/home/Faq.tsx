"use client";

import { faqs } from "@/data/data";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p className="text-[12px] md:text-[13px] font-medium tracking-[0.2em] uppercase text-[#B8943E] mb-3">
            FAQ
          </p>
          <h2 className="font-playfair text-4xl md:text-[2.5rem] text-stone-900 mb-5">
            Pertanyaan Umum
          </h2>
          <p className="text-[15px] text-stone-500 leading-relaxed">
            Temukan jawaban untuk pertanyaan yang sering ditanyakan
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-stone-200 bg-white shadow-sm"
                    : "border-stone-100 bg-white hover:border-stone-200"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="cursor-pointer w-full px-5 py-4 flex items-center justify-between text-left"
                >
                  <span className="text-[14px] md:text-[15px] font-medium text-stone-800 pr-4 leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#B8943E]" : "text-stone-400"
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-4">
                    <p className="text-[13px] text-stone-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
