"use client";

import { Button } from "@/components/ui/button";
import { amalfiCoast, ninfa, poppins } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [isDomLoaded, setIsDomLoaded] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpenInvitation(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDomLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isOpenInvitation && (
        <motion.div
          className=" max-w-md mx-auto fixed inset-0 z-50 flex items-center justify-center origin-top overflow-hidden bg-orange-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 z-40"
            initial={{ opacity: 1 }}
            animate={isDomLoaded ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src={`/assets/images/maroon/koin.webp`}
              alt="Koin"
              width={150}
              height={150}
              className="object-cover object-center"
            />
          </motion.div>
          {/* left */}
          <div
            className={`${
              isDomLoaded ? "-translate-x-full" : "translate-x-0"
            } border-r-[1px] border-rose-900 backdrop-blur-sm absolute top-0 left-0 w-1/2 h-full z-30 transition-transform duration-1000 ease-in-out`}
          >
            <Image
              src="/assets/images/floral/16.webp"
              alt="Bunga 1"
              width={110}
              height={110}
              className="swing-left-slow absolute -top-14 -left-5 z-40 transform rotate-[45deg]"
            />
            <Image
              src="/assets/images/floral/28.webp"
              alt="Bunga 2"
              width={100}
              height={100}
              className="swing-right-slow absolute top-5 -left-5 z-30 transform rotate-[32deg]"
            />
            <Image
              src="/assets/images/floral/12.webp"
              alt="Bunga 3"
              width={80}
              height={80}
              className="swing-left-slow absolute -top-16 left-7 z-30 transform rotate-[32deg]"
            />
            <Image
              src="/assets/images/floral/21.webp"
              alt="Bunga 4"
              width={110}
              height={110}
              className="swing-right-slow absolute top-24 -left-12 z-20 transform rotate-[45deg]"
            />
          </div>
          {/* right */}
          <div
            className={`${
              isDomLoaded ? "translate-x-full" : "translate-x-0"
            } border-l-[1px] border-rose-900 backdrop-blur-sm absolute top-0 right-0 w-1/2 h-full z-30 transition-transform duration-1000 ease-in-out`}
          >
            <Image
              src="/assets/images/floral/16.webp"
              alt="Bunga 1"
              width={110}
              height={110}
              className="swing-left-fast absolute -bottom-10 -right-5 z-40 transform -rotate-12"
            />
            <Image
              src="/assets/images/floral/28.webp"
              alt="Bunga 2"
              width={100}
              height={100}
              className="swing-right-slow absolute bottom-5 -right-5 z-30 transform -rotate-[32deg]"
            />
            <Image
              src="/assets/images/floral/12.webp"
              alt="Bunga 3"
              width={80}
              height={80}
              className="swing-left-slow absolute -bottom-16 right-9 z-30 transform -rotate-[32deg]"
            />
            <Image
              src="/assets/images/floral/21.webp"
              alt="Bunga 4"
              width={110}
              height={110}
              className="swing-right-slow absolute bottom-24 -right-12 z-20 transform -rotate-[45deg]"
            />
          </div>

          <div className="relative h-screen w-full z-20 text-white">
            <div className="w-full absolute top-28 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center justify-center gap-14">
                <p
                  className={`${ninfa.className} text-md text-neutral-600 tracking-widest font-light`}
                >
                  The Wedding of
                </p>
                <h1
                  className={`leading-20 transform -rotate-[27deg] ${amalfiCoast.className} text-5xl text-rose-900 tracking-widest font-light italic`}
                >
                  {data?.host_two_nickname} <br />{" "}
                  <span className="text-3xl">and</span>{" "}
                  {data?.host_one_nickname}
                </h1>
              </div>
            </div>
            <div
              className={`${ninfa.className} w-full gap-4 absolute left-1/2 transform -translate-x-1/2 bottom-32 tracking-wider ${poppins.className} flex flex-col items-center justify-center`}
            >
              <p className="text-sm text-neutral-600">Kepada Yth.</p>
              <p className="text-2xl text-rose-900">{guest?.name}</p>
              <Button
                size="lg"
                onClick={handleClick}
                className="text-xs bg-rose-900 rounded-none cursor-pointer hover:bg-rose-950 text-white"
              >
                BUKA UNDANGAN
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
