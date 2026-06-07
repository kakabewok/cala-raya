import { Button } from "@/components/ui/button";
import { optivaground } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import { MoveDown } from "lucide-react";
import Image from "next/image";

const Cover = () => {
  const { invitationData: data } = useInvitation();
  const tag = `#${data?.host_one_nickname}${data?.host_two_nickname}`;

  const formatEventDate = (dateString: string) => {
    if (!dateString) return null;

    const eventDate = new Date(dateString);
    const day = String(eventDate.getDate()).padStart(2, "0");
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const year = eventDate.getFullYear();

    return `${day} · ${month} · ${year}`;
  };

  return (
    <div className="w-full relative h-screen flex items-center justify-center overflow-hidden bg-[#fdfaf6]">
      <Image
        src={optimizeCloudinaryUrl(findImage(data, "cover"))}
        alt="Cover background"
        fill
        priority
        className="object-cover object-center z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-black/55 z-10 pointer-events-none" />

      <div className="z-20 h-screen flex flex-col justify-between items-center text-white">
        <div className="tracking-wider mt-20 flex flex-col items-center justify-center">
          <p className="text-sm mb-2">{data?.hashtag ? data?.hashtag : tag}</p>
          <h1 className={`${optivaground.className} text-4xl mb-2`}>
            {data?.host_one_nickname} & {data?.host_two_nickname}
          </h1>
          <p className="text-sm">{formatEventDate(data?.event_date ?? "")}</p>
        </div>

        <Button className="mb-18 w-7 h-7 bg-neutral-600/20 text-white cursor-pointer rounded-full transition animate-bounce flex items-center justify-center">
          <MoveDown size={11} className="animate-pulse" />
        </Button>
      </div>
    </div>
  );
};

export default Cover;
