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
        {/* Polaroid frame */}
        <div className="w-full bg-white shadow-sm rotate-[2deg] flex flex-col p-4 pb-0 rounded-sm">
          {/* Photo */}
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