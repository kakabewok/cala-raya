import { playfair } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import { createSocialMediaLink } from "@/utils/create-social-media-link";

const Brides = () => {
  const { invitationData: data } = useInvitation();
  const animationRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: animationRef,
    offset: ["start center", "center center"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["inset(2% 11% 15.16%)", "inset(1% 6% 12.13%)", "inset(0% 0% 0%)"]
  );

  return (
    <section
      ref={animationRef}
      className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0 z-0" style={{ clipPath }}>
        <Image
          src={findImage(data, "brides")}
          alt="Brides photo"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* double line */}
      <div className="absolute inset-10 border border-[#c6a886] z-10 pointer-events-none" />
      <div className="absolute inset-11 border border-[#c6a886] z-10 pointer-events-none" />

      {/* Content box */}
      <div
        className={`${playfair.className} gap-3 flex flex-col justify-center items-end absolute bottom-0 z-20 w-full bg-gradient-to-t from-white/80 via-white/60 to-transparent px-6 py-8 backdrop-blur-sm`}
        data-aos="fade-up"
        data-aos-offset="100"
      >
        <h2
          className={`max-w-[80%] text-right tracking-widest text-2xl text-[#fff] drop-shadow-sm`}
        >
          {data?.host_two_name}
        </h2>
        <p className="text-xs font-semibold text-white max-w-[50%] text-right tracking-wide">
          {data?.host_two_additional_info}
        </p>
        {data?.host_two_social_media && (
          <div className="font-semibold w-fit flex items-center gap-2 text-white text-xs bg-transparent rounded-sm border border-white cursor-pointer px-3 py-1">
            <Instagram className="h-4 w-4 font-light" />{" "}
            <Link
              href={createSocialMediaLink(data?.host_two_social_media || "")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`@${data?.host_two_social_media}`}
            </Link>
          </div>
        )}
      </div>

      {/* flower */}
      <Image
        src="/assets/images/floral/16.webp"
        alt="Bunga 1"
        width={110}
        height={110}
        className="swing-left-fast absolute -bottom-10 -left-5 z-40 transform rotate-12"
      />
      <Image
        src="/assets/images/floral/28.webp"
        alt="Bunga 2"
        width={100}
        height={100}
        className="swing-right-slow absolute bottom-5 -left-5 z-30 transform rotate-[32deg]"
      />
      <Image
        src="/assets/images/floral/12.webp"
        alt="Bunga 3"
        width={80}
        height={80}
        className="swing-left-slow absolute -bottom-16 left-7 z-30 transform rotate-[32deg]"
      />
      <Image
        src="/assets/images/floral/21.webp"
        alt="Bunga 4"
        width={110}
        height={110}
        className="swing-right-slow absolute bottom-24 -left-12 z-20 transform rotate-[45deg]"
      />
    </section>
  );
};

export default Brides;
