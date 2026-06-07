import { poppins, remineFares } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import Image from "next/image";
import Link from "next/link";

const ClosingSection = () => {
  const { invitationData: data } = useInvitation();

  const formatEventDate = (dateString: string) => {
    if (!dateString) return null;

    const eventDate = new Date(dateString);
    const day = String(eventDate.getDate()).padStart(2, "0");
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const year = eventDate.getFullYear();

    return `${day} · ${month} · ${year}`;
  };

  return (
    <section className="bg-[#ffffff]">
      <div className="relative w-full">
        <Image
          src={optimizeCloudinaryUrl(findImage(data, "closing"))}
          alt="Closing image"
          width={1000}
          height={600}
          className="w-full h-auto object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-black/40"></div>

        <div
          className={`${poppins.className} absolute right-0 top-0  text-neutral-200 p-6 text-right`}
          data-aos="fade-up"
        >
          <p className="text-xs font-medium mb-3">
            Bagikan hari bahagia di Instagram kamu dengan menggunakan
          </p>
          <Link
            href={`https://www.instagram.com/explore/tags/${data?.host_one_nickname}${data?.host_two_nickname}`}
            className="text-xl tracking-wide font-semibold"
          >
            {data?.hashtag
              ? data?.hashtag
              : `#${data?.host_one_nickname}
            ${data?.host_two_nickname}`}
          </Link>
        </div>
      </div>

      <div className="relative py-28 overflow-hidden w-full">
        <div className="absolute -bottom-14 w-full h-fit flex items-end z-20">
          {[
            {
              src: "28.webp",
              width: 80,
              height: 80,
              className: "swing-left-fast",
            },
            {
              src: "16.webp",
              width: 110,
              height: 110,
              className: "swing-left-slow",
            },
            {
              src: "21.webp",
              width: 120,
              height: 120,
              className: "swing-right-fast",
            },
            {
              src: "bunga2.webp",
              width: 95,
              height: 95,
              className: "swing-right-slow",
            },
            {
              src: "16.webp",
              width: 80,
              height: 80,
              className: "swing-left-slow",
            },
            {
              src: "21.webp",
              width: 90,
              height: 90,
              className: "swing-right-fast",
            },
            {
              src: "15.webp",
              width: 90,
              height: 90,
              className: "swing-right-slow",
            },
            {
              src: "28.webp",
              width: 80,
              height: 80,
              className: "swing-left-fast",
            },
          ].map((img, i) => (
            <Image
              key={i}
              data-aos="zoom-in"
              src={`/assets/images/floral/${img.src}`}
              width={img.width}
              height={img.height}
              alt={`Bunga ${i + 1}`}
              className={`${img.className} -ml-11`}
            />
          ))}
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex justify-center items-center">
          <p
            className={`${remineFares.className} text-9xl font-bold text-gray-200 opacity-30 transform -rotate-45 select-none`}
          >
            {data?.host_one_nickname.toLocaleLowerCase()}
            <br />
            {data?.host_two_nickname.toLocaleLowerCase()}
          </p>
        </div>
        <div className="text-center flex flex-col justify-center items-center w-full">
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "initial"))}
            alt="Initial"
            width={80}
            height={80}
            style={{ filter: "invert(7%) brightness(0.3)" }}
          />
          <p className="text-sm text-[#c4a790]">
            {formatEventDate(data?.event_date ?? "")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
