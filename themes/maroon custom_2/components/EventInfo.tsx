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
    const dateObj = DateTime.fromJSDate(rundown.date as unknown as Date, { zone: 'Asia/Jakarta' });
    const date = dateObj.toFormat('yyyy-LL-dd');

    const startTimeObj = DateTime.fromJSDate(rundown.start_time as unknown as Date, { zone: 'UTC' });
    const endTimeObj = DateTime.fromJSDate((rundown.end_time || rundown.start_time) as unknown as Date, { zone: 'UTC' });

    const startTime = startTimeObj.toFormat('HH:mm:ss'); // "15:00:00" ✅
    const endTime = endTimeObj.toFormat('HH:mm:ss');     // "16:00:00" ✅

    const start = DateTime.fromISO(`${date}T${startTime}`, { zone: 'Asia/Jakarta' })
      .toUTC()
      .toFormat("yyyyLLdd'T'HHmmss'Z'");

    const end = DateTime.fromISO(`${date}T${endTime}`, { zone: 'Asia/Jakarta' })
      .toUTC()
      .toFormat("yyyyLLdd'T'HHmmss'Z'");

    console.log('date:', date, '| startTime:', startTime, '| endTime:', endTime);
    console.log('start formatted:', start);
    console.log('end formatted:', end);

    const eventTitle = data?.event_title || "Wedding Event";
    const location = rundown.location || "-";
    const rundownTitle = rundown.title ? `(${rundown.title})` : '';
    const description = `${eventTitle} will be held at ${location} ${rundownTitle}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(eventTitle)}` +
      `&dates=${start}/${end}` +
      `&details=${encodeURIComponent(description)}` +
      `&location=${encodeURIComponent(rundown.location_url || '')}` +
      `&ctz=Asia/Jakarta`;
  };

  return (
    <section className="relative w-full h-auto bg-[#FFF9F5] overflow-hidden">
      <div
        className={`${ninfa.className} z-20 h-auto bg-[#FFF9F5] flex flex-col justify-start items-center py-2`}
      >
        {data?.rundowns
          ?.sort((a, b) => a.order_number - b.order_number)
          .map((rundown, index) => (
            <div
              className="p-8 w-full flex flex-col justify-center items-center"
              key={index}
              data-aos="fade-up"
            >
              <h1
                className={`
                  px-6
                  pb-2
                  w-fit
                  border-b border-rose-800/60
                  text-2xl font-light tracking-[0.2em] text-rose-900
                  mb-6
                `}
              >
                {rundown.title.toUpperCase() || `RUNDOWN ${index + 1}`}
              </h1>

              {/* DATE & TIME GROUP */}
              <div className="flex flex-col items-center gap-1 mb-4">
                <p className="text-base font-medium tracking-widest text-rose-900">
                  {formatDate(rundown.date, true)?.toUpperCase()}
                </p>
                <p className={`${gandhiSerif.className} text-sm font-light text-rose-900`}>
                  {formatTime(rundown.start_time)} {rundown.time_zone}
                  {" — "}
                  {rundown.end_time
                    ? `${formatTime(rundown.end_time)} ${rundown.time_zone}`
                    : "Selesai"}
                </p>
              </div>

              <Link
                href={generateGoogleCalendarUrl(rundown)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-wider font-medium underline underline-offset-4 text-rose-900 hover:text-rose-800 transition-colors mb-8"
              >
                Tambah ke Kalender
              </Link>
            </div>
          ))}
      </div>

      <div className={`${ninfa.className} bg-[#FFF9F5] w-full py-10 flex flex-col items-center`}
        data-aos="fade-up" >
        <div className="flex flex-col items-center mb-2">
          <h1
            className={`
                  px-6
                  pb-2
                  w-fit
                  border-b border-rose-800/60
                  text-2xl font-light tracking-[0.2em] text-rose-900
                  mb-6
                `}
          >
            LOKASI
          </h1>
          <h2 className="text-lg font-medium text-rose-900 text-center leading-tight">
            {data?.rundowns?.[0].location}
          </h2>
          <p className="text-[11px] leading-relaxed font-light text-rose-800 text-center w-3/4 mt-1">
            {data?.rundowns?.[0].location_detail}
          </p>
        </div>

        <Link
          href={data?.rundowns?.[0].location_url || "#"}
          className="my-5 py-3 px-8 text-[11px] tracking-[0.15em] bg-rose-900 text-white font-medium hover:bg-rose-950 transition-all shadow-sm"
        >
          LIHAT LOKASI
        </Link>
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
        className="swing-left-slow absolute top-1/2 transform -translate-y-1/2 -left-18 rotate-[90deg]"
      />
    </section>
  );
};

export default EventInfo;
