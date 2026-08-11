"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Mail, Globe, Eye, ArrowRight } from "lucide-react";
import { portfolios } from "@/data/data";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

function Portfolio() {
  const tabs = [
    { id: "Undangan Digital", label: "Undangan Digital", icon: Mail },
    { id: "Website", label: "Website", icon: Globe },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredPortfolios = useMemo(() => {
    return portfolios.filter((item) => item.product === activeTab);
  }, [activeTab]);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, filteredPortfolios.length));
  };

  const isWebsite = activeTab === "Website";

  // Bento grid sizing logic
  const getCardSize = (index: number, isWebsite: boolean) => {
    // 0: featured (2x2), 3: wide (2x1) for website or tall (1x2) for undangan, 7: featured (2x2), etc.
    if (index % 7 === 0) return "featured";
    if (index % 7 === 3 || index % 7 === 4) return isWebsite ? "wide" : "tall";
    return "normal";
  };

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <p className="text-[12px] md:text-[13px] font-medium tracking-[0.2em] uppercase text-[#B8943E] mb-3">
            Portfolio
          </p>
          <h2 className="font-playfair text-4xl md:text-[2.5rem] text-stone-900 mb-5">
            Hasil Karya Kami
          </h2>
          <p className="text-[15px] text-stone-500 max-w-md mx-auto leading-relaxed">
            Beberapa project yang telah kami selesaikan untuk klien
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-stone-100 rounded-lg p-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setVisibleCount(8);
                  }}
                  className={`cursor-pointer flex items-center gap-2 px-4 py-2 text-[13px] font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid — Bento Style */}
        <motion.div
          layout
          className="grid gap-4 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolios.slice(0, visibleCount).map((item, i) => {
              const size = getCardSize(i, isWebsite);
              
              let spanClass = "col-span-1 md:col-span-1 row-span-1";
              if (size === "featured") {
                spanClass = "col-span-2 md:col-span-2 row-span-2";
              } else if (size === "wide") {
                spanClass = "col-span-2 md:col-span-2 row-span-1";
              } else if (size === "tall") {
                spanClass = "col-span-1 md:col-span-1 row-span-2";
              }

              return isWebsite ? (
                /* ── Website Portfolio Card ── */
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={`${activeTab}-${item.title}-${i}`}
                  className={`group relative rounded-2xl overflow-hidden border border-stone-200/60 hover:border-[#B8943E]/30 shadow-sm hover:shadow-xl transition-all duration-500 bg-white flex flex-col ${spanClass}`}
                >
                  {/* Image Section - Fills remaining space */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block flex-1 overflow-hidden bg-stone-100"
                  >
                    <Image
                      fill
                      src={item.image}
                      alt={item.title}
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* External link button (appears on hover) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg">
                      <ExternalLink className="w-5 h-5 text-stone-800" />
                    </div>
                  </a>

                  {/* Info Section - Fixed at bottom */}
                  <div className={`flex flex-col bg-white border-t border-stone-100 shrink-0 ${size === 'featured' ? 'p-6 md:p-8' : 'p-3 md:p-5'}`}>
                    <div className="flex items-start justify-between mb-2 md:mb-3 gap-2 md:gap-4 flex-col xl:flex-row">
                      <h3 className={`font-semibold text-stone-800 ${size === 'featured' ? 'text-xl md:text-2xl' : 'text-[13px] md:text-[15px]'}`}>
                        {item.title}
                      </h3>
                      <span className="flex-shrink-0 px-2 md:px-2.5 py-0.5 md:py-1 bg-[#FAF8F5] text-[#B8943E] text-[9px] md:text-[11px] font-bold tracking-wide uppercase rounded-md border border-[#B8943E]/20">
                        {item.type}
                      </span>
                    </div>

                    {/* Richer details for large cards */}
                    {item.description && (
                      <div className={`flex flex-wrap gap-1.5 md:gap-2 mt-1 ${size !== 'featured' ? 'max-h-[34px] overflow-hidden' : ''}`}>
                        {item.description.split(" - ").map((feature, idx) => (
                          <span
                            key={idx}
                            className={`text-[9px] md:text-[11px] px-1.5 md:px-2.5 py-0.5 md:py-1 bg-stone-50 text-stone-600 rounded-md font-medium border border-stone-100 whitespace-nowrap`}
                          >
                            {feature.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                /* ── Undangan Digital Portfolio Card — Bento Style ── */
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={`${activeTab}-${item.title}-${i}`}
                  className={`group relative rounded-2xl overflow-hidden border border-stone-200/60 hover:border-[#B8943E]/30 shadow-sm hover:shadow-xl transition-all duration-500 block ${spanClass}`}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 w-full h-full bg-stone-100"
                  >
                    <Image
                      fill
                      src={item.image}
                      alt={item.title}
                      className="object-cover object-top group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Type badge - Top Left */}
                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                      <span className="px-1.5 md:px-2.5 py-0.5 md:py-1 bg-white/95 backdrop-blur-md text-stone-800 text-[8px] md:text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                        {item.type}
                      </span>
                    </div>

                    {/* Content - Bottom */}
                    <div className={`absolute bottom-0 left-0 right-0 flex flex-col justify-end transform transition-transform duration-300 group-hover:-translate-y-2 ${size === "featured" ? "p-5 md:p-8" : "p-3 md:p-5"}`}>
                      <h3 className={`text-white font-playfair leading-tight mb-1 md:mb-2 ${size === "featured" ? "text-xl md:text-3xl" : "text-[14px] md:text-xl"}`}>
                        {item.title}
                      </h3>
                      
                      {/* Hidden details that slide up on hover */}
                      <div className="overflow-hidden h-0 group-hover:h-6 md:group-hover:h-8 transition-all duration-300 flex items-center gap-1 md:gap-2 opacity-0 group-hover:opacity-100">
                        <span className="text-stone-300 text-[10px] md:text-xs font-medium flex items-center gap-1 md:gap-1.5">
                          Buka Undangan <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        </span>
                      </div>
                    </div>

                    {/* External link icon - Top Right */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 w-7 h-7 md:w-10 md:h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75 shadow-lg">
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPortfolios.length === 0 && (
          <div className="text-center py-16">
            <p className="text-stone-400 text-[15px]">
              Belum ada portofolio untuk kategori &quot;{activeTab}&quot;.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredPortfolios.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="cursor-pointer flex items-center gap-2 px-6 py-3 border border-stone-200 text-stone-700 bg-white text-[13px] font-semibold rounded-xl hover:bg-[#FAF8F5] hover:border-[#B8943E]/50 hover:text-[#B8943E] transition-all duration-300 shadow-sm"
            >
              Lihat Lebih Banyak ({filteredPortfolios.length - visibleCount})
              <Eye className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;
