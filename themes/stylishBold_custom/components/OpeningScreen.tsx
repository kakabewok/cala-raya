import { nyghtSerif } from "@/fonts/fonts";
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
          className={`bg-secondary-stylishb max-w-md mx-auto fixed inset-0 z-50 flex items-center justify-center origin-top overflow-hidden`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
        >
          <Image
            src={optimizeCloudinaryUrl(findImage(data, "hero"))}
            alt="Hero background"
            fill
            priority
            className={`grayscale object-cover object-center z-0`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55 z-10 pointer-events-none" />

          <div
            className={`${nyghtSerif.className} relative h-screen w-full z-20 text-white`}
          >
            {/* INITIAL */}
            <div className="absolute top-0 -left-2">
              <motion.div
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 2.5, delay: 0.7 }}
              >
                <Image
                  src={optimizeCloudinaryUrl(findImage(data, "initial"))}
                  alt="Initial"
                  priority
                  width={220}
                  height={220}
                />
              </motion.div>
            </div>
            {/* GUEST NAME */}
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.5, delay: 0.7 }}
              className={`gap-3 w-full absolute left-0 bottom-0 tracking-wider flex flex-col items-end justify-center px-10 pb-32`}
            >
              <p className="text-xs font-light italic">Halo,</p>
              <p className="text-2xl leading-relaxed">{guest?.name}</p>
              <button
                className="cursor-pointer relative inline-flex items-center justify-center font-normal bg-transparent overflow-visible px-4 py-[10px] text-xs"
                onClick={handleClick}
                type="button"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <svg
                    className="absolute w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="50"
                      cy="20"
                      rx="49.5"
                      ry="19.5"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      className="stroke-line-stylishb"
                    />
                  </svg>
                </div>
                <span className="relative z-10 font-nyght-serif text-white">
                  Buka Undangan
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
