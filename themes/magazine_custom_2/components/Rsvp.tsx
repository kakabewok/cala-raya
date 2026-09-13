"use client";

import db from "@/configs/db-config";
import { remineFares } from "@/fonts/fonts";
import { useInvitation } from "@/hooks/use-invitation";
import badwords from "indonesian-badwords";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
          className={`${remineFares.className} text-4xl font-light tracking-wide text-neutral-800 mb-2`}
        >
          rsvp
        </h2>
        <div className="w-28 h-px bg-neutral-800 mb-8" />

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Name */}
          <div>
            <label
              className={`${remineFares.className} block text-base tracking-wide text-neutral-700 font-medium mb-2`}
            >
              nama
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
              className={`${remineFares.className} block text-base tracking-wide text-neutral-700 font-medium mb-2`}
            >
              ucapan
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Ucapan untuk pengantin"
              rows={4}
              className="text-xs w-full bg-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              required
            />
          </div>

          {/* Attending */}
          <div>
            <label
              className={`${remineFares.className} block text-base tracking-wide text-neutral-700 font-medium mb-2`}
            >
              konfirmasi kehadiran
            </label>
            <select
              name="attending"
              value={form.attending}
              onChange={handleChange}
              className="cursor-pointer text-xs text-neutral-700 w-full px-4 py-3 bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-neutral-400"
              required
            >
              <option value="">Pilih</option>
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
              <option value="3">Lebih dari 2 orang</option>
              <option value="0">Tidak Hadir</option>
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="cursor-pointer w-full bg-neutral-700 text-white py-2 text-xs tracking-wide hover:bg-neutral-800 transition"
          >
            Kirim
          </button>
        </form>
      </section>
      {/* RSVP message */}
      <section className="w-full py-10 px-6 bg-[#f9f4ec] text-neutral-700">
        <h2
          className={`${remineFares.className} z-10 text-4xl font-medium text-center mb-2 tracking-wide relative`}
        >
          <span>ucapan & doa</span>
          <span className="block border-b border-neutral-700 w-28 mx-auto mt-2"></span>
        </h2>

        <div className="mt-8 space-y-6 max-h-96 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-[#f1ebdd] px-6 py-4 rounded-sm text-xs text-center"
            >
              <p className="font-bold mb-3">{item.guest_name}</p>
              <p className="font-medium">{item.message}</p>
            </div>
          ))}
        </div>

        {/* Scroll-down icon */}
        <div className="flex justify-center mt-4">
          <div className="w-8 h-8 border border-neutral-400 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-neutral-500 text-xl">⌄</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RSVP;
