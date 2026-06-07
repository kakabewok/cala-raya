import { useInvitation } from "@/hooks/use-invitation";
import { GalleryItem } from "./gallery-item";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";

export default function OurGallery() {
  const { invitationData: data } = useInvitation();

  const sortedGallery = data?.images?.sort(
    (a, b) => a.order_number - b.order_number
  );

  return (
    <div className="mb-14">
      <h2
        className="mb-4 text-lg leading-5 font-bold text-white"
        data-aos="zoom-in"
      >
        Our Gallery
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {sortedGallery
          ?.filter((image) => image.type == "gallery")
          .map((item, index) => (
            <GalleryItem key={index} src={optimizeCloudinaryUrl(item.url)} />
          ))}
      </div>
    </div>
  );
}
