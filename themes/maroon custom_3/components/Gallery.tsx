import React, { useMemo } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { useInvitation } from "@/hooks/use-invitation";
import { amalfiCoast, ninfa, spectral } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";
import SwipeHandIcon from "./SwipeHandIcon";
import { optimizeCloudinaryUrl } from "@/utils/optimize-image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

type LayoutType = "single-up" | "single-down" | "double";

interface LayoutColumn {
  type: LayoutType;
  images: GalleryImage[];
}

const VerticalGallery = () => {
  const { invitationData: data } = useInvitation();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isGalleryOpen, setIsGalleryOpen] = React.useState<boolean>(true);
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

  const createLayout = (images: GalleryImage[]): LayoutColumn[] => {
    const columns: LayoutColumn[] = [];
    let imageIndex = 0;

    // fix layout pattern
    const layoutPattern: LayoutType[] = ["single-down", "double", "single-up"];
    let patternIndex = 0;

    while (imageIndex < images.length) {
      const layoutType = layoutPattern[patternIndex % layoutPattern.length];

      if (layoutType === "double" && imageIndex + 1 < images.length) {
        columns.push({
          type: "double",
          images: [images[imageIndex], images[imageIndex + 1]],
        });
        imageIndex += 2;
      } else {
        columns.push({
          type: layoutType === "double" ? "single-up" : layoutType,
          images: [images[imageIndex]],
        });
        imageIndex += 1;
      }
      patternIndex++;
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
    <div className="relative w-full h-screen bg-[#FFF9F5] overflow-hidden">
      {/* Door Effect Top */}
      <div
        className={`absolute top-0 left-0 w-full h-1/2 z-30 transition-transform duration-2000 ease-in-out ${isGalleryOpen ? "-translate-y-[60%]" : "translate-y-0"
          }`}
      >
        <div
          className={`-rotate-[15deg] absolute left-5 bottom-0 ${amalfiCoast.className} text-[75px] font-light text-primary-mono3 whitespace-nowrap drop-shadow-2xl`}
        >
          {data?.host_two_nickname.toLowerCase()}
        </div>
      </div>

      {/* Door Effect Bottom */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1/2 z-30 transition-transform duration-2000 ease-in-out ${isGalleryOpen ? "translate-y-[60%]" : "translate-y-0"
          }`}
      >
        <div
          className={`-rotate-[15deg] absolute right-5 top-0 ${amalfiCoast.className} text-[75px] font-light text-primary-mono3 whitespace-nowrap drop-shadow-2xl`}
        >
          {data?.host_one_nickname.toLowerCase()}
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        size="sm"
        onClick={toggleGallery}
        className={`${ninfa.className
          } hidden transition-all duration-800 ease-out cursor-pointer text-white absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40 px-4 py-4 items-center gap-2 font-light ${isGalleryOpen
            ? "bg-neutral-400 text-white rounded-lg border-none"
            : "bg-rose-900 rounded-none"
          }`}
      >
        {isGalleryOpen ? (
          <>
            <X size={20} />
          </>
        ) : (
          <span className="text-xs">BUKA GALLERY</span>
        )}
      </Button>

      {/* Gallery */}
      <div
        ref={scrollRef}
        className={`flex h-screen w-full overflow-y-hidden overflow-x-auto scrollbar-hide transition-all duration-300 ${isGalleryOpen
          ? "cursor-grab active:cursor-grabbing"
          : "cursor-default"
          }`}
      >
        <div
          className={`absolute top-[50%] right-3 -translate-y-1/2 z-10 h-14 w-14 transition-opacity duration-700 ${isGalleryOpen && !hasUserSwiped
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
            }`}
        >
          <SwipeHandIcon />
        </div>
        {layout.map((column, index) => {
          if (column.type === "first") {
            return (
              <div
                key={index}
                className="flex-shrink-0 h-screen px-[10px] max-w-screen basis-4/5 flex flex-col justify-center"
              >
                <div className="relative mb-16 aspect-[2/3]">
                  <div
                    className={`${ninfa.className
                      } absolute -top-28 -right-9 text-neutral-600 text-xl leading-[2.5rem] z-10 transition-opacity duration-700 font-medium
                    ${!isGalleryOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                      }`}
                  >
                    <div>{day}</div>
                    <div className={`${spectral.className} text-neutral-600 font-medium text-2xl`}>{month}</div>
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
            );
          }

          if (column.type === "last") {
            return (
              <div className="flex-shrink-0 w-screen h-screen" key={index}>
                <div className="flex flex-col w-full h-full items-center justify-center">
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
                        className={`${amalfiCoast.className} text-4xl font-medium text-white`}
                      >
                        {data?.host_two_nickname.toLocaleLowerCase()} <br /> &
                        {data?.host_one_nickname.toLocaleLowerCase()}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={index}>
              {column.type === "single-down" ? (
                <div
                  key={index}
                  className="flex-shrink-0 h-screen px-[10px] max-w-screen flex flex-col justify-end"
                >
                  <div className="relative mb-16 w-full h-[50vh] aspect-[2/3]">
                    <Image
                      src={optimizeCloudinaryUrl(column.images[0].src)}
                      alt={column.images[0].alt}
                      fill
                      className={`object-cover object-center transition-all duration-500 ${isGalleryOpen ? "grayscale-0" : "grayscale"
                        }`}
                    />
                  </div>
                </div>
              ) : column.type === "single-up" ? (
                <div
                  key={index}
                  className="flex-shrink-0 h-screen px-[10px] max-w-screen flex flex-col justify-center"
                >
                  <div className="relative mb-16 w-full h-[50vh] aspect-[2/3]">
                    <Image
                      src={optimizeCloudinaryUrl(column.images[0].src)}
                      alt={column.images[0].alt}
                      fill
                      className={`object-cover object-center transition-all duration-500 ${isGalleryOpen ? "grayscale-0" : "grayscale"
                        }`}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-shrink-0 w-screen h-screen flex flex-col justify-center items-center gap-[20px] px-[10px]">
                  {/* up */}
                  <div className="flex flex-col w-full h-[36vh] items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={optimizeCloudinaryUrl(column.images[0].src)}
                        alt={column.images[0].alt}
                        fill
                        className={`object-cover object-center transition-all duration-500 ${isGalleryOpen ? "grayscale-0" : "grayscale"
                          }`}
                      />
                    </div>
                  </div>
                  {/* down */}
                  <div className="flex flex-col w-full h-[36vh] items-center justify-center">
                    <div className="relative w-full h-full">
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

export default VerticalGallery;
