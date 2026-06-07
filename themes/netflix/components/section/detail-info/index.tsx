"use client";

import AutoScrollToggle from "@/components/AutoScrollToggle";
// import QRCodeGuest from "@/components/QRCodeGuest";
import { useInvitation } from "@/hooks/use-invitation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import SongButton from "../../ui/song-button";
import BreakingNews from "../breaking-news";
import Bridegroom from "../bride-groom";
import Countdown from "../countdown";
import Footer from "../footer";
import Gift from "../gift";
import TimelineAndLocation from "../timeline-location";
import LoveStory from "../love-story";
import OurGallery from "../our-gallery";
import TitleInfo from "../title-info";
import WishSection from "../wish";
import Image from "next/image";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";

export default function DetailInfo() {
  const { invitationData: data } = useInvitation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.init({ duration: 1400, once: true, offset: 300 });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  return (
    <div className="space-y-5 pt-4 pb-10 relative">
      <div className="relative aspect-square px-2">
        <Image
          src={optimizeCloudinaryUrl(findImage(data, "hero"))}
          alt="Hero"
          fill
          priority
          className="object-cover object-center z-0"
        />
      </div>

      {/* <video
        className="w-full rounded-xs"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src={data?.videos?.[0].url} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <div className="space-y-3 px-4">
        <TitleInfo />
        <BreakingNews />
        <Bridegroom />
        {(data?.stories?.length ?? 0) > 0 && <LoveStory />}
        <OurGallery />
        <Countdown />
        <TimelineAndLocation />
        <Gift />
        <WishSection />
      </div>
      {/* <QRCodeGuest /> */}
      <AutoScrollToggle />
      <Footer />
      <SongButton />
    </div>
  );
}
