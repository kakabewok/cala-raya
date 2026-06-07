import { useInvitation } from "@/hooks/use-invitation";
import { findImage } from "@/utils/find-image";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";
import Image from "next/image";

export default function Greetings() {
  const { invitationData: data } = useInvitation();

  const formatEventDate = (dateString: string) => {
    if (!dateString) return null;

    const eventDate = new Date(dateString);
    const day = String(eventDate.getDate()).padStart(2, "0");
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const year = eventDate.getFullYear();

    return `${day} · ${month} · ${year}`;
  };

  return (
    <div className="pt-28 w-full bg-[#fdfaf6] flex flex-col items-center justify-between overflow-hidden">
      {/* Frame */}
      <div className="relative z-10">
        {/* Kanan atas */}
        <Image
          src={`/assets/images/floral/11.webp`}
          width={80}
          height={80}
          alt="Bunga kanan atas"
          className="swing-right-fast absolute z-20 -top-8 -right-6"
          data-aos="zoom-in"
        />

        {/* Kiri Atas */}
        <Image
          data-aos="zoom-in"
          src={`/assets/images/floral/28.webp`}
          width={80}
          height={80}
          alt="Bunga kiri atas"
          className="swing-left-fast absolute -top-14 -left-5"
        />

        {/* Kiri Tengah */}
        <Image
          data-aos="zoom-in"
          src={`/assets/images/floral/11.webp`}
          width={65}
          height={65}
          alt="Bunga kiri tengah"
          className="swing-left-fast absolute z-20 top-[40%] -left-7"
        />

        {/* Kanan tengah */}
        <Image
          data-aos="zoom-in"
          src={`/assets/images/floral/18.webp`}
          width={60}
          height={60}
          alt="Bunga kanan tengah"
          className="swing-left-fast absolute z-20 top-[40%] -right-6"
        />

        <div className="mb-20 border border-[#e6d6c9] p-1 text-center max-w-md bg-white/60 backdrop-blur-md relative z-10">
          <div className="border border-[#e6d6c9] p-16 text-center max-w-md bg-white/60 backdrop-blur-md relative z-10">
            <div
              data-aos="fade-up"
              className="flex items-center justify-center"
            >
              <Image
                src={optimizeCloudinaryUrl(findImage(data, "initial"))}
                alt="Initial"
                width={90}
                height={90}
                priority
                style={{ filter: "invert(3%) brightness(0.8)" }}
              />
            </div>
            <div className="max-w-[47vw]">
              <p
                className="text-xs text-[#c6a886] leading-relaxed font-light"
                data-aos="zoom-in"
                data-aos-duration={900}
              >
                One of His Signs is that He has created mates for you from your
                own kind, that you may find peace in them, and He has set
                between you love and mercy. Surely, there are Signs in this for
                those who reflect. <br />{" "}
                <span className="font-medium">(Ar-Rum - 21)</span>
              </p>
            </div>
            <p className="text-xs text-[#c6a886] leading-relaxed font-medium mt-3">
              {formatEventDate(data?.event_date ?? "")}
            </p>
          </div>
        </div>
      </div>
      {/* Bismillah */}
      <div className="relative z-10 w-full bg-green-300">
        {/* Kiri Bawah */}
        <Image
          data-aos="zoom-in"
          src={`/assets/images/floral/16.webp`}
          width={100}
          height={100}
          alt="Bunga kiri bawah"
          className="swing-left-fast absolute -z-10 bottom-[157px] left-[6vw]"
        />

        {/* Kanan Bawah */}
        <Image
          data-aos="zoom-in"
          src={`/assets/images/floral/28.webp`}
          width={90}
          height={90}
          alt="Bunga kanan bawah"
          className="swing-right-fast absolute bottom-36 -z-10 right-[6vw]"
        />
        <div className="py-7 z-20 w-full flex justify-center items-center bg-[#efe7dd]">
          <Image
            src="/assets/images/floral/bismillah.png"
            alt="Bismillah"
            width={180}
            height={180}
            data-aos="fade-up"
          />
        </div>
      </div>
    </div>
  );
}
