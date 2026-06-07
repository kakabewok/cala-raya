import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import Image from "next/image";

export default function BreakingNews() {
  const { invitationData: data } = useInvitation();

  return (
    <div className="mb-14 max-w-sm" data-aos="zoom-in">
      <h2 className="mb-4 text-lg font-bold">Breaking News</h2>
      <div className="relative aspect-square">
        <Image
          src={optimizeCloudinaryUrl(findImage(data, "message"))}
          alt="breaking news"
          fill
          priority
          className="object-cover object-center rounded-sm"
        />
      </div>
      <div className="mt-3 rounded-sm border-neutral-950 bg-neutral-900 p-3 text-sm leading-[1.15rem] text-slate-100 italic">
        {data?.message ? (
          <div
            className="space-y-2 italic"
            dangerouslySetInnerHTML={{
              __html: data?.message || "",
            }}
          ></div>
        ) : (
          <div className="space-y-2 italic">
            <p>
              Hai teman-teman tersayang! Kalian adalah bagian berharga dalam
              hidup kami, dan dengan penuh sukacita, kami ingin membagikan kabar
              bahagia bahwa kami akan segera menikah! 💌
            </p>
            <p className="mt-4">
              Meski jarak mungkin memisahkan secara fisik, kami sangat berharap
              doa dan restu terbaik dari kalian untuk kelancaran serta
              kebahagiaan perjalanan baru kami.
            </p>
            <p className="mt-4">Dengan penuh cinta dan harapan,</p>
            <p>
              {" "}
              {data?.host_two_nickname} & {data?.host_one_nickname} 💖
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
