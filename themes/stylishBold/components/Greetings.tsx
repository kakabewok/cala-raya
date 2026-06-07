import { nyghtSerif } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export default function Greetings() {
  const { invitationData: data } = useInvitation();
  const lineRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: lineScrollY } = useScroll({
    target: lineRef,
    offset: ["start 50%", "start 10%"],
  });

  const rawLineHeight = useTransform(
    lineScrollY,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["0%", "20%", "40%", "60%", "80%", "100%"]
  );

  const lineHeight = useSpring(rawLineHeight, {
    damping: 20,
    stiffness: 50,
  });

  return (
    <div
      className={`${nyghtSerif.className} h-screen w-full bg-[#ede0d1] flex flex-col justify-between overflow-hidden relative`}
    >
      <div
        className="w-full text-left font-light text-[155px] overflow-visible p-0 transform absolute top-0 tracking-tighter"
        data-aos="fade-right"
      >
        {data?.host_two_nickname.toLowerCase()}
      </div>

      {/* line */}
      <motion.div
        className="z-0 border border-rose-700 absolute top-0 left-1/2 origin-top -translate-x-1/2"
        ref={lineRef}
        style={{ height: lineHeight }}
      />

      {/* text */}
      <div className="z-10 absolute top-1/2 left-1/2 origin-top -translate-x-1/2 -translate-y-1/2 bg-[#ede0d1] py-4">
        <p
          className="text-xs font-light text-center leading-5 tracking-wider"
          data-aos="fade-left"
        >
          It’s been a beautiful journey. Through time and love, we’ve grown
          together, and now, we’re ready to begin a new chapter — as one.
        </p>
      </div>

      <div
        className="flex w-full text-right font-light text-[155px] overflow-visible p-0 transform absolute bottom-0 tracking-tighter"
        data-aos="fade-left"
      >
        {data?.host_one_nickname.toLowerCase()}
      </div>
    </div>
  );
}
