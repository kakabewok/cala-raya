import { amalfiCoast, playfair } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import Image from "next/image";
import Link from "next/link";

const ClosingSection = () => {
  const { invitationData: data } = useInvitation();
  return (
    <section className="w-full overflow-hidden">
      {/* Watermark */}
      <div className="w-full h-60 overflow-hidden bg-primary-mono3 flex justify-center items-center">
        <div
          className={`${amalfiCoast.className} flex flex-col justify-center items-center text-8xl font-light text-white transform -rotate-25 select-none`}
        >
          <p className="tracking-tighter">
            {data?.host_two_nickname.toLocaleLowerCase()}
          </p>
          <p className="-mt-3 tracking-tighter">
            {data?.host_one_nickname.toLocaleLowerCase()}
          </p>
        </div>
      </div>

      <div className="relative">
        <Image
          src={optimizeCloudinaryUrl(findImage(data, "closing"))}
          alt="Closing image"
          width={800}
          height={600}
          className="w-full h-auto object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-black/40"></div>

        <div
          className={`${playfair.className} absolute right-0 top-0  text-neutral-200 p-6 text-right`}
          data-aos="fade-up"
        >
          <p className="text-xs font-medium mb-3">
            Bagikan hari bahagia di Instagram dan tag kami
          </p>
          <Link
            href={`https://www.instagram.com/explore/tags/${data?.host_one_nickname}${data?.host_two_nickname}`}
            className="text-lg tracking-wide font-medium underline"
          >
            {data?.hashtag
              ? `${data?.hashtag}`
              : `#${data?.host_one_nickname}${data?.host_two_nickname}`}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
