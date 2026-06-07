import { Button } from "@/components/ui/button";
import { poppins } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

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

  return (
    <AnimatePresence>
      {!isOpenInvitation && (
        <motion.div
          className="bg-[#eedcc5] max-w-md mx-auto fixed inset-0 z-50 flex items-center justify-center origin-top overflow-hidden"
          initial={{ y: "-100%", opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "hero"))}
            alt="Hero background"
            fill
            quality={100}
            className="object-cover object-center z-0"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55 z-10 pointer-events-none" />

          <div className="relative h-screen w-full z-20 text-white">
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <Image
                  src={findImage(data, "initial")}
                  alt="Initial"
                  priority
                  width={80}
                  height={80}
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className={`gap-5 max-w-48 absolute left-7 bottom-32 tracking-wider ${poppins.className} flex flex-col items-start justify-start`}
            >
              <p className="text-sm">Halo,</p>
              <p className="text-3xl leading-relaxed">{guest?.name}</p>
              <Button
                size="sm"
                onClick={handleClick}
                className="mt-5 text-xs bg-transparent rounded-none border border-white cursor-pointer hover:bg-transparent"
              >
                Buka Undangan
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
