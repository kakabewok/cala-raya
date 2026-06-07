import { useInvitation } from "@/hooks/use-invitation";
import Image from "next/image";
import { useRef } from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import { createSocialMediaLink } from "@/utils/create-social-media-link";
import { amalfiCoast, playfair } from "@/fonts/fonts";

const Couple = () => {
  const { invitationData: data } = useInvitation();
  const animationRef = useRef(null);

  return (
    <section
      ref={animationRef}
      className="relative w-full h-screen bg-[#FFF9F5] flex items-center justify-center overflow-hidden"
    >
      {/* DEKORASI BORDER */}
      <div className="absolute inset-6 border border-primary-mono3/20 z-10 pointer-events-none" />
      <div className="absolute inset-8 border border-primary-mono3/40 z-10 pointer-events-none" />

      {/* CONTAINER UTAMA */}
      <div className="z-20 w-full max-w-lg flex flex-col items-center justify-center gap-12 px-10">

        {/* PROFIL WANITA (ATAS) */}
        <div className="flex flex-col items-center text-center animate-fade-in" data-aos="fade-up">
          <h2 className={`${amalfiCoast.className} font-medium text-xl text-primary-mono3 mb-5 capitalize`}>
            {data?.host_two_name}
          </h2>
          <p className={`${playfair.className} text-xs md:text-sm font-light text-text-mono3 mb-4 italic`}>
            {data?.host_two_additional_info}
          </p>
          {data?.host_two_social_media && (
            <SocialLink username={data.host_two_social_media} />
          )}
        </div>

        {/* SIMBOL PEMISAH (&) */}
        <div className="relative flex items-center justify-center w-full">
          <div className="h-[1px] w-12 bg-primary-mono3/30"></div>
          <span className={`${playfair.className} mx-4 text-2xl text-primary-mono3 font-light`}>&</span>
          <div className="h-[1px] w-12 bg-primary-mono3/30"></div>
        </div>

        {/* PROFIL LAKI-LAKI (BAWAH) */}
        <div className="flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="200">
          <h2 className={`${amalfiCoast.className} font-medium text-xl text-primary-mono3 mb-2 capitalize`}>
            {data?.host_one_name}
          </h2>
          <p className={`${playfair.className} text-xs md:text-sm font-light text-text-mono3 mb-4 italic`}>
            {data?.host_one_additional_info}
          </p>
          {data?.host_one_social_media && (
            <SocialLink username={data.host_one_social_media} />
          )}
        </div>

      </div>

      {/* DEKORASI BUNGA (Sama seperti sebelumnya, menjaga keseimbangan sudut) */}
      <FlowerDecoration position="top-left" />
      <FlowerDecoration position="bottom-right" />
    </section>
  );
};

// Komponen Reusable untuk Instagram Link
const SocialLink = ({ username }: { username: string }) => (
  <Link
    href={createSocialMediaLink(username)}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-primary-mono3 text-[10px] tracking-[0.2em] border border-primary-mono3/20 rounded-full px-4 py-1 hover:bg-primary-mono3 hover:text-white transition-all duration-500"
  >
    <Instagram className="h-3 w-3" />
    {username}
  </Link>
);

// Komponen Bunga agar kode lebih bersih
const FlowerDecoration = ({ position }: { position: "top-left" | "bottom-right" }) => {
  const isTop = position === "top-left";
  const posClass = isTop ? "top-0 -left-3" : "bottom-0 -right-3";
  const rotation = isTop ? "rotate-180" : "rotate-0";

  return (
    <div className={`absolute ${posClass} ${rotation} w-64 h-64 z-30 pointer-events-none opacity-80`}>
      <Image src="/assets/images/floral/16.webp" alt="f1" width={130} height={130} className="swing-right-slow absolute -bottom-10 -right-5 transform -rotate-12" />
      <Image src="/assets/images/floral/28.webp" alt="f2" width={110} height={110} className="swing-left-slow absolute bottom-5 -right-5 transform -rotate-[32deg]" />
    </div>
  );
};

export default Couple;
