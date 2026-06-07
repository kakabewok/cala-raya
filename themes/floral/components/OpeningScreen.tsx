import { Button } from "@/components/ui/button";
import { montserrat, optivaground } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface OpeningScreenProps {
  isOpenInvitation: boolean;
  setIsOpenInvitation: (isOpen: boolean) => void;
}

const OpeningScreen = ({
  isOpenInvitation,
  setIsOpenInvitation,
}: OpeningScreenProps) => {
  const { invitationData: data, guest } = useInvitation();

  const handleClick = () => {
    setIsOpenInvitation(true);
  };

  return (
    <AnimatePresence>
      {!isOpenInvitation && (
        <motion.div
          className="bg-[#eedcc5] max-w-md mx-auto fixed inset-0 z-50 flex items-center justify-center origin-top overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "hero"))}
            alt="Hero background"
            fill
            priority
            className="object-cover object-center z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55 z-10 pointer-events-none" />

          <div className="h-screen z-20 flex flex-col justify-between items-center text-center text-white">
            {/* khusus ilham rosi */}
            {/* <Image
              src={findImage(data, "initial")}
              alt="Initial"
              width={150}
              height={150}
              priority
              className="mt-20"
            /> */}
            <div className="h-full w-full flex items-center justify-center">
              <h1
                className={`${montserrat.className} mt-40 text-lg font-light tracking-wide uppercase`}
              >
                {data?.additional_info ?? ""}
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className={`tracking-wider ${optivaground.className} mb-20 flex flex-col items-start justify-center`}
            >
              <p className={`text-sm mb-2`}>Kepada Yth.</p>
              <p className={`text-3xl mb-3`}>{guest?.name}</p>
              <Button
                size="lg"
                onClick={handleClick}
                className="bg-orange-300 hover:bg-orange-400 cursor-pointer"
              >
                Buka Undangan
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningScreen;
