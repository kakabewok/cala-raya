"use client";

import { commuters, lagunac, poppins } from "@/fonts/fonts";
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
    guest: guest?.name || "",
    message: "",
    attending: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >
  ) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { guest, message, attending } = form;
    const cleanMessage = message ? badwords.censor(message) : "";

    const { error } = await db.from("rsvps").insert([
      {
        guest_name: guest,
        message: cleanMessage,
        attendance_status: attending != "0",
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
      setForm({ guest: "", message: "", attending: "" });
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
    <div className="w-full" data-aos="zoom-in">
      {/* form */}
      <section className="bg-[#f8f3ea] px-6 py-10 w-full flex flex-col items-center">
        <h2
          className={`${lagunac.className} text-4xl font-light tracking-wide text-neutral-600 mb-2`}
        >
          RSVP
        </h2>
        <div className="w-28 h-px bg-neutral-800 mb-8" />

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Name */}
          <div>
            <label
              className={`${commuters.className} block text-xs tracking-wide text-neutral-700 font-medium mb-2`}
            >
              NAME
            </label>
            <input
              name="guest"
              value={form.guest}
              onChange={handleChange}
              placeholder="Your name"
              className="text-xs w-full bg-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label
              className={`${commuters.className} block text-xs tracking-wide text-neutral-700 font-medium mb-2`}
            >
              WISHES
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Wedding Wishes"
              rows={4}
              className="text-xs w-full bg-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              required
            />
          </div>

          {/* Attending */}
          <div>
            <label
              className={`${commuters.className} block text-xs tracking-wide text-neutral-700 font-medium mb-2`}
            >
              ATTENDANCE
            </label>
            <select
              name="attending"
              value={form.attending}
              onChange={handleChange}
              className="cursor-pointer text-xs text-neutral-700 w-full px-4 py-3 bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-neutral-400"
              required
            >
              <option value="">Choose</option>
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons</option>
              <option value="5">5 Persons</option>
              <option value="6">6 Persons</option>
              <option value="7">7 Persons</option>
              <option value="8">8 Persons</option>
              <option value="9">9 Persons</option>
              <option value="10">10 Persons</option>
              <option value="0">I wont{`'`}t be able to attend</option>
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`${commuters.className} cursor-pointer w-full bg-neutral-700 text-white py-2 text-xs tracking-wide hover:bg-neutral-800 transition`}
          >
            SUBMIT
          </button>
        </form>
      </section>
      {/* RSVP message */}
      <section className="relative w-full py-10 px-6 bg-[#f9f4ec] text-neutral-700 overflow-x-hidden">
        <Image
          src={optimizeCloudinaryUrl(findImage(invitationData, "initial"))}
          width={140}
          height={140}
          alt="Kiri"
          className="absolute bottom-6 -right-14 -rotate-[30deg] brightness-80"
        />

        <Image
          src={optimizeCloudinaryUrl(findImage(invitationData, "initial"))}
          width={125}
          height={125}
          alt="Kanan"
          className="absolute top-1/2 transform -translate-y-1/2 -left-14 rotate-[30deg] brightness-80"
        />
        <h2
          className={`${lagunac.className} z-10 text-2xl font-medium text-center mb-2 tracking-wide relative`}
        >
          <span>WISHES</span>
          <span className="block border-b border-neutral-700 w-28 mx-auto mt-2"></span>
        </h2>

        <div className="mt-8 space-y-6 max-h-96 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {data.map((item, index) => (
            <div
              key={index}
              className={`bg-slate-200/30 px-6 py-4 rounded-sm text-xs text-center backdrop-blur-xs`}
            >
              <p className={`${commuters.className} font-bold mb-3`}>
                {item.guest_name}
              </p>
              <p className={`${poppins.className} font-medium`}>
                {item.message}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll-down icon */}
        <div className="flex justify-center mt-4">
          <div className="w-6 h-6 border border-neutral-400 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-neutral-500 text-lg mb-2">⌄</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RSVP;
