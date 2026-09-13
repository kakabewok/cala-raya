"use client";

import { remineFares } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import { useState } from "react";

const GiftInfo = () => {
  const { invitationData: data } = useInvitation();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [addressCopied, setAddressCopied] = useState<boolean>(false);

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
        className={`${remineFares.className} text-neutral-700 text-3xl font-medium tracking-wide mb-2`}
      >
        Tanda Kasih
      </h2>
      <div className="w-24 h-px bg-neutral-700 mx-auto mb-6"></div>
      <p className="text-xs text-neutral-600 font-normal mb-8">
        Doa restu yang kami terima sangat berarti, namun jika memberi merupakan
        tanda kasih, tentunya semakin melengkapi kebahagiaan kami.
      </p>

      {/* Account */}
      {data?.gift_infos?.map((gift, idx) => (
        <div className="bg-white rounded-sm py-5 px-4 mb-6" key={idx}>
          <p className="font-bold mb-1 text-xs text-neutral-600">
            {gift.provider_name}
          </p>
          <p className="text-neutral-400 mb-1 text-xs">{gift.account_number}</p>
          <p className="text-neutral-400 mb-4 text-xs">
            a.n. <span className="font-semibold">{gift.account_holder}</span>
          </p>
          <button
            onClick={() => handleCopy(gift.account_number, idx)}
            className={`${
              copiedIndex === idx ? "bg-neutral-400" : "bg-neutral-800"
            } text-white text-xs px-6 py-2 cursor-pointer`}
          >
            {copiedIndex === idx ? "Tersalin" : "Salin"}
          </button>
        </div>
      ))}

      {/* Address */}
      {data?.gift_infos?.[0].gift_delivery_address && (
        <div className="bg-white rounded-sm py-5 px-4">
          <p className="font-bold mb-2 text-xs text-neutral-600">
            HADIAH FISIK
          </p>
          <p className="text-neutral-400 text-xs mb-4">
            {data?.gift_infos?.[0].gift_delivery_address || ""}
          </p>
          <button
            onClick={() =>
              handleCopy(data?.gift_infos?.[0].gift_delivery_address || "")
            }
            className={`${
              addressCopied ? "bg-neutral-400" : "bg-neutral-800"
            } text-white text-xs px-6 py-2 cursor-pointer`}
          >
            {addressCopied ? "Tersalin" : "Salin"}
          </button>
        </div>
      )}

      {/* ==================== GIFT LIST SECTION (START COPY HERE) ==================== */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center text-center bg-white rounded-sm py-5 px-4">
        {/* <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 text-amber-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
            />
          </svg>
        </div> */}

{/* className="text-base font-semibold text-gray-800 mb-1 */}
        <h4 className="font-bold mb-2 text-xs text-neutral-600 uppercase">
          Kado & Wishlist Pernikahan
        </h4>
        
        <p className="text-xs text-neutral-400 max-w-xs mb-4 leading-relaxed">
          Jika Bapak/Ibu ingin memberikan kado dalam bentuk barang, kami telah menyiapkan daftar pilihan melalui tautan di bawah ini
        </p>

        <a
          href="https://giftlist.com/l/fLCdu4gCbF"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xs bg-stone-900 text-white text-xs font-medium tracking-wide hover:bg-stone-800 active:scale-95 transition-all shadow-sm"
        >
          <span>Pilih Kado di GiftList</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-3.5 h-3.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </a>
      </div>
      {/* ==================== GIFT LIST SECTION (END COPY HERE) ==================== */}
    </section>
  );
};

export default GiftInfo;
