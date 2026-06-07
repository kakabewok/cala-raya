import { gandhiSerif, ninfa } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { Rundown } from "@/types/invitation-data";
import { formatDate } from "@/utils/format-date";
import { formatTime } from "@/utils/format-time";
import { DateTime } from "luxon";
import Link from "next/link";
import Image from "next/image";

const EventInfo = () => {
  const { invitationData: data } = useInvitation();

  const generateGoogleCalendarUrl = (rundown: Rundown): string => {
    const date = rundown.date;
    const startTime = rundown.start_time;
    const endTime = rundown.end_time || startTime;

    const startDateTimeISO = `${date}T${startTime}`;
    const endDateTimeISO = `${date}T${endTime}`;

    const start = DateTime.fromISO(startDateTimeISO)
      .toUTC()
      .toFormat("yyyyLLdd'T'HHmmss'Z'");
    const end = DateTime.fromISO(endDateTimeISO)
      .toUTC()
      .toFormat("yyyyLLdd'T'HHmmss'Z'");

    const eventTitle = data?.event_title || "Wedding Event";
    const location = rundown.location || "-";
    const rundownTitle = `(${rundown.title})` || ``;
    const description = `${eventTitle} will be held at ${location} ${rundownTitle}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventTitle
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(
      rundown.location_url || ""
    )}&ctz=Asia/Jakarta`;

    return googleCalendarUrl;
  };

  return (
    <section className="relative w-full h-auto bg-white overflow-hidden">
      <div
        className={`${ninfa.className} z-20 h-auto bg-orange-50 flex flex-col justify-start items-center py-6`}
        data-aos="fade-up"
      >
        {data?.rundowns
          ?.sort((a, b) => a.order_number - b.order_number)
          .map((rundown, index) => (
            <div
              className="p-6 w-full gap-3 flex flex-col justify-center items-center"
              key={index}
            >
              <h1 className="px-1 pb-3 border-b border-rose-900 text-2xl font-light text-rose-900 text-center mx-auto w-fit">
                {rundown.title.toUpperCase() || `RUNDOWN ${index + 1}`}
                {rundown.description && (
                  <p className="mt-2 text-xs text-rose-900 font-light">
                    {rundown.description}
                  </p>
                )}
              </h1>
              <p className={`text-md font-light text-rose-900`}>
                {formatDate(rundown.date, true)?.toUpperCase()}
              </p>
              {rundown.start_time && (
                <p
                  className={`${gandhiSerif.className} text-sm font-light text-rose-900`}
                >
                  {formatTime(rundown.start_time)} {rundown.time_zone}{" "}
                  <span>-</span>{" "}
                  {rundown.end_time
                    ? `${formatTime(rundown.end_time)} ${rundown.time_zone}`
                    : "selesai"}{" "}
                </p>
              )}
              {rundown.start_time && (
                <Link
                  href={generateGoogleCalendarUrl(rundown)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-medium underline text-rose-900`}
                >
                  Tambah ke Kalender
                </Link>
              )}
              <p
                className={`mt-4 text-md font-light text-rose-900 text-center w-3/4`}
              >
                {rundown.location}
              </p>
              <p
                className={`text-xs font-light text-rose-900 opacity-80 text-center w-full`}
              >
                {rundown.location_detail}
              </p>
              {rundown?.location_url && (
                <Link
                  href={rundown?.location_url || "#"}
                  className="py-2 px-4 text-xs bg-rose-900 text-white cursor-pointer hover:bg-rose-950"
                >
                  LIHAT LOKASI
                </Link>
              )}
            </div>
          ))}
      </div>
      <Image
        src={`/assets/images/floral/11.webp`}
        width={100}
        height={100}
        alt="Kiri"
        className="swing-right-fast absolute z-20 top-28 -right-8"
        data-aos="fade-left"
      />

      <Image
        data-aos="zoom-in"
        src={`/assets/images/floral/28.webp`}
        width={115}
        height={115}
        alt="Kanan"
        className="swing-left-slow absolute top-1/2 transform -translate-y-1/2 -left-6 rotate-[40deg]"
      />
    </section>
  );
};

export default EventInfo;
