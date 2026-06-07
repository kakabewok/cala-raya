import { optivaground } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import { createSocialMediaLink } from "@/utils/create-social-media-link";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";

const Grooms = () => {
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
          src={optimizeCloudinaryUrl(findImage(data, "grooms"))}
          alt="Grooms photo"
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
        className="gap-3 flex flex-col justify-center items-start absolute bottom-0 z-20 w-full bg-gradient-to-t from-white/80 via-white/60 to-transparent px-6 py-8 backdrop-blur-sm"
        data-aos="fade-up"
        data-aos-offset="100"
      >
        <div className="w-full p-3 gap-3 flex flex-col justify-center items-start">
          <h2
            className={`${optivaground.className} tracking-widest text-2xl text-orange-200 text-left pr-10 z-[99]`}
          >
            {data?.host_one_name}
          </h2>
          <p className="text-xs text-orange-200 max-w-32 text-left">
            {data?.host_one_additional_info}
          </p>
          <div className="w-fit flex items-center gap-2 text-orange-200 text-xs bg-transparent rounded-sm border border-orange-200 cursor-pointer px-3 py-1">
            <Instagram className="h-4 w-4 font-light" />{" "}
            <Link
              href={createSocialMediaLink(data?.host_one_social_media || "")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`@${data?.host_one_social_media}`}
            </Link>
          </div>
        </div>
      </div>

      {/* flower */}
      <Image
        src="/assets/images/floral/16.webp"
        alt="Bunga 1"
        width={110}
        height={110}
        className="swing-left-fast absolute -bottom-10 -right-5 z-40 transform -rotate-12"
      />
      <Image
        src="/assets/images/floral/28.webp"
        alt="Bunga 2"
        width={100}
        height={100}
        className="swing-right-slow absolute bottom-5 -right-5 z-30 transform -rotate-[32deg]"
      />
      <Image
        src="/assets/images/floral/12.webp"
        alt="Bunga 3"
        width={80}
        height={80}
        className="swing-left-slow absolute -bottom-16 right-9 z-30 transform -rotate-[32deg]"
      />
      <Image
        src="/assets/images/floral/21.webp"
        alt="Bunga 4"
        width={110}
        height={110}
        className="swing-right-slow absolute bottom-24 -right-12 z-20 transform -rotate-[45deg]"
      />
    </section>
  );
};

export default Grooms;
