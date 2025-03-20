import React, { useState, useEffect } from "react";
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
  fetchNextItems: () => Promise<ICarouselItem[]>;
  isLoading: boolean;
}

export default function ImageCarousel({
  items: initialItems,
  handleInterest,
  handleIgnored,
  isLoading,
}: IImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interaction, setInteraction] = useState<"none" | "liked" | "rejected">(
    "none"
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = async () => {
    setInteraction("none");
  };

  const handleLike = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setInteraction("liked");

    setTimeout(() => {
      handleInterest(initialItems[currentIndex]?._id.toString());
      handleNext();
      setIsAnimating(false);
    }, 300);
  };

  const handleReject = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setInteraction("rejected");

    setTimeout(() => {
      handleIgnored(initialItems[currentIndex]?._id.toString());
      handleNext();
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (initialItems.length > 0) {
      setCurrentIndex(0);
    }
  }, [initialItems]);

  const visibleItem = initialItems[currentIndex];

  return (
    <div className="carousel-container mx-auto relative mt-6  h-[calc(100vh-90px)] w-full max-w-md overflow-hidden rounded-2xl  p-2">
      {/* Left navigation (Reject button) */}
      <button
        onClick={handleReject}
        disabled={isLoading}
        className={`navigation-item-left absolute left-0 top-[50%] z-20 flex h-10 w-10 translate-y-[-50%] cursor-pointer items-center justify-center rounded-lg bg-gray-400 bg-opacity-40 bg-clip-padding backdrop-blur-sm backdrop-filter ${
          interaction === "rejected" ? "animate-bounce" : ""
        }`}
      >
        <FaRegThumbsDown className="text-2xl text-warning" />
      </button>

      {/* Right navigation (Like button) */}
      <button
        onClick={handleLike}
        disabled={isLoading}
        className={`navigation-item-right  absolute right-0 top-[50%] z-20 flex h-10 w-10 translate-y-[-50%] cursor-pointer items-center justify-center rounded-lg bg-gray-300 bg-opacity-40 bg-clip-padding backdrop-blur-sm backdrop-filter ${
          interaction === "liked" ? "animate-ping" : ""
        }`}
      >
        <GoHeartFill className="text-2xl text-red-500" />
      </button>

      {/* Visible Profile Item */}
      {visibleItem && (
        <div
          key={visibleItem?._id}
          className={`absolute left-[50%] top-[0%] z-10 h-[500px] w-[350px] rounded-xl bg-gray-500 transition-all duration-300 ease-in-out`}
          style={{
            backgroundImage: `url(${visibleItem?.profilePicUrl})`,
            backgroundSize: "cover",
            transform:
              interaction === "liked"
                ? "translateX(60%) rotate(20deg)"
                : interaction === "rejected"
                ? "translateX(-150%) rotate(-20deg)"
                : "translateX(-50%)",
            opacity: interaction === "none" ? 1 : 0.5,
            filter: isLoading ? "blur(8px)" : "none",
            zIndex: 3,
          }}
        >
          {isLoading && (
            <div className="absolute  bg-black/5 backdrop-blur-sm flex items-center justify-center"></div>
          )}

          <div className="absolute bottom-0 left-0 p-4 w-full bg-black/50 rounded-b-xl text-white font-modern capitalize">
            <h1 className="text-xl font-bold">{visibleItem?.firstName}</h1>
            <p className="text-sm">{visibleItem?.age} years old</p>
            <p className="text-sm">{visibleItem?.location}</p>
            <p className="text-sm">{visibleItem?.gender}</p>
          </div>
        </div>
      )}
    </div>
  );
}
