import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import Image from "next/image";

export default function Bridegroom() {
  const { invitationData: data } = useInvitation();

  return (
    <div className="mb-14" data-aos="zoom-in">
      <h2 className="mb-4 text-lg leading-5 font-bold text-white">
        {/* {data?.host_one_nickname} & {data?.host_two_nickname} */}
        Bride & Groom
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image
            alt="Bride"
            src={optimizeCloudinaryUrl(findImage(data, "brides"))}
            className="w-full rounded-sm"
            width={300}
            height={170}
          />
          <div>
            <h4 className="text-md mb-1 mt-2 font-medium text-white">
              {data?.host_two_name}
            </h4>
            <p className="text-xs leading-4 text-[#A3A1A1]">
              {data?.host_two_additional_info}
            </p>
          </div>
        </div>
        <div>
          <Image
            alt="Groom"
            src={optimizeCloudinaryUrl(findImage(data, "grooms"))}
            className="w-full rounded-sm"
            width={300}
            height={170}
          />
          <div>
            <h4 className="text-md mb-1 mt-2 font-medium text-white">
              {data?.host_one_name}
            </h4>
            <p className="text-xs leading-4 text-[#A3A1A1]">
              {data?.host_one_additional_info}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
