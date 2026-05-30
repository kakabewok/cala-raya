import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import { createSocialMediaLink } from "@/utils/create-social-media-link";
import { playfair } from "@/fonts/fonts";

// const Grooms = () => {
//   const { invitationData: data } = useInvitation();
//   const animationRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: animationRef,
//     offset: ["start center", "center center"],
//   });

//   const clipPath = useTransform(
//     scrollYProgress,
//     [0, 0.5, 1],
//     ["inset(2% 11% 15.16%)", "inset(1% 6% 12.13%)", "inset(0% 0% 0%)"]
//   );

//   return (
//     <section
//       ref={animationRef}
//       className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden"
//     >
//       <motion.div className="absolute inset-0 z-0" style={{ clipPath }}>
//         <Image
//           src={findImage(data, "grooms")}
//           alt="Grooms photo"
//           fill
//           className="object-cover object-center"
//           priority
//         />
//       </motion.div>

//       {/* double line */}
//       <div className="absolute inset-10 border border-[#c6a886] z-10 pointer-events-none" />
//       <div className="absolute inset-11 border border-[#c6a886] z-10 pointer-events-none" />

//       {/* Content box */}
//       <div
//         className={`${playfair.className} gap-3 flex flex-col justify-center items-start absolute bottom-0 z-20 w-full bg-gradient-to-t from-white via-white/60 to-transparent px-6 py-8 backdrop-blur-sm`}
//         data-aos="fade-up"
//         data-aos-offset="100"
//       >
//         <h2
//           className={`max-w-[80%] text-left tracking-widest text-2xl text-[#fff] drop-shadow-sm`}
//         >
//           {data?.host_one_name}
//         </h2>
//         <p className="text-xs font-semibold text-white max-w-[50%] text-left drop-shadow-2xl">
//           {data?.host_one_additional_info}
//         </p>
//         {data?.host_one_social_media && (
//           <div className="font-semibold w-fit flex items-center gap-2 text-white text-xs bg-transparent rounded-sm border border-white cursor-pointer px-3 py-1">
//             <Instagram className="h-4 w-4 font-light" />{" "}
//             <Link
//               href={createSocialMediaLink(data?.host_one_social_media || "")}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {`@${data?.host_one_social_media}`}
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* flower */}
//       <Image
//         src="/assets/images/floral/16.webp"
//         alt="Bunga 1"
//         width={110}
//         height={110}
//         className="swing-left-fast absolute -bottom-10 -right-5 z-40 transform -rotate-12"
//       />
//       <Image
//         src="/assets/images/floral/28.webp"
//         alt="Bunga 2"
//         width={100}
//         height={100}
//         className="swing-right-slow absolute bottom-5 -right-5 z-30 transform -rotate-[32deg]"
//       />
//       <Image
//         src="/assets/images/floral/12.webp"
//         alt="Bunga 3"
//         width={80}
//         height={80}
//         className="swing-left-slow absolute -bottom-16 right-9 z-30 transform -rotate-[32deg]"
//       />
//       <Image
//         src="/assets/images/floral/21.webp"
//         alt="Bunga 4"
//         width={110}
//         height={110}
//         className="swing-right-slow absolute bottom-24 -right-12 z-20 transform -rotate-[45deg]"
//       />
//     </section>
//   );
// };

const Grooms = () => {
  const { invitationData: data } = useInvitation();
  const animationRef = useRef(null);

  // Scroll logic & clipPath dihapus agar tidak ada crop saat scroll
  return (
    <section
      ref={animationRef}
      className="relative w-full h-screen bg-orange-50 flex items-center justify-center overflow-hidden"
    >
      {/* DOUBLE LINE BORDER - Membingkai elegan di tengah */}
      <div className="absolute inset-8 border border-[#c6a886]/30 z-10 pointer-events-none" />
      <div className="absolute inset-10 border border-[#c6a886]/50 z-10 pointer-events-none" />

      {/* CONTENT BOX - Posisi Tengah, Tanpa Blur & Gradient */}
      <div
        className={`${playfair.className} z-20 w-full max-w-lg flex flex-col items-center text-center px-10`}
        data-aos="fade-up"
      >
        {/* HIRARKI 1: Nama Utama (Besar & Dominan) */}
        <h2 className="text-3xl md:text-4xl tracking-[0.15em] text-rose-900 mb-4 font-light">
          {data?.host_one_name}
        </h2>

        {/* HIRARKI 2: Informasi Tambahan (Putri dari...) */}
        <p className="text-sm md:text-base font-light text-rose-800/80 leading-relaxed mb-8">
          {data?.host_one_additional_info}
        </p>

        {/* HIRARKI 3: Akun Instagram (Center & Clean) */}
        {data?.host_one_social_media && (
          <Link
            href={createSocialMediaLink(data?.host_one_social_media || "")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-rose-900 text-[11px] tracking-[0.2em] border border-rose-900/30 rounded-full px-5 py-1.5 hover:bg-rose-900 hover:text-white transition-all duration-300 font-medium"
          >
            <Instagram className="h-3.5 w-3.5" />
            {`${data?.host_one_social_media}`}
          </Link>
        )}
      </div>

      {/* FLOWER GROUP - Tetap di posisi awal (Kanan Bawah) */}
      <div className="absolute top-0 left-0 w-64 h-64 z-30 pointer-events-none">
        <Image
          src="/assets/images/floral/16.webp"
          alt="Bunga 1"
          width={130}
          height={130}
          className="swing-left-fast absolute -top-6 -left-10 z-40 transform rotate-45"
        />
        <Image
          src="/assets/images/floral/28.webp"
          alt="Bunga 2"
          width={110}
          height={110}
          className="swing-right-slow absolute top-5 -left-5 z-30 transform rotate-[32deg]"
        />
        <Image
          src="/assets/images/floral/12.webp"
          alt="Bunga 3"
          width={90}
          height={90}
          className="swing-left-slow absolute -top-5 left-7 z-30 transform rotate-[41deg]"
        />
        <Image
          src="/assets/images/floral/21.webp"
          alt="Bunga 4"
          width={120}
          height={120}
          className="swing-right-slow absolute top-24 -left-12 z-20 transform rotate-[45deg]"
        />
      </div>

      {/* FLOWER GROUP - Tetap di posisi awal (Kanan Bawah) */}
      <div className="absolute bottom-0 right-0 w-64 h-64 z-30 pointer-events-none">
        <Image
          src="/assets/images/floral/16.webp"
          alt="Bunga 1"
          width={130}
          height={130}
          className="swing-left-fast absolute -bottom-10 -right-5 z-40 transform -rotate-12"
        />
        <Image
          src="/assets/images/floral/28.webp"
          alt="Bunga 2"
          width={110}
          height={110}
          className="swing-right-slow absolute bottom-5 -right-5 z-30 transform -rotate-[32deg]"
        />
        <Image
          src="/assets/images/floral/12.webp"
          alt="Bunga 3"
          width={90}
          height={90}
          className="swing-left-slow absolute -bottom-16 right-9 z-30 transform -rotate-[32deg]"
        />
        <Image
          src="/assets/images/floral/21.webp"
          alt="Bunga 4"
          width={120}
          height={120}
          className="swing-right-slow absolute bottom-24 -right-12 z-20 transform -rotate-[45deg]"
        />
      </div>
    </section>
  );
};

export default Grooms;
