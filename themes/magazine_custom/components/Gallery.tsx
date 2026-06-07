import React, { useMemo } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { useInvitation } from "@/hooks/use-invitation";
import { remineFares } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";
import SwipeHandIcon from "./SwipeHandIcon";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const HorizontalGallery = () => {
  const { invitationData: data } = useInvitation();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isGalleryOpen, setIsGalleryOpen] = React.useState<boolean>(false);
  const [hasUserSwiped, setHasUserSwiped] = React.useState<boolean>(false);

  const eventDate = new Date(data?.event_date ?? "");
  const day = String(eventDate.getDate()).padStart(2, "0");
  const month = String(eventDate.getMonth() + 1).padStart(2, "0");
  const year = String(eventDate.getFullYear()).slice(-2);

  React.useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    const handleScroll = () => {
      if (!hasUserSwiped && isGalleryOpen) {
        setHasUserSwiped(true);
      }
    };

    ref.addEventListener("scroll", handleScroll);
    return () => ref.removeEventListener("scroll", handleScroll);
  }, [hasUserSwiped, isGalleryOpen]);

  const images = useMemo(() => {
    const filtered = data?.images?.filter((image) => image.type === "gallery");
    const sorted = filtered?.sort((a, b) => a.order_number - b.order_number);

    return sorted?.map((image, index) => ({
      id: image.id,
      src: image.url,
      alt: `Gallery image ${index + 1}`,
    }));
  }, [data?.images]);

  const toggleGallery = () => {
    setTimeout(() => {
      const newState = !isGalleryOpen;
      setIsGalleryOpen(newState);

      if (newState) {
        setHasUserSwiped(false);
      }
    }, 100);
  };

  const createLayout = (images: GalleryImage[]) => {
    const columns = [];
    let imageIndex = 0;

    while (imageIndex < images.length) {
      const isDoubleColumn =
        Math.random() > 0.3 && imageIndex + 1 < images.length;

      if (isDoubleColumn) {
        columns.push({
          type: "double",
          images: [images[imageIndex], images[imageIndex + 1]],
        });
        imageIndex += 2;
      } else {
        columns.push({
          type: "single",
          images: [images[imageIndex]],
        });
        imageIndex += 1;
      }
    }

    return columns;
  };

  const layout = useMemo(() => {
    if (!images || images.length < 2) return [];

    const firstImage = images[0];
    const lastImage = images[images.length - 1];
    const middleImages = images.slice(1, images.length - 1);
    const middleLayout = createLayout(middleImages);

    return [
      { type: "first", images: [firstImage] },
      ...middleLayout,
      { type: "last", images: [lastImage] },
    ];
  }, [images]);

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* left */}
      <div
        className={`flex justify-center items-center absolute top-0 left-0 w-1/2 h-full z-30 transition-transform duration-1000 ease-in-out ${isGalleryOpen ? "-translate-x-full" : "translate-x-0"
          }`}
      >
        <p
          className={`-ml-[25vw] md:-ml-[8vw] ${remineFares.className} text-[11rem] font-light text-neutral-700 transform -rotate-90 whitespace-nowrap drop-shadow-2xl`}
        >
          {data?.host_one_nickname.toLowerCase()}
        </p>
      </div>
      {/* right */}
      <div
        className={`flex justify-center items-center absolute top-0 right-0 w-1/2 h-full z-30 transition-transform duration-1000 ease-in-out ${isGalleryOpen ? "translate-x-full" : "translate-x-0"
          }`}
      >
        <p
          className={`-mr-[26vw] md:-mr-[9vw] ${remineFares.className} text-[11rem] font-light text-neutral-700 transform -rotate-90 whitespace-nowrap drop-shadow-2xl`}
        >
          {data?.host_two_nickname.toLowerCase()}
        </p>
      </div>

      {/* Toggle Button */}
      <Button
        size="sm"
        onClick={toggleGallery}
        className={`cursor-pointer text-neutral-700 border rounded-none border-neutral-700 bg-transparent absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40 px-4 py-3 flex items-center gap-2 font-medium ${isGalleryOpen
          ? "bg-neutral-300 hover:bg-neutral-300 text-neutral-800 rounded-lg border-none"
          : "hover:bg-transparent"
          }`}
      >
        {isGalleryOpen ? (
          <>
            <X size={20} />
          </>
        ) : (
          <span className="text-xs">Open Gallery</span>
        )}
      </Button>

      {/* Gallery */}
      <div
        ref={scrollRef}
        className={`flex h-screen w-screen overflow-x-auto scrollbar-hide transition-all duration-300 ${isGalleryOpen
          ? "cursor-grab active:cursor-grabbing"
          : "cursor-default"
          }`}
      >
        {layout.map((column, index) => {
          if (column.type === "first") {
            return (
              <div key={index} className="flex-shrink-0">
                <div className="h-screen w-screen md:max-w-md flex items-center justify-center ">
                  <div
                    className={`
                        absolute top-1/2 left-1/2 h-[1px] bg-neutral-700 z-10 rounded-full
                        transition-all duration-700 ease-in-out
                        ${isGalleryOpen
                        ? "w-0 opacity-0 scale-x-0"
                        : "w-40 opacity-100 scale-x-100"
                      }
                    `}
                    style={{
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  <div
                    className={`absolute top-[50%] right-3 -translate-y-1/2 z-10 h-14 w-14 transition-opacity duration-700 ${isGalleryOpen && !hasUserSwiped
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                      }`}
                  >
                    <SwipeHandIcon />
                  </div>
                  <div className="relative h-56 w-56 group ">
                    <div
                      className={`${remineFares.className
                        } absolute -top-24 -right-5 text-neutral-600 text-3xl leading-[2.5rem] font-semibold z-10 transition-opacity duration-700
                        ${isGalleryOpen
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                        }`}
                    >
                      <div>{day}</div>
                      <div>{month}</div>
                      <div>{year}</div>
                    </div>
                    <Image
                      src={optimizeCloudinaryUrl(column.images[0].src)}
                      alt={column.images[0].alt}
                      fill
                      className={`object-cover object-center transition-all duration-500 ${isGalleryOpen ? "grayscale-0" : "grayscale"
                        }`}
                    />
                  </div>
                </div>
              </div>
            );
          }

          if (column.type === "last") {
            return (
              <div className="flex-shrink-0 w-screen h-screen" key={index}>
                {/* 1 */}
                <div className="flex flex-col w-full md:max-w-md h-full items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={optimizeCloudinaryUrl(column.images[0].src)}
                      alt={column.images[0].alt}
                      fill
                      className={`object-cover object-center transition-all duration-500 ${isGalleryOpen ? "grayscale-0" : "grayscale"
                        }`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/10`}
                    ></div>
                    <div
                      className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2`}
                    >
                      <h1
                        className={`${remineFares.className} text-4xl font-medium text-white`}
                      >
                        {data?.host_one_nickname.toLocaleLowerCase()} <br /> &{" "}
                        {data?.host_two_nickname.toLocaleLowerCase()}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="flex-shrink-0">
              {column.type === "single" ? (
                <div className="flex-shrink-0 w-screen md:max-w-md h-screen">
                  {/* 1 */}
                  <div className="flex flex-col w-full md:max-w-md h-full p-6 items-center justify-center">
                    <div className="relative w-full md:max-w-md h-full">
                      <Image
                        src={optimizeCloudinaryUrl(column.images[0].src)}
                        alt={column.images[0].alt}
                        fill
                        className={`object-cover object-center transition-all duration-500 ${isGalleryOpen ? "grayscale-0" : "grayscale"
                          }`}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-shrink-0 w-screen md:max-w-md h-screen flex flex-col">
                  {/* 1 */}
                  <div className="flex flex-col w-full md:max-w-md h-full p-12 items-center justify-center">
                    <div className="relative md:max-w-md w-full h-full">
                      <Image
                        src={optimizeCloudinaryUrl(column.images[0].src)}
                        alt={column.images[0].alt}
                        fill
                        className={`object-cover object-center transition-all duration-500 ${isGalleryOpen ? "grayscale-0" : "grayscale"
                          }`}
                      />
                    </div>
                  </div>
                  {/* 2 */}
                  <div className="flex flex-col w-full md:max-w-md h-full items-center justify-center">
                    <div className="relative md:max-w-md w-full h-full">
                      <Image
                        src={optimizeCloudinaryUrl(column.images[1].src)}
                        alt={column.images[1].alt}
                        fill
                        className={`object-cover object-center transition-all duration-500 ${isGalleryOpen ? "grayscale-0" : "grayscale"
                          }`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalGallery;

// <div
//   className={`absolute top-0 left-0 w-1/2 h-full z-30 transition-transform duration-1000 ease-in-out ${
//     isGalleryOpen ? "-translate-x-full" : "translate-x-0"
//   }`}
// >
//   <div
//     className={`absolute -left-[250px] top-1/2 -translate-y-1/2 ${remineFares.className} text-[11rem] font-light text-neutral-700 transform -rotate-90 whitespace-nowrap drop-shadow-2xl`}
//   >
//     {data?.host_one_nickname.toLowerCase()}
//   </div>
// </div>
// <div
//   className={`absolute top-0 right-0 w-1/2 h-full z-30 transition-transform duration-1000 ease-in-out ${
//     isGalleryOpen ? "translate-x-full" : "translate-x-0"
//   }`}
// >
//   <div
//     className={`absolute -right-[190px] top-1/2 -translate-y-1/2 ${remineFares.className} text-[11rem] font-light text-neutral-700 transform -rotate-90 whitespace-nowrap drop-shadow-2xl`}
//   >
//     {data?.host_two_nickname.toLowerCase()}
//   </div>
// </div>
