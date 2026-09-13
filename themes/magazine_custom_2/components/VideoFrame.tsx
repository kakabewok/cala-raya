import { useInvitation } from "@/hooks/use-invitation";

const VideoFrame = () => {
  const { invitationData: data } = useInvitation();

  const videoUrl = data?.videos?.[0]?.url
    ? data.videos[0].url
    : "https://www.youtube.com/embed/dQw4w9WgXcQ";

  return (
    <div className="w-full h-auto px-5 pt-20 pb-5 bg-orange-50">
      <div className="aspect-video overflow-hidden">
        <iframe
          className="w-full h-full"
          src={videoUrl}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoFrame;
