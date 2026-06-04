"use client";

import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { lagunac } from "@/fonts/fonts";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";

const Cover = () => {
  const { invitationData: data } = useInvitation();

  const animationRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: animationRef,
    offset: ["start start", "start -2%"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(3% 6%)", "inset(0% 0%)"]
  );

  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["grayscale(100%)", "grayscale(0%)"]
  );

  const formatEventDate = (dateString: string) => {
    if (!dateString) return null;

    const eventDate = new Date(dateString);
    const day = String(eventDate.getDate()).padStart(2, "0");
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const year = eventDate.getFullYear();

    return `${day} · ${month} · ${year}`;
  };

  return (
    <section
      ref={animationRef}
      className="relative w-full h-screen bg-[#fdfaf6] flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ clipPath, filter }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/10 to-black/10 z-20 pointer-events-none" />
        <Image
          src={optimizeCloudinaryUrl(findImage(data, "cover"))}
          alt="Cover photo"
          fill
          className="object-cover object-center z-0"
          priority
        />
      </motion.div>

      {/* Content box */}
      <div className="absolute z-20 w-full top-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-white">
        <div className="px-7 flex flex-col items-center justify-center gap-4">
          <p className={`${lagunac.className} text-[10px]`}>THE WEDDING OF</p>

          <h1
            className={`${lagunac.className} font-medium text-4xl text-center`}
          >
            {data?.host_two_name.toLocaleUpperCase()}
          </h1>

          <p className={`${lagunac.className} text-[10px]`}>AND</p>

          <h1
            className={`${lagunac.className} font-medium text-4xl text-center`}
          >
            {data?.host_one_name.toLocaleUpperCase()}
          </h1>

          <p className={`${lagunac.className} text-[10px] leading-tight`}>
            {formatEventDate(data?.event_date ?? "")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cover;
