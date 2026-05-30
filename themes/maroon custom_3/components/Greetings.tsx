import { amalfiCoast, ninfa, playfair, spectral } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import Image from "next/image";
import { findImage } from "@/utils/find-image";

export default function Greetings() {
  const { invitationData: data } = useInvitation();

  return (
    <div className="bg-[#FFF9F5] h-auto py-10 w-full">
      {/* Phone shell */}
      <div className="w-full h-[720px] bg-[#FFF9F5] overflow-hidden flex flex-col items-center justify-between relative px-8 py-8">
        {/* Title */}
        <div className={`${amalfiCoast.className} capitalize transform -rotate-[11deg] flex flex-col gap-8 tracking-wider text-center text-3xl italic font-semibold text-primary-mono3 w-full mb-14`}>
          <p>We are</p>
          <p>Getting</p>
          <p className="mt-4">Married</p>
        </div>
        {/* Card stack */}
        {/* <div className=" bg-red-500 rounded-sm overflow-hidden flex flex-col items-center justify-center gap-3 px-5 py-5"> */}

        {/* Polaroid frame */}
        <div className="w-full bg-white shadow-sm rotate-[2deg] flex flex-col p-4 pb-0 rounded-sm">
          {/* Photo */}
          {/* <div className="w-full h-[220px] overflow-hidden">
               <Image
                        src={findImage(data, "greeting")}
                        alt="Cover photo"
                        width={150}
                        height={150}
                        className="w-full h-full object-cover object-center"
                        priority
                      />
            </div> */}
          <div className="w-full h-[220px] overflow-hidden relative">
            <Image
              src={findImage(data, "greeting")}
              alt="Cover photo"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Polaroid caption */}
          <div className={`${playfair.className} w-full flex flex-col items-center justify-center py-[14px] px-2 gap-[8px] text-primary-mono3`}>
            <p className="text-[11px] text-center leading-[1.85] tracking-[0.01em]">
              "Above all, love each other deeply,
              because love covers over a multitude of sins."
            </p>
            {/* <div className="w-8 h-px bg-rose-800 mt-1" /> */}
            <p className="text-[11px] tracking-[0.16em] text-primary-mono3 uppercase font-semibold">
              1 Peter 4:8
            </p>
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
}


{/* Card stack */ }
// <div className="relative mx-auto w-full max-w-sm flex-1" >
//   {/* Back card — rose-900 */}
//   <div style={{
//     position: "absolute", inset: 0,
//     background: "#881337",
//     borderRadius: 8,
//   }}>
//     {/* Folder tab */}
//     <div style={{
//       position: "absolute", top: -15, left: 18,
//       width: 84, height: 17,
//       background: "#881337",
//       borderRadius: "5px 5px 0 0",
//     }} />
//     {/* Tab labels */}
//     <div style={{
//       position: "absolute", top: 10, left: 20, right: 20,
//       display: "flex", justifyContent: "space-between",
//     }}>
//       <span className="font-tenor" style={{ fontSize: 8, letterSpacing: "0.24em", color: "#fda4af", textTransform: "uppercase" }}>THE</span>
//       <span className="font-tenor" style={{ fontSize: 8, letterSpacing: "0.24em", color: "#fda4af", textTransform: "uppercase" }}>WEDDING</span>
//     </div>
//   </div>
//   {/* Mid card — rose-100 */}
//   <div style={{
//     position: "absolute", top: 13, left: 9, right: 9, bottom: -6,
//     background: "#ffe4e6",
//     borderRadius: 4,
//   }} />
//   {/* Front card — white */}
//   <div style={{
//     position: "absolute", top: 26, left: 5, right: 5, bottom: -10,
//     background: "#fff",
//     borderRadius: 3,
//     overflow: "hidden",
//     display: "flex",
//     flexDirection: "column",
//   }}>
//     {/* Photo */}
//     <div style={{ width: "100%", height: 230, flexShrink: 0, position: "relative", overflow: "hidden" }}>
//       <img
//         src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80"
//         alt="Couple"
//         style={{
//           width: "100%", height: "100%",
//           objectFit: "cover", objectPosition: "center 20%",
//           filter: "grayscale(100%) contrast(1.05)",
//         }}
//       />
//       <div style={{
//         position: "absolute", inset: 0,
//         background: "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.97) 100%)",
//       }} />
//     </div>
//     {/* Verse */}
//     <div style={{
//       flex: 1,
//       display: "flex", flexDirection: "column",
//       alignItems: "center", justifyContent: "center",
//       gap: 10, padding: "14px 20px 16px",
//       background: "#fff",
//     }}>
//       <div style={{ width: 36, height: 1, background: "#9f1239" }} />
//       <p className="font-cormorant" style={{
//         fontSize: 12, color: "#3a2a2a",
//         textAlign: "center", lineHeight: 1.9,
//         letterSpacing: "0.01em",
//       }}>
//         "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya dan Dia menjadikan di antaramu rasa kasih dan sayang."
//       </p>
//       <div style={{ width: 36, height: 1, background: "#9f1239" }} />
//       <p className="font-tenor" style={{
//         fontSize: 9, letterSpacing: "0.22em",
//         color: "#881337", textTransform: "uppercase",
//       }}>
//         Q.S. Ar Rum: 21
//       </p>
//     </div>
//   </div>
// </div>