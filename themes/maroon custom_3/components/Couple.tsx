import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import { createSocialMediaLink } from "@/utils/create-social-media-link";
import { amalfiCoast, cursiveFont, ninfa, playfair } from "@/fonts/fonts";

// const Couple = () => {
//   const { invitationData: data } = useInvitation();
//   const animationRef = useRef(null);

//   return (
//     <section
//       ref={animationRef}
//       className="relative w-full h-screen bg-orange-50 flex items-center justify-center overflow-hidden"
//     >
//       {/* DOUBLE LINE BORDER - Membingkai elegan di tengah */}
//       <div className="absolute inset-8 border border-[#c6a886]/30 z-10 pointer-events-none" />
//       <div className="absolute inset-10 border border-[#c6a886]/50 z-10 pointer-events-none" />

//       {/* CONTENT BOX - Posisi Tengah, Tanpa Blur & Gradient */}
//       <div
//         className={`${playfair.className} z-20 w-full max-w-lg flex flex-col items-center text-center px-10`}
//         data-aos="fade-up"
//       >
//         {/* HIRARKI 1: Nama Utama (Besar & Dominan) */}
//         <h2 className="text-3xl md:text-4xl tracking-[0.15em] text-rose-900 mb-4 font-light">
//           {data?.host_two_name}
//         </h2>

//         {/* HIRARKI 2: Informasi Tambahan (Putri dari...) */}
//         <p className="text-sm md:text-base font-light text-rose-800/80 leading-relaxed mb-8">
//           {data?.host_two_additional_info}
//         </p>

//         {/* HIRARKI 3: Akun Instagram (Center & Clean) */}
//         {data?.host_two_social_media && (
//           <Link
//             href={createSocialMediaLink(data?.host_two_social_media || "")}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-2 text-rose-900 text-[11px] tracking-[0.2em] border border-rose-900/30 rounded-full px-5 py-1.5 hover:bg-rose-900 hover:text-white transition-all duration-300 font-medium"
//           >
//             <Instagram className="h-3.5 w-3.5" />
//             {`${data?.host_two_social_media}`}
//           </Link>
//         )}
//       </div>

//       {/* FLOWER GROUP - Tetap di posisi awal (Kanan Bawah) */}
//             <div className="absolute top-0 left-0 w-64 h-64 z-30 pointer-events-none">
//               <Image
//                 src="/assets/images/floral/16.webp"
//                 alt="Bunga 1"
//                 width={130}
//                 height={130}
//                 className="swing-left-fast absolute -top-6 -left-10 z-40 transform rotate-45"
//               />
//               <Image
//                 src="/assets/images/floral/28.webp"
//                 alt="Bunga 2"
//                 width={110}
//                 height={110}
//                 className="swing-right-slow absolute top-5 -left-5 z-30 transform rotate-[32deg]"
//               />
//               <Image
//                 src="/assets/images/floral/12.webp"
//                 alt="Bunga 3"
//                 width={90}
//                 height={90}
//                 className="swing-left-slow absolute -top-5 left-7 z-30 transform rotate-[41deg]"
//               />
//               <Image
//                 src="/assets/images/floral/21.webp"
//                 alt="Bunga 4"
//                 width={120}
//                 height={120}
//                 className="swing-right-slow absolute top-24 -left-12 z-20 transform rotate-[45deg]"
//               />
//             </div>

//       {/* FLOWER GROUP - Tetap di posisi awal (Kanan Bawah) */}
//       <div className="absolute bottom-0 right-0 w-64 h-64 z-30 pointer-events-none">
//         <Image
//           src="/assets/images/floral/16.webp"
//           alt="Bunga 1"
//           width={130}
//           height={130}
//           className="swing-left-fast absolute -bottom-10 -right-5 z-40 transform -rotate-12"
//         />
//         <Image
//           src="/assets/images/floral/28.webp"
//           alt="Bunga 2"
//           width={110}
//           height={110}
//           className="swing-right-slow absolute bottom-5 -right-5 z-30 transform -rotate-[32deg]"
//         />
//         <Image
//           src="/assets/images/floral/12.webp"
//           alt="Bunga 3"
//           width={90}
//           height={90}
//           className="swing-left-slow absolute -bottom-16 right-9 z-30 transform -rotate-[32deg]"
//         />
//         <Image
//           src="/assets/images/floral/21.webp"
//           alt="Bunga 4"
//           width={120}
//           height={120}
//           className="swing-right-slow absolute bottom-24 -right-12 z-20 transform -rotate-[45deg]"
//         />
//       </div>
//     </section>
//   );
// };

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
          <h2 className={`${amalfiCoast.className} font-medium text-3xl md:text-6xl text-primary-mono3 mb-5 capitalize`}>
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
          <h2 className={`${amalfiCoast.className} font-medium text-2xl text-primary-mono3 mb-2 capitalize`}>
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
