import { ninfa } from "@/fonts/fonts";

const Bismillah = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#FFF9F5] py-5 px-7 text-center">
      <p
        className={`${ninfa.className} text-xs text-primary-mono3 font-light tracking-wider`}
        data-aos="fade-up"
        data-aos-offset="100"
      >
        We cordially invite you to our wedding
      </p>
    </div>
  );
};

export default Bismillah;
