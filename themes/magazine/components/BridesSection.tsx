"use client";

import { poppins, remineFares } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { createSocialMediaLink } from "@/utils/create-social-media-link";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function BrideSection() {
  const { invitationData: data } = useInvitation();
  const animationRef = useRef(null);
  const lineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: animationRef,
    offset: ["start 22%", "start start"],
  });

  const { scrollYProgress: lineScrollY } = useScroll({
    target: lineRef,
    offset: ["start 70%", "start 67%"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["inset(12% 28% 23% 9%)", "inset(6% 14% 11% 5%)", "inset(0% 0% 0% 0%)"]
  );
  const rawLineHeight = useTransform(
    lineScrollY,
    [0, 0.5, 1],
    ["0px", "80px", "160px"]
  );

  const lineHeight = useSpring(rawLineHeight, {
    damping: 20,
    stiffness: 100,
  });

  return (
    <section
      ref={animationRef}
      className="relative w-full min-h-screen bg-[#fdfaf6] flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ clipPath }} className="absolute inset-0 z-20">
        <Image
          src={optimizeCloudinaryUrl(findImage(data, "brides"))}
          alt="Bride"
          fill
          quality={100}
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/20 z-30 pointer-events-none" />

      <motion.div className="absolute top-9 right-10 z-10 text-right">
        <p
          className={`${remineFares.className} text-3xl font-normal text-gray-700 tracking-wide`}
          data-aos="zoom-in"
        >
          {data?.host_two_nickname.toLowerCase()}
        </p>
        <motion.div
          ref={lineRef}
          style={{ height: lineHeight }}
          className="w-px bg-gray-600 mt-10 ml-auto"
        />
      </motion.div>

      <div className={`absolute bottom-0 left-0 w-full z-40 py-10 px-6`}>
        <h1
          className={`${remineFares.className} text-white text-right font-medium text-4xl mb-5`}
        >
          {data?.host_two_name.toLocaleLowerCase()}
        </h1>
        <div
          className={`${poppins.className} w-full flex items-end justify-between content-between`}
        >
          <div
            className={`${!data?.host_two_social_media ? "opacity-0" : ""
              } flex gap-2 items-center text-white text-xs bg-transparent rounded-none border border-white cursor-pointer px-3 py-2`}
          >
            <Instagram className="h-4 w-4 font-light" />{" "}
            <Link
              href={createSocialMediaLink(data?.host_two_social_media || "")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`@${data?.host_two_social_media}`}
            </Link>
          </div>
          <div className="w-[140px] text-white text-xs font-normal text-right">
            {data?.host_two_additional_info}
          </div>
        </div>
      </div>
    </section>
  );
}
