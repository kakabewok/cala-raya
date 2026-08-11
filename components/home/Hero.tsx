import { CONTACT_PERSON } from "@/data/data";
import { Heart, Clock, MapPin } from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center bg-[#FDFBF7] overflow-hidden"
    >
      {/* Subtle decorative element */}
      <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(193,177,147,0.08)_0%,_transparent_70%)] pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(193,177,147,0.06)_0%,_transparent_70%)] pointer-events-none" />

      {/* 
        Modified the wrapper to a flex container (flex-col on mobile, flex-row on desktop) 
        to allow the new right-side elements to sit alongside the existing left-side content. 
      */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full py-28 md:py-32 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 relative z-10">

        {/* =========================================
            LEFT SIDE (EXISTING STRUCTURE - UNCHANGED) 
            ========================================= */}
        <div className="max-w-2xl w-full">
          {/* Eyebrow */}
          <p className="text-[12px] md:text-[13px] font-medium tracking-[0.2em] uppercase text-stone-400 mb-5 md:mb-6">
            Digital Invitation &amp; Website
          </p>

          {/* Headline */}
          <h1 className="uppercase text-[2.25rem] md:text-[3.25rem] lg:text-[3.75rem] leading-[1.1] font-semibold text-stone-900 mb-6 tracking-tight">
            Ekspresikan Cerita Kamu {" "}
            {/* <br /> */}
            <span className="text-stone-400">Lewat Sentuhan Digital</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[15px] md:text-lg text-stone-500 leading-relaxed max-w-lg mb-10">
            Kustomisasi tanpa batas untuk menghadirkan tampilan digital yang benar-benar mewakili gayamu.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={`https://wa.me/${CONTACT_PERSON}?text=${encodeURIComponent(
                "Halo, saya ingin bertanya tentang jasa pembuatan Undangan Digital/Website"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 bg-stone-900 text-white text-[14px] font-medium rounded-lg hover:bg-stone-800 transition-colors duration-200 tracking-wide"
            >
              Mulai Diskusi
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-7 py-3 border border-stone-200 text-stone-700 text-[14px] font-medium rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-all duration-200 tracking-wide"
            >
              Lihat Portfolio
            </a>
          </div>

          {/* Minimal Stats */}
          <div className="flex items-center justify-center md:justify-start gap-6 sm:gap-10 mt-14 md:mt-16 pt-8 border-t border-stone-100">
            {[
              { number: "100%", label: "Klien Puas" },
              { number: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-semibold text-stone-900 tracking-tight">
                  {stat.number}
                </p>
                <p className="text-[12px] md:text-[13px] text-stone-400 mt-1 tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            RIGHT SIDE (NEW ADDITIONS)
            ========================================= 
            Added a visual showcase representing a digital invitation to fill the empty space.
            Uses Option C (Layered Visual Composition) with glassmorphism floating cards.
        */}
        <div className="w-full lg:w-[45%] relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0">

          {/* Main Abstract Background Shape (Represents an invitation card) */}
          <div className="relative w-[280px] sm:w-[320px] aspect-[4/5] bg-gradient-to-tr from-stone-200/40 to-stone-100/80 rounded-[2.5rem] border-[6px] border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] backdrop-blur-sm lg:rotate-3 hover:rotate-0 transition-transform duration-500 group">

            {/* Inner glow / gradient */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-rose-200/40 rounded-full blur-3xl mix-blend-multiply group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-amber-100/40 rounded-full blur-2xl mix-blend-multiply group-hover:scale-110 transition-transform duration-700"></div>
            </div>

            {/* Floating Card 1: Save the Date */}
            <div className="absolute -left-4 sm:-left-12 top-8 bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/60 flex items-center gap-3 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                <Heart className="w-4 h-4 fill-rose-100" />
              </div>
              <div>
                <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">Save the Date</p>
                <p className="text-sm font-medium text-stone-800">Romeo &amp; Juliet</p>
              </div>
            </div>

            {/* Floating Card 2: Static Countdown Showcase */}
            <div className="absolute -right-2 sm:-right-8 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-xl p-4 rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-white/80 flex flex-col gap-2 z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-500">Starts In</p>
              </div>
              <div className="flex gap-2">
                {[
                  { value: "14", label: "Days" },
                  { value: "08", label: "Hrs" },
                  { value: "45", label: "Min" }
                ].map((time, i) => (
                  <div key={i} className="flex flex-col items-center bg-white/60 rounded-xl px-2.5 py-2 min-w-[3.5rem] shadow-sm">
                    <span className="text-lg font-semibold text-stone-700 leading-none">{time.value}</span>
                    <span className="text-[8px] uppercase tracking-widest text-stone-400 mt-1">{time.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Card 3: Location */}
            <div className="absolute -left-2 sm:-left-6 bottom-10 bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.07)] border border-white/60 flex items-center gap-3 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-500">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">Location</p>
                <p className="text-xs font-medium text-stone-800">Grand Ballroom, JKT</p>
              </div>
            </div>

          </div>

          {/* Subtle background decorative dashed circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] border border-stone-200/60 rounded-full -z-10 border-dashed"></div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
