"use client";

import { commuters, lagunac } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { useState } from "react";

const GiftInfo = () => {
  const { invitationData: data } = useInvitation();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [addressCopied, setAddressCopied] = useState<boolean>(false);
  const [isGiftInfoOpen, setIsGiftInfoOpen] = useState<boolean>(false);

  const handleCopy = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2000);
    }
  };

  return (
    <section className="text-center bg-[#f8f4ec] px-5 py-10" data-aos="zoom-in">
      <h2
        className={`${lagunac.className} text-neutral-700 text-2xl font-medium tracking-wide mb-2`}
      >
        WEDDING GIFT
      </h2>
      <div className="w-24 h-px bg-neutral-700 mx-auto mb-6"></div>
      <p className="text-xs text-neutral-600 font-normal mb-8">
        Your love, kind wishes and prayer on our wedding day is the greatest
        gift of all. Without reducing our respect and thankfulness for your
        presence, in case you wish to send us blessing via online you can
        conveniently transfer through our bank account.
      </p>

      {!isGiftInfoOpen ? (
        <div className="bg-white w-full h-36 flex justify-center items-center">
          <button
            onClick={() => setIsGiftInfoOpen(true)}
            className={`${commuters.className} bg-slate-800 text-white text-xs px-4 py-2 cursor-pointer font-semibold`}
          >
            SEND GIFT
          </button>
        </div>
      ) : (
        <>
          {/* Account */}
          {data?.gift_infos?.map((gift, idx) => (
            <div
              className={`${commuters.className} text-slate-800 bg-white rounded-sm py-5 px-4 mb-6`}
              key={idx}
            >
              <p className="font-bold mb-1 text-xs">{gift.provider_name}</p>
            <p className={`${lagunac.className} mb-1 text-xs`}>{gift.account_number}</p>
              <p className="mb-4 text-xs">
                a.n. <span className="font-bold">{gift.account_holder}</span>
              </p>
              <button
                onClick={() => handleCopy(gift.account_number, idx)}
                className={`${
                  copiedIndex === idx
                    ? "bg-slate-100 text-slate-900"
                    : "bg-slate-700 text-white"
                } text-xs px-6 py-2 cursor-pointer`}
              >
                {copiedIndex === idx ? "Copied" : "Copy"}
              </button>
            </div>
          ))}

          {/* Address */}
          {data?.gift_infos?.[0].gift_delivery_address && (
            <div className="bg-white rounded-sm py-5 px-4">
              <p className="font-bold mb-2 text-xs text-slate-700">ADDRESS</p>
              <p className="text-slate-700 text-xs font-light mb-4">
                {data?.gift_infos?.[0].gift_delivery_address || ""}
              </p>
              <button
                onClick={() =>
                  handleCopy(data?.gift_infos?.[0].gift_delivery_address || "")
                }
                className={`${
                  addressCopied
                    ? "bg-slate-100 text-slate-900"
                    : "bg-slate-700 text-white"
                } text-xs px-6 py-2 cursor-pointer`}
              >
                {addressCopied ? "Copied" : "Copy"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default GiftInfo;
