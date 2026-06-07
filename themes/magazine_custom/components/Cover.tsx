"use client";

import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { didot, remineFares } from "@/fonts/fonts";
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
      className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ clipPath, filter }} className="absolute inset-0">
        <Image
          src={optimizeCloudinaryUrl(findImage(data, "cover"))}
          alt="Cover photo"
          fill
          quality={100}
          className="object-cover object-center z-0"
          priority
        />
      </motion.div>

      {/* Content box */}
      <div className="absolute z-20 h-screen flex flex-col justify-around items-center text-white">
        <p className={`${didot.className} text-xs`}>The Wedding of</p>

        <h1
          className={`${remineFares.className} font-medium text-4xl text-left`}
        >
          {data?.host_one_nickname.toLocaleLowerCase()} <br />&{" "}
          {data?.host_two_nickname.toLocaleLowerCase()}
        </h1>

        <p className={`${didot.className} text-xs leading-tight`}>
          {formatEventDate(data?.event_date ?? "")}
        </p>
      </div>
    </section>
  );
};

export default Cover;
