import { ninfa, playfair } from "@/fonts/fonts";
import Image from "next/image";

const Bismillah = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#FFF9F5] py-5 px-7 text-center">
      {/* <Image
        src="/assets/images/magazine/bismillah.png"
        alt="Bismillah"
        width={200}
        height={200}
        data-aos="fade-up"
      /> */}
      <p
        className={`${ninfa.className} text-xs text-primary-mono3 font-light tracking-wider`}
        data-aos="fade-up"
        data-aos-offset="100"
      >
        Kami mengundang{" "}
        <span className={`${playfair.className}`}>Bapak/Ibu/Saudara/i</span>{" "}
        untuk hadir pada acara pernikahan kami
      </p>
    </div>
  );
};

export default Bismillah;
