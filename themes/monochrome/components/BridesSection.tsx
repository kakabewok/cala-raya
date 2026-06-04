"use client";

import { commuters, lagunac, monthGlade } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function BrideSection() {
  const { invitationData: data } = useInvitation();
  const animationRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: animationRef,
    offset: ["start 22%", "start start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "inset(5.6% 10% 15%)",
      "inset(2.8% 5% 7.5%)",
      "inset(1.8% 3% 4.5%)",
      "inset(1.0% 2% 2.5%)",
      "inset(0% 0% 0%)",
    ]
  );

  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["grayscale(100%)", "grayscale(20%)"]
  );

  return (
    <section
      ref={animationRef}
      className="relative w-full min-h-screen bg-[#f8f4ec] flex flex-col items-center justify-between overflow-hidden"
    >
      {/* the bride */}
      <div className="mt-[64px] w-fit z-40" data-aos="fade-up">
        <p
          className={`${monthGlade.className} text-white text-[40px] font-semibold -rotate-[21deg]`}
        >
          The Bride
        </p>
      </div>

      {/* background image */}
      <motion.div
        style={{ clipPath, filter }}
        className="absolute inset-0 z-20"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/20 z-30 pointer-events-none" />

        <Image
          src={optimizeCloudinaryUrl(findImage(data, "brides"))}
          alt="Bride"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* bride info */}
      <div
        className={`w-full py-10 px-6 flex flex-col gap-4 z-40 text-white`}
        data-aos="fade-up"
      >
        <h1
          className={`${lagunac.className} text-center text-[32px] tracking-[0.96px]`}
        >
          {data?.host_two_name.toUpperCase()}
        </h1>
        <div className="flex flex-col items-center justify-between gap-4">
          <p
            className={`${commuters.className} text-center font-thin leading-[18px] text-xs`}
          >
            Together with their families
            <br />
            <span className="font-bold">{data?.host_two_additional_info}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
