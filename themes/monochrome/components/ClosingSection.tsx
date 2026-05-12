import { lagunac, monthGlade, poppins } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import Image from "next/image";

const ClosingSection = () => {
  const { invitationData: data } = useInvitation();
  return (
    <section className="bg-[#f8f4ec]">
      <div className="relative">
        <Image
          src={findImage(data, "closing")}
          alt="Closing image"
          width={800}
          height={600}
          className="w-full h-auto object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-black/75"></div>
        {(
          <div
            className={`w-full absolute right-0 top-0 text-neutral-200 p-6 text-left`}
            data-aos="fade-up"
          >
            <div className="flex flex-col gap-2">
              <h2 className={`${lagunac.className} text-base font-normal`}>
                Thank You
              </h2>
              <p className={`${poppins.className} text-xs font-normal`}>
                It’s an honor and a joy for us if Mr./Mrs./Brother/sister was
                pleased to attend and give a prayer of blessing to us.
              </p>
              <p className={`${poppins.className} text-xs font-normal`}>
                With love, <br />{" "}
                <span className="font-semibold">
                  {data?.host_two_nickname} & {data?.host_one_nickname}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="relative py-16 overflow-hidden">
        {/* Watermark Name*/}
        <div className="absolute inset-0 flex justify-center items-center">
          <div
            className={`${monthGlade.className} text-8xl font-normal text-gray-300 opacity-30 transform -rotate-40 select-none flex flex-col justify-center items-center gap-10`}
          >
            <p>{data?.host_two_nickname}</p>
            <p>{data?.host_one_nickname}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-4 p-10 text-slate-600">
          <p className="text-xs font-normal">
            And of everything We created pairs, so that you may remember (the
            greatness of Allah SWT)
          </p>
          <p className="text-xs font-bold">Adh-Dhariyat - 49</p>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
