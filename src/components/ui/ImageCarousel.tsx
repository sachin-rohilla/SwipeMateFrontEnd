import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ICarouselItem {
  _id: number;
  firstName?: string;
  age?: number;
  location?: string;
  gender?: string;
  profilePicUrl: string;
}

interface IImageCarouselProps {
  items: ICarouselItem[];
}

export default function ImageCarousel({
  items: initialItems,
}: IImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % initialItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + initialItems.length) % initialItems.length
    );
  };

  const totalItems = initialItems.length;
  const visibleItemsCount = totalItems < 3 ? totalItems : 3;

  const visibleIndices = [];
  for (let i = 0; i < visibleItemsCount; i++) {
    visibleIndices.push((currentIndex + i) % totalItems);
  }

  const visibleItems = visibleIndices.map((index) => initialItems[index]);

  return (
    <div className="carousel-container relative h-[calc(100vh-70px)] w-full overflow-hidden rounded-2xl border-2 border-gray-200 bg-neutral-content p-2">
      <div
        onClick={handlePrev}
        className="navigation-item-left absolute left-0 top-[50%] z-20 flex h-10 w-10 translate-y-[-50%] cursor-pointer items-center justify-center rounded-lg bg-gray-400 bg-opacity-40 bg-clip-padding backdrop-blur-sm backdrop-filter"
      >
        <ChevronLeft className="text-gray-800" />
      </div>
      <div
        onClick={handleNext}
        className="navigation-item-right absolute right-0 top-[50%] z-20 flex h-10 w-10 translate-y-[-50%] cursor-pointer items-center justify-center rounded-lg bg-gray-300 bg-opacity-40 bg-clip-padding backdrop-blur-sm backdrop-filter"
      >
        <ChevronRight className="text-gray-800" />
      </div>
      {visibleItems?.map((item, index) => (
        <div
          key={item?._id}
          className="absolute left-[50%] top-[15%] z-10 h-[450px] w-[300px] animate-fadeIn rounded-xl bg-gray-500"
          style={{
            backgroundImage: `url(${item?.profilePicUrl})`,
            backgroundSize: "cover",
            transform:
              index === 1
                ? "translateX(-50%) scale(1.1)"
                : index === 0
                ? totalItems === 1
                  ? "translateX(-50%) scale(1)"
                  : "translateX(-150%) rotate(-20deg)"
                : "translateX(50%) rotate(20deg)",
            transition: "transform 0.5s ease, filter 0.5s ease",
            filter: index === 1 || totalItems === 1 ? "none" : "blur(4px)",
            zIndex: index === 1 || totalItems === 1 ? 3 : 1,
          }}
        >
          <div className="absolute bottom-0 left-0 p-4 w-full bg-black/50 rounded-b-xl text-white font-modern capitalize">
            <h1 className="text-xl font-bold">{item?.firstName}</h1>
            <p className="text-sm">{item?.age} years old</p>
            <p className="text-sm">{item?.location}</p>
            <p className="text-sm">{item?.gender}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
