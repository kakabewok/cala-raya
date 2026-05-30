"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Bismillah from "./Bismillah";
import BridesCustom from "./BridesCustom";
import Cover from "./Cover";
import EventInfo from "./EventInfo";
import GroomsCustom from "./GroomsCustom";
import MusicButton from "./MusicButton";
import RSVP from "./Rsvp";
import GiftInfo from "./GiftInfo";
import ClosingSection from "./ClosingSection";
import Footer from "./Footer";
import Greetings from "./Greetings";
import Gallery from "./Gallery";
import Couple from "./Couple";

export default function MainPage({
  isOpenInvitation,
}: {
  isOpenInvitation: boolean;
}) {
  useEffect(() => {
    AOS.init({ duration: 1400, once: false, offset: 130 });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  return (
    <main className="max-w-md mx-auto z-10 flex flex-col items-center justify-center">
      <Cover />
      <Greetings />
      <Bismillah />
      <Couple />
      <EventInfo />
      <Gallery />
      <RSVP />
      <GiftInfo />
      <ClosingSection />
      <Footer />
      <MusicButton isOpenInvitation={isOpenInvitation} />
    </main>
  );
}
