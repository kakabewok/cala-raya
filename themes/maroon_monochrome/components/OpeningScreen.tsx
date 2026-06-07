import { commuters, lagunac, poppins } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface OpeningScreenProps {
  isOpenInvitation: boolean;
  setIsOpenInvitation: (isOpen: boolean) => void;
}

export default function OpeningScreen({
  isOpenInvitation,
  setIsOpenInvitation,
}: OpeningScreenProps) {
  const { invitationData: data, guest } = useInvitation();

  const handleClick = () => {
    setIsOpenInvitation(true);
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // iOS may block autoplay silently
      });
    }
  }, []);

  return (
    <AnimatePresence>
      {!isOpenInvitation && (
        <motion.div
          className="bg-[#eedcc5] max-w-md mx-auto fixed inset-0 z-50 flex items-center justify-center origin-top overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.5, ease: "easeIn" }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={data?.videos?.[0].url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55 z-10 pointer-events-none" />

          {/* TEXT */}
          <div className="relative h-screen w-full z-20 text-white">
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
              >
                <Image
                  src={optimizeCloudinaryUrl(findImage(data, "initial"))}
                  alt="Initial"
                  priority
                  width={80}
                  height={80}
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.5 }}
              className={`gap-4 w-full absolute bottom-32 tracking-wider ${poppins.className} flex flex-col items-center justify-center`}
            >
              <p className={`${commuters.className} text-sm font-semibold`}>
                Halo
              </p>
              <p
                className={`${lagunac.className} text-2xl font-normal text-center px-6`}
              >
                {guest?.name}
              </p>
              <button
                onClick={handleClick}
                className={`${commuters.className} font-bold px-4 py-2 text-xs bg-transparent rounded-none border border-white cursor-pointer hover:bg-transparent`}
              >
                BUKA UNDANGAN
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
