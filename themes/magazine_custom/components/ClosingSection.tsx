import { poppins, remineFares } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { createSocialMediaLink } from "@/utils/create-social-media-link";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import Image from "next/image";
import Link from "next/link";

const ClosingSection = () => {
  const { invitationData: data } = useInvitation();
  return (
    <section className="bg-[#ffffff]">
      <div className="relative">
        <Image
          src={optimizeCloudinaryUrl(findImage(data, "closing"))}
          alt="Closing image"
          width={800}
          height={600}
          quality={100}
          className="w-full h-auto object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-black/40"></div>
        {data?.host_two_social_media && data?.host_one_social_media && (
          <div
            className={`${poppins.className} absolute right-0 top-0  text-neutral-200 p-6 text-right`}
            data-aos="fade-up"
          >
            <p className="text-md tracking-wide font-medium">
              <span className="border-b-1 border-neutral-200 pb-1">
                {" "}
                <Link
                  href={createSocialMediaLink(
                    data?.host_two_social_media || ""
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{data?.host_two_social_media}
                </Link>
              </span>{" "}
              |{" "}
              <span className="border-b-1 border-neutral-200 pb-1">
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
            </p>
            <p className="text-xs font-medium mt-4">
              Share the joy on Instagram
              <br />
              and tag us!
            </p>
          </div>
        )}
      </div>

      <div className="relative py-14 overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div
            className={`${remineFares.className} text-center text-9xl font-bold text-gray-200 opacity-45 transform -rotate-50 select-none`}
          >
            <p className="mb-7">{data?.host_one_nickname.toLocaleLowerCase()}</p>
            {/* <br /> */}
            <p>{data?.host_two_nickname.toLocaleLowerCase()}</p>
          </div>
        </div>
        <div className="text-center flex justify-center items-center">
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "initial"))}
            alt="Initial"
            width={120}
            height={120}
            style={{ filter: "invert(7%) brightness(0.3)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
