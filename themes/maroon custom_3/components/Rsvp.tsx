"use client";

import { ninfa, playfair, poppins } from "@/fonts/fonts";
import { useEffect, useState } from "react";
import badwords from "indonesian-badwords";
import db from "@/configs/db-config";
import toast from "react-hot-toast";
import { useInvitation } from "@/hooks/use-invitation";
import Image from "next/image";

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
    guest_name: guest?.name,
    message: "",
    attending: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { message, attending } = form;
    const cleanMessage = message ? badwords.censor(message) : "";

    const { error } = await db.from("rsvps").insert([
      {
        guest_name: guest?.name ?? "Guest",
        message: cleanMessage,
        attendance_status:
          attending === "1" || attending === "2" || attending === "3",
        total_guest: attending ?? 0,
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
      setForm({ guest_name: guest?.name, message: "", attending: "" });
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
    <div className="w-full bg-[#FFF9F5]">
      {/* form */}
      <section
        className={`${ninfa.className} bg-[#FFF9F5] px-6 py-10 w-full flex flex-col items-center`}
        data-aos="zoom-in"
      >
        <h2 className={`text-2xl font-light tracking-wide text-primary-mono3 mb-2`}>
          RSVP
        </h2>
        <div className="w-28 h-px bg-primary-mono3 mb-8" />

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div>
            <label
              className={`block text-xs tracking-wide text-primary-mono3 font-medium mb-2`}
            >
              NAME
            </label>
            <input
              type="text"
              name="guest_name"
              value={form.guest_name}
              onChange={handleChange}
              placeholder="Nama"
              className="text-primary-mono3 text-xs w-full bg-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              required
            />
          </div>
          {/* Message */}
          <div>
            <label
              className={`block text-xs tracking-wide text-primary-mono3 font-medium mb-2`}
            >
              WISHES
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Wishing you a lifetime of love"
              rows={4}
              className="text-primary-mono3 text-xs w-full bg-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              required
            />
          </div>

          {/* Attending */}
          <div>
            <label
              className={`block text-xs tracking-wide text-primary-mono3 font-medium mb-2`}
            >
              ATTENDANCE
            </label>
            <select
              name="attending"
              value={form.attending}
              onChange={handleChange}
              className="cursor-pointer text-xs text-primary-mono3 w-full px-4 py-3 bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-neutral-400"
              required
            >
              <option value="">Select</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="0">Cannot Attend</option>
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="cursor-pointer w-full bg-primary-mono3 text-white py-2 text-xs tracking-wide hover:bg-text-mono3 transition"
          >
            SEND
          </button>
        </form>
      </section>
      {/* RSVP message */}
      <section
        className={`relative w-full py-10 px-6 bg-[#FFF9F5] text-primary-mono3 overflow-x-hidden`}
      >
        <Image
          src={`/assets/images/floral/11.webp`}
          width={100}
          height={100}
          alt="Kiri"
          className="swing-right-fast absolute z-20 bottom-6 -right-8"
          data-aos="fade-left"
        />

        <Image
          data-aos="zoom-in"
          src={`/assets/images/floral/28.webp`}
          width={115}
          height={115}
          alt="Kanan"
          className="swing-left-slow absolute top-1/2 transform -translate-y-1/2 -left-14 rotate-[40deg]"
        />
        <h2
          className={`${ninfa.className} z-10 text-2xl font-light text-center mb-2 tracking-wide relative`}
        >
          <span>
            WISHES
          </span>
          <span className="block border-b border-primary-mono3 w-28 mx-auto mt-2"></span>
        </h2>

        <div className="mt-8 space-y-6 max-h-96 overflow-y-auto overflow-x-hidden scrollbar-hide p-1">
          {data.map((item, index) => (
            <div
              key={index}
              className={`${playfair.className} bg-primary-mono3/10 px-6 py-4 rounded-sm text-xs text-center backdrop-blur-xs`}
            >
              <p className="font-semibold mb-3 tracking-wide">
                {item.guest_name}
              </p>
              <p className="font-medium">{item.message}</p>
            </div>
          ))}
        </div>
        {/* Scroll-down icon */}
        <div className="flex justify-center mt-4">
          <div className="w-6 h-6 border border-primary-mono3 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-primary-mono3 text-lg mb-2">⌄</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RSVP;
