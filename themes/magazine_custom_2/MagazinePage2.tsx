"use client";

import { useState } from "react";
import MainPage from "./components/MainPage";
import OpeningScreen from "./components/OpeningScreen";

export default function InvitationPage() {
  const [isOpenInvitation, setIsOpenInvitation] = useState<boolean>(false);

  return (
    <>
      <OpeningScreen
        isOpenInvitation={isOpenInvitation}
        setIsOpenInvitation={setIsOpenInvitation}
      />
      {isOpenInvitation && <MainPage isOpenInvitation={isOpenInvitation} />}
    </>
  );
}
