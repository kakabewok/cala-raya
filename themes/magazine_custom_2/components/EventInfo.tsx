import { poppins, remineFares } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { Rundown } from "@/types/invitation-data";
import { findImage } from "@/utils/find-image";
import { formatDate } from "@/utils/format-date";
import { formatTime } from "@/utils/format-time";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

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
    <section className="py-6 px-10 relative w-full h-auto bg-white overflow-hidden">
      <Image
        src={optimizeCloudinaryUrl(findImage(data, "event-info"))}
        alt="Event info"
        fill
        className="object-cover object-center z-0"
        priority
      />
      <div
        className="z-20 h-auto bg-orange-50 flex flex-col justify-start items-center py-6"
        data-aos="fade-up"
      >
        {data?.rundowns
          ?.sort((a, b) => a.order_number - b.order_number)
          .map((rundown, index) => (
            <div
              className="p-6 w-full flex flex-col justify-center items-center"
              key={index}
            >
              {/* <h1
                className={`
                px-5
                pb-3
                w-fit
                border-b-1 border-neutral-700
                text-2xl font-medium text-neutral-700
                mb-5
                ${remineFares.className}
            `}
              >
                {rundown.title.toUpperCase() || `RUNDOWN ${index + 1}`}
              </h1> */}
              <div className="mb-5 px-5">
                <div className="w-fit border-b-1 border-neutral-700 pb-3">
                  <h1
                    className={`
                      text-2xl font-medium text-neutral-700 text-center
                      ${remineFares.className}
                    `}
                  >
                    {rundown.title.toUpperCase() || `RUNDOWN ${index + 1}`}
                  </h1>
                  {rundown.description && (
                    <p
                      className={`${poppins.className} text-[10px] font-light text-neutral-700 text-center whitespace-nowrap`}
                    >
                      {rundown.description}
                    </p>
                  )}
                </div>
              </div>
              <p
                className={`${remineFares.className} text-md font-medium mb-2 text-neutral-700`}
              >
                {formatDate(rundown.date, true)}
              </p>
              {rundown.start_time && (
                <p
                  className={`${remineFares.className} text-md font-medium mb-2 text-neutral-700`}
                >
                  · {formatTime(rundown.start_time)} {rundown.time_zone} -{" "}
                  {rundown.end_time && rundown.start_time
                    ? `${formatTime(rundown.end_time)} ${rundown.time_zone}`
                    : "selesai"}{" "}
                  ·
                </p>
              )}

              <Link
                href={generateGoogleCalendarUrl(rundown)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${poppins.className} text-xs font-medium underline text-neutral-700`}
              >
                Tambah ke Kalender
              </Link>
            </div>
          ))}
        <div className="p-6 w-full flex flex-col justify-center items-center">
          <h1
            className={`
                px-5
                pb-3
                w-fit
                border-b-1 border-neutral-700
                text-2xl font-medium text-neutral-700
                mb-5
                ${remineFares.className}
            `}
          >
            LOKASI
          </h1>
          <p
            className={`${remineFares.className} text-md font-medium mb-2 text-neutral-700 text-center`}
          >
            {data?.rundowns?.[0].location || "-"}
          </p>

          <p
            className={`${poppins.className} text-[10px] font-light mb-6 text-neutral-700 text-center`}
          >
            {data?.rundowns?.[0].location_detail || "-"}
          </p>

          <Link
            href={data?.rundowns?.[0].location_url || "#"}
            className="py-2 px-4 text-xs bg-transparent rounded-none border border-neutral-700 text-neutral-700 cursor-pointer hover:bg-transparent"
          >
            LIHAT LOKASI
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventInfo;
