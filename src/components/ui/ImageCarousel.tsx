import React, { useState } from "react";
import { FaRegThumbsDown } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";

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
  handleInterest: (id: string) => void;
  handleIgnored: (id: string) => void;
}

export default function ImageCarousel({
  items: initialItems,
  handleInterest,
  handleIgnored,
}: IImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interaction, setInteraction] = useState<"none" | "liked" | "rejected">(
    "none"
  );

  const handleNext = () => {
    setInteraction("none");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % initialItems.length);
  };

  const handlePrev = () => {
    setInteraction("none");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + initialItems.length) % initialItems.length
    );
  };

  const handleLike = () => {
    setInteraction("liked");
    setTimeout(handleNext, 300);
    handleInterest(initialItems[currentIndex]?._id.toString());
  };

  const handleReject = () => {
    setInteraction("rejected");
    setTimeout(handleNext, 300);
    handleIgnored(initialItems[currentIndex]?._id.toString());
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
      {/* Left navigation */}
      <div
        onClick={handleReject}
        className={`navigation-item-left absolute left-0 top-[50%] z-20 flex h-10 w-10 translate-y-[-50%] cursor-pointer items-center justify-center rounded-lg bg-gray-400 bg-opacity-40 bg-clip-padding backdrop-blur-sm backdrop-filter ${
          interaction === "rejected" ? "animate-bounce" : ""
        }`}
      >
        <FaRegThumbsDown className="text-2xl text-primary" />
      </div>

      {/* Right navigation */}
      <div
        onClick={handleLike}
        className={`navigation-item-right absolute right-0 top-[50%] z-20 flex h-10 w-10 translate-y-[-50%] cursor-pointer items-center justify-center rounded-lg bg-gray-300 bg-opacity-40 bg-clip-padding backdrop-blur-sm backdrop-filter ${
          interaction === "liked" ? "animate-ping" : ""
        }`}
      >
        <GoHeartFill className="text-2xl text-primary" />
      </div>

      {/* Visible Profile Items */}
      {visibleItems?.map((item, index) => (
        <div
          key={item?._id}
          className={`absolute left-[50%] top-[15%] z-10 h-[450px] w-[300px] rounded-xl bg-gray-500 ${
            interaction === "liked"
              ? "animate-pulse opacity-50"
              : interaction === "rejected"
              ? "animate-shake opacity-50"
              : "animate-fadeIn"
          }`}
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
