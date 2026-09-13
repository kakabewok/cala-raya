import Image from "next/image";

const Bismillah = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 bg-orange-50 py-10 px-10 text-center">
      <Image
        src="/assets/images/magazine/bismillah.png"
        alt="Bismillah"
        width={150}
        height={150}
        data-aos="fade-up"
      />
      <p className="text-xs text-gray-400 font-medium" data-aos="fade-up">
        Kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan
        kami
      </p>
    </div>
  );
};

export default Bismillah;
