import { nyghtSerif, theSecret } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { createSocialMediaLink } from "@/utils/create-social-media-link";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import Image from "next/image";
import Link from "next/link";

const ClosingSection = () => {
  const { invitationData: data } = useInvitation();

  const eventDate = new Date(data?.event_date ?? "");
  const day = String(eventDate.getDate()).padStart(2, "0");
  const month = String(eventDate.getMonth() + 1).padStart(2, "0");
  const year = String(eventDate.getFullYear()).slice(-2);

  return (
    <section className="bg-[#ffffff]">
      <div className="relative">
        <Image
          src={optimizeCloudinaryUrl(findImage(data, "closing"))}
          alt="Closing image"
          width={800}
          height={600}
          className="w-full h-auto object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-black/40"></div>
        {data?.host_one_social_media ||
          (data?.host_two_social_media && (
            <div
              className={`${nyghtSerif.className} w-full absolute right-0 top-0  text-neutral-200 p-6 text-right`}
              data-aos="fade-up"
            >
              <p className="text-sm italic font-extralight mt-2 pb-4">
                Bagikan hari bahagia di Instagram dan tag kami
              </p>
              <p
                className={`${nyghtSerif.className} text-md tracking-wide font-medium`}
              >
                {data?.host_one_social_media && (
                  <span className={`pb-1`}>
                    <Link
                      href={createSocialMediaLink(
                        data?.host_one_social_media || ""
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @{data?.host_one_social_media}
                    </Link>
                  </span>
                )}
                {data?.host_two_social_media && (
                  <span className="pb-1">
                    <Link
                      href={createSocialMediaLink(
                        data?.host_two_social_media || ""
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @{data?.host_two_social_media}
                    </Link>
                  </span>
                )}
              </p>
            </div>
          ))}
      </div>

      <div className="bg-[#ede0d1] w-full max-w-lg aspect-square flex justify-center items-center relative overflow-hidden ">
        {/* Teks "Save Our Date" di Depan */}
        <div className="relative z-20">
          <div className="absolute right-0 bottom-0 flex justify-center items-center z-10">
            <div
              className={`leading-none ${nyghtSerif.className} text-[35px] text-neutral-400 text-left z-30 tracking-wider font-light flex justify-center items-center`}
            >
              {day}
              <span>.</span>
              {month}
              <span>.</span>
              {year}
            </div>
          </div>
          <h1
            className={`${theSecret.className} translate -rotate-[9deg] text-rose-800 font-script text-[80px] leading-none`}
          >
            <span>save our date</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
