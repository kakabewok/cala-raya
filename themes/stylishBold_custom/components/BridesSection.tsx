import { nyghtSerif } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { createSocialMediaLink } from "@/utils/create-social-media-link";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function BrideSection() {
  const { invitationData: data } = useInvitation();
  const imageRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start 40%", "start start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "inset(0% 0% 0% 100%)",
      "inset(0% 0% 0% 80%)",
      "inset(0% 0% 0% 60%)",
      "inset(0% 0% 0% 40%)",
      "inset(0% 0% 0% 20%)",
      "inset(0% 0% 0% 0%)",
    ]
  );

  const { scrollYProgress: lineScrollY } = useScroll({
    target: lineRef,
    offset: ["start 90%", "start 80%"],
  });

  const rawLineHeight = useTransform(
    lineScrollY,
    [0, 0.5, 1],
    ["0vh", "18vh", "36vh"]
  );

  const lineHeight = useSpring(rawLineHeight, {
    damping: 20,
    stiffness: 100,
  });

  return (
    <section
      ref={imageRef}
      className="relative w-full min-h-screen bg-secondary-stylishb flex items-center justify-start overflow-hidden"
    >
      <motion.div style={{ clipPath }} className="absolute inset-0 z-20">
        <Image
          src={optimizeCloudinaryUrl(findImage(data, "brides"))}
          alt="Bride"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      <div
        className={`z-10 ${nyghtSerif.className} basis-1/2 h-full flex flex-col items-left justify-center`}
      >
        <div className="px-2 py-10 text-center relative z-20">
          {/* info */}
          <div className="flex flex-col gap-4 items-center justify-center w-full h-fit">
            <p className="text-2xl text-neutral-900">{data?.host_two_name}</p>
            <p className="text-xs italic font-light text-neutral-800 block w-[69%] ">
              {data?.host_two_additional_info}
            </p>
          </div>
          {/* instagram */}
          {data?.host_two_social_media && (
            <div className="mt-4 cursor-pointer relative inline-flex items-center justify-center font-light overflow-visible px-4 py-[10px] text-xs">
              <div className="absolute inset-0 overflow-hidden">
                <svg
                  className="absolute w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="50"
                    cy="20"
                    rx="49.5"
                    ry="19.5"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-line-stylishb"
                  />
                </svg>
              </div>
              <Link
                href={createSocialMediaLink(data?.host_two_social_media || "")}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-neutral-800"
              >
                {`@${data?.host_two_social_media}`}
              </Link>
            </div>
          )}

          {/* line */}
          <motion.div
            ref={lineRef}
            style={{ height: lineHeight }}
            className="border border-line-stylishb absolute origin-top top-full left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
}
