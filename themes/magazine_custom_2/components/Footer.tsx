import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const CONTACT_PERSON = process.env.NEXT_PUBLIC_CONTACT_PERSON!;

export default function Footer() {
  const message = `Halo admin Calaraya Project, aku tertarik untuk bikin undangan digital. Boleh dibantu prosesnya?`;
  return (
    <footer className="w-full bg-neutral-700 text-white p-5 flex justify-between items-start z-50">
      <div className="flex items-center gap-3">
        <Link
          href="https://instagram.com/calarayaproject"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-xl" />
        </Link>
        <Link
          href={`https://wa.me/${CONTACT_PERSON}?text=${encodeURIComponent(
            message
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-xl" />
        </Link>
      </div>

      <div className="flex items-start gap-5">
        <span className="text-neutral-300 font-medium text-sm">crafted by</span>
        <Link
          href="https://instagram.com/calarayaproject"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-serif text-md leading-normal"
        >
          <span>Calaraya</span>
          <br />
          <span>Project</span>
        </Link>
      </div>
    </footer>
  );
}
