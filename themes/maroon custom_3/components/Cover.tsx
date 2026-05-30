import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
    ["inset(5% 8%)", "inset(3% 4%)"]
  );

  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["grayscale(100%)", "grayscale(0%)"]
  );

  return (
    <section
      ref={animationRef}
      className="relative w-full h-screen bg-[#fdfaf6] flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ clipPath, filter }} className="absolute inset-0">
        <Image
          src={findImage(data, "cover")}
          alt="Cover photo"
          fill
          className="object-cover object-center z-0"
          priority
        />
      </motion.div>

      <div className="absolute z-20 top-28">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Image
            src={findImage(data, "initial")}
            alt="Initial"
            width={150}
            height={150}
            className="object-cover object-center z-0"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Cover;
