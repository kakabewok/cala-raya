import { useInvitation } from "@/hooks/use-invitation";
import RundownItem from "./rundown-item";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";

export default function TimelineAndLocation() {
  const { invitationData: data } = useInvitation();
  const sortedRundowns = data?.rundowns?.sort(
    (a, b) => a.order_number - b.order_number
  );

  return (
    <div className="mb-14">
      <h2
        className="mb-4 text-lg leading-5 font-bold text-white"
        data-aos="zoom-in"
      >
        Timeline & Location
      </h2>
      <div className="space-y-6">
        {sortedRundowns?.map((item, index) => (
          <RundownItem
            title={item.title}
            location={item.location}
            location_url={item.location_url}
            date={item.date}
            start_time={item.start_time}
            end_time={item.end_time}
            time_zone={item.time_zone}
            image_url={optimizeCloudinaryUrl(item.image_url)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
