import { useInvitation } from "@/hooks/use-invitation";
import { formatDate } from "@/utils/format-date";
import { formatTime } from "@/utils/format-time";
import Image from "next/image";
import React from "react";

const EventInfo = () => {
  const { invitationData: data } = useInvitation();
  const rundowns = data?.rundowns;

  return (
    <section className="relative w-full h-screen flex flex-col items-start justify-evenly p-7 gap-10 bg-neutral-100 overflow-hidden">
      {rundowns &&
        rundowns.length > 0 &&
        rundowns
          .sort((a, b) => a.order_number - b.order_number)
          .map((rundown, index) => (
            <div
              className="space-y-2 text-neutral-400"
              key={index}
              data-aos="fade-left"
              data-aos-offset="100"
            >
              <p className="text-xs font-medium">{rundown.title}</p>
              <div className="h-[2px] w-6 bg-neutral-400 mt-1 rounded-md" />
              <h3 className="text-xl font-semibold">
                {formatDate(rundown.date, true)}
              </h3>
              <p className="text-2xl font-light">
                {formatTime(rundown.start_time)}
                {" - "} {formatTime(rundown.end_time) ?? "selesai"}{" "}
                {rundown.time_zone} { }
              </p>
            </div>
          ))}

      <div
        className="space-y-2 text-neutral-400"
        data-aos="fade-right"
        data-aos-offset="100"
      >
        <p className="text-xs font-medium">Lokasi</p>
        <div className="h-[2px] w-6 bg-neutral-400 mt-1 rounded-md" />
        <h3 className="text-xl font-semibold">{rundowns?.[0].location}</h3>
        {rundowns?.[0].location_url && (
          <a
            href={rundowns?.[0].location_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#decdbf] text-white text-sm px-4 py-2 mt-2 rounded-md hover:opacity-90 transition"
          >
            Lihat Lokasi
          </a>
        )}
      </div>

      <Image
        src="/assets/images/floral/16.webp"
        alt="Bunga 1"
        width={180}
        height={180}
        className="swing-left-slow absolute top-1/2 transform -translate-y-1/2 -right-14 z-40 -rotate-[36deg]"
      />
      <Image
        src="/assets/images/floral/21.webp"
        alt="Bunga 2"
        width={110}
        height={110}
        className="swing-right-fast absolute bottom-5 -right-6 z-30 transform -rotate-[35deg]"
      />
      <Image
        src="/assets/images/floral/15.webp"
        alt="Bunga 3"
        width={90}
        height={90}
        className="swing-right-fast absolute -top-1 -left-6 z-30 transform rotate-[40deg]"
      />
    </section>
  );
};

export default EventInfo;
