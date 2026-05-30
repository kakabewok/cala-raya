"use client";

import { useInvitation } from "@/hooks/use-invitation";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

export default function SongButton({
  isOpenInvitation,
}: {
  isOpenInvitation: boolean;
}) {
  const { invitationData: data } = useInvitation();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // stop the song when browser is closed or minimized
  useEffect(() => {
    const handleVisibilityChange = (): void => {
      if (document.hidden) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed left-5 bottom-5 z-40">
      {isOpenInvitation && isPlaying && (
        <audio autoPlay loop src={data?.music?.url} className="hidden" />
      )}

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="backdrop-blur-md bg-neutral-600/20 flex h-9 w-9 items-center justify-center rounded-full"
      >
        {isPlaying ? (
          <Volume2 className="h-4 w-4 text-white animate-pulse cursor-pointer" />
        ) : (
          <VolumeX className="h-4 w-4 text-white cursor-pointer" />
        )}
      </button>
    </div>
  );
}
