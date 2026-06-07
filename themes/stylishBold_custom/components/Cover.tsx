"use client";

import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
    [0, 0.2, 0.5, 1],
    [
      "inset(8% 22% 16% 14%)",
      "inset(4% 11% 8% 7%)",
      "inset(2% 6% 4% 4%)",
      "inset(0% 0% 0% 0%)",
    ]
  );

  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["grayscale(100%)", "grayscale(0%)"]
  );

  return (
    <section
      ref={animationRef}
      className="relative w-full h-screen bg-primary-stylishb flex items-center justify-center overflow-hidden"
    >
      {/* couple image */}
      <motion.div
        style={{ clipPath, filter }}
        className="absolute inset-0 z-20"
      >
        <Image
          src={optimizeCloudinaryUrl(findImage(data, "cover"))}
          alt="Cover photo"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* watermark image */}
      <div className="absolute bottom-0 right-0 w-1/2 h-auto z-10 flex flex-col items-center justify-center gap-2">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "initial-outline"))}
            alt="intial bawah"
            width={144}
            height={144}
          />
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "initial-outline"))}
            alt="initial bawah"
            width={114}
            height={114}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "initial-outline"))}
            alt="intial bawah"
            width={110}
            height={110}
          />
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "initial-outline"))}
            alt="initial bawah"
            width={173}
            height={173}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "initial-outline"))}
            alt="intial bawah"
            width={90}
            height={90}
          />
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "initial-outline"))}
            alt="initial bawah"
            width={110}
            height={110}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "initial-outline"))}
            alt="intial bawah"
            width={193}
            height={193}
          />
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "initial-outline"))}
            alt="initial bawah"
            width={150}
            height={150}
          />
        </div>
      </div>
    </section>
  );
};

export default Cover;
