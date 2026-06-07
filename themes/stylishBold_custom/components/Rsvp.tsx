"use client";

import { nyghtSerif, theSecret } from "@/fonts/fonts";
import { useEffect, useState } from "react";
import badwords from "indonesian-badwords";
import db from "@/configs/db-config";
import toast from "react-hot-toast";
import { useInvitation } from "@/hooks/use-invitation";
import Image from "next/image";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";

const RSVP = () => {
  const { invitationData, guest } = useInvitation();
  const [data, setData] = useState<
    {
      guest_name: string;
      message: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: guest?.name ?? "",
    message: "",
    attending: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { name, message, attending } = form;
    const cleanMessage = message ? badwords.censor(message) : "";

    const { error } = await db.from("rsvps").insert([
      {
        guest_name: name ?? guest?.name,
        message: cleanMessage,
        attendance_status:
          attending === "1" || attending === "2" || attending === "3",
        total_guest: Number(attending) ?? 0,
        invitation_id: invitationData?.id,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Failed saving RSVP: ", error.message);
      toast.error("Terjadi kesalahan saat menyimpan RSVP.");
    } else {
      fetchData();
      toast.success("RSVP berhasil dikirim. Terima kasih!");
      setForm({ name: "", message: "", attending: "" });
    }
  };

  const fetchData = async () => {
    const { data, error } = await db
      .from("rsvps")
      .select("guest_name, message")
      .eq("invitation_id", invitationData?.id)
      .not("message", "eq", "")
      .order("updated_at", { ascending: false });

    if (error) console.error("Error fetching RSVP data: ", error);
    else setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="py-20 bg-primary-stylishb">
        <div
          className={`${nyghtSerif.className} px-8 w-full max-w-md space-y-6  text-white`}
        >
          <div className="text-center">
            <h1 className="text-7xl font-semibold">RSVP</h1>
            <p className="mt-4 text-sm italic">
              Konfirmasi kehadiranmu dengan mengisi form di bawah ini.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Input Nama */}
            <div className="relative flex flex-col justify-center items-center">
              <label htmlFor="name" className="text-xl text-center">
                Nama
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="font-light text-center w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:ring-0 focus:border-white py-2 text-sm"
              />
            </div>

            {/* Dropdown Kehadiran */}
            <div className="relative flex flex-col justify-center items-center">
              <label
                htmlFor="attending"
                className="text-xl text-center mx-auto"
              >
                Saya akan menghadiri
              </label>
              <div className="relative mt-2 w-full">
                <select
                  id="attending"
                  name="attending"
                  value={form.attending}
                  onChange={handleChange}
                  className="font-light text-center w-full bg-transparent border-0 border-b-2 appearance-none focus:outline-none py-2 text-sm "
                >
                  <option value="" disabled>Pilih Kehadiran</option>
                  <option
                    className="hover:text-slate-800 text-slate-800"
                    value="1"
                  >
                    Hadir
                  </option>
                  <option
                    className="hover:text-slate-800 text-slate-800"
                    value="0"
                  >
                    Tidak Hadir
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Textarea Ucapan & Doa */}
            <div className="relative flex flex-col justify-center items-center">
              <label htmlFor="message" className="text-xl text-center">
                Ucapan & Doa
              </label>
              <textarea
                id="message"
                name="message"
                rows={1}
                value={form.message}
                onChange={handleChange}
                className="font-light text-center w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:ring-0 focus:border-white py-2 text-sm resize-none"
              />
            </div>

            <div className="w-full flex justify-center">
              <button
                className="text-center cursor-pointer relative items-center justify-center font-normal bg-transparent overflow-visible px-4 py-[10px] text-xs"
                disabled={loading}
                type="submit"
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
                      stroke="#FFFF"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
                <span
                  className={`${nyghtSerif.className} relative z-10 font-nyght-serif text-white text-center`}
                >
                  Kirim
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {/* messages */}
        <div className="bg-secondary-stylishb py-3 overflow-hidden">
          <div
            data-aos="fade-left"
            className={`${nyghtSerif.className} text-[45px] text-slate-700 text-left z-30 tracking-wider pl-5 font-light flex justify-center items-center mt-8`}
          >
            ucapan
            <div
              className={`${theSecret.className} mt-16 text-[44px] font-normal text-line-stylishb leading-none`}
            >
              doa
            </div>
          </div>
          <div className="py-4 w-full px-4 flex flex-col items-center justify-start gap-2 max-h-96 overflow-y-auto overflow-x-hidden scrollbar-hide">
            {data.map((d, i) => (
              <div
                key={i}
                className={`${nyghtSerif.className} text-center p-4 w-full`}
              >
                <h2 className="text-slate-700 font-semibold text-sm">
                  {d.guest_name}
                </h2>
                <p className="text-slate-600 text-xs font-extralight italic">
                  {d.message}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="w-6 h-6 border border-slate-800 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-slate-800 text-md mb-2">⌄</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* footer rsvp */}
        <div className="py-3 w-full h-90 bg-[#7A2422] relative">
          <Image
            src={optimizeCloudinaryUrl(findImage(invitationData, "rsvp-footer"))}
            alt="rsvp image"
            fill
            className="object-cover object-center transition-all duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50 z-10 pointer-events-none" />

          <div
            className={`z-10 absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center`}
            data-aos="fade-up"
          >
            <span
              className={`text-white tracking-wide font-light italic text-sm ${nyghtSerif.className} leading-none`}
            >
              #EAternity
            </span>
            <span
              className={`text-white tracking-wide font-light italic text-sm ${nyghtSerif.className} leading-none`}
            >
              #happilyEverAfter
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVP;
