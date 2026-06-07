import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { useInvitation } from "@/hooks/use-invitation";
import { nyghtSerif, theSecret } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";
import SwipeHandIcon from "./SwipeHandIcon";
import { motion } from "motion/react";
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

const HorizontalGallery = () => {
  const { invitationData: data } = useInvitation();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [hasUserSwiped, setHasUserSwiped] = useState<boolean>(false);

  const eventDate = new Date(data?.rundowns?.[0].date ?? "");
  const day = String(eventDate.getDate()).padStart(2, "0");
  const month = String(eventDate.getMonth() + 1).padStart(2, "0");
  const year = String(eventDate.getFullYear()).slice(-2);

  useEffect(() => {
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
    <div className="relative w-full h-screen bg-secondary-stylishb overflow-hidden">
      <motion.div
        initial={{ opacity: 1, display: "flex" }}
        animate={
          isGalleryOpen
            ? { opacity: 0, display: "none" }
            : { opacity: 1, display: "flex" }
        }
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-full h-full flex flex-col justify-between items-start z-20"
      >
        <motion.div
          className={`${nyghtSerif.className} text-[64px] text-neutral-400 text-left z-30 tracking-wider pl-5 font-light relative flex items-center mt-28`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 1 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        >
          {day}
          <span>.</span>
          {month}
          <span>.</span>
          {year}
          <div
            className={`${theSecret.className} flex flex-col absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 text-[64px] font-normal text-text-stylishb leading-none`}
          >
            <span>{data?.host_two_nickname}</span>
            <span className="translate-x-12">{data?.host_one_nickname}</span>
          </div>
        </motion.div>
        <div
          className={`z-40 grid grid-cols-3 w-full h-auto aspect-square gap-[10px] p-5 pb-20`}
        >
          {data?.images
            ?.filter((image) => image.type === "gallery")
            .slice(0, 5)
            .map((image, index) => (
              <Image
                src={optimizeCloudinaryUrl(image.url)}
                alt={`Gallery thumbnail ${index + 1}`}
                width={200}
                height={200}
                className="object-cover object-center aspect-square w-full h-auto"
                key={index}
              />
            ))}
          <div
            className={`cursor-pointer ${nyghtSerif.className} pointer-events-auto w-full h-full flex justify-center items-center relative aspect-square border border-line-stylishb text-line-stylishb font-medium font-nyght-serif rotate-[6deg] swing-left-fast`}
            onClick={toggleGallery}
          >
            <span>Buka Galeri</span>
          </div>
          {data?.images
            ?.filter((image) => image.type === "gallery")
            .slice(5, 8)
            .map((image, index) => (
              <Image
                src={optimizeCloudinaryUrl(image.url)}
                alt={`Gallery thumbnail ${index + 1}`}
                width={200}
                height={200}
                className="object-cover object-center aspect-square w-full h-auto"
                key={index}
              />
            ))}
        </div>
      </motion.div>

      {/* Toggle Button */}
      {isGalleryOpen && (
        <Button
          size="sm"
          onClick={toggleGallery}
          className={`cursor-pointer text-neutral-800 rounded-lg border border-neutral-800 bg-transparent absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40 px-4 py-3 flex items-center gap-2 font-medium`}
        >
          <X size={20} />
        </Button>
      )}

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isGalleryOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2.6, ease: "easeIn" }}
        ref={scrollRef}
        className={`
          flex h-screen w-full overflow-y-hidden overflow-x-auto scrollbar-hide ${isGalleryOpen
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
                  <Image
                    src={optimizeCloudinaryUrl(column.images[0].src)}
                    alt={column.images[0].alt}
                    fill
                    className={`object-cover object-center transition-all duration-500`}
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
                      className={`object-cover object-center transition-all duration-500`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/10`}
                    ></div>
                    <div
                      className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2`}
                    >
                      <h1
                        className={`${nyghtSerif.className} text-4xl font-medium text-white`}
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
                      className={`object-cover object-center transition-all duration-500`}
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
                      className={`object-cover object-center transition-all duration-500`}
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
                        className={`object-cover object-center transition-all duration-500`}
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
                        className={`object-cover object-center transition-all duration-500`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HorizontalGallery;
