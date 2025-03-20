import { ReactNode } from "react";
import { cn } from "../../libs/utils";
import { MdCheck, MdClose } from "react-icons/md";

interface TiltedCoverProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "left" | "right";
  cover?: ReactNode;
  tiltCover?: boolean;
  children?: ReactNode;
  image?: React.ComponentPropsWithoutRef<"img">;
  showButton?: boolean;
  handleAccept?: any;
  handleReject?: any;
  id?: string;
}

export default function TiltedCover({
  children,
  direction = "left",
  tiltCover = true,
  cover,
  image,
  showButton,
  handleAccept,
  handleReject,
  id,
}: TiltedCoverProps) {
  const tiltLeft = direction === "left";
  const factor = tiltLeft ? 1 : -1;

  return (
    <div className="flex w-96 h-96 sm:h-96 sm:w-96 items-center justify-center overflow-hidden">
      <div className="group relative h-80 w-64 sm:w-64">
        {/* Background content */}
        <div
          className="border-box border-1 relative h-full w-full overflow-hidden rounded-xl border bg-background transition-all duration-500 ease-slow group-hover:!transform-none border-neutral"
          style={{
            transform: `perspective(400px) rotateY(${
              factor * 20
            }deg) scale(0.85) translateX(${-factor * 20}%)`,
          }}
        >
          {children}

          {/* Buttons Container */}
          {showButton && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex justify-center w-3/4 px-4 space-x-4">
              <button onClick={() => handleAccept(id)} className="btn">
                <MdCheck size={20} />
                Accept
              </button>

              <button onClick={() => handleReject(id)} className="btn">
                <MdClose size={20} />
                Reject
              </button>
            </div>
          )}
          <div className="absolute inset-0 h-full w-full bg-gray-400/10 transition-all group-hover:bg-transparent" />
        </div>

        {/* Cover Content */}
        <div
          className={cn(
            "border-base-300 pointer-events-none absolute inset-0 h-full w-full rounded-xl border-[6px] bg-white transition-all delay-75 duration-500 ease-slow group-hover:!transform-none group-hover:opacity-0 dark:bg-gray-800",
            {
              "group-hover:left-[200%]": tiltLeft,
              "group-hover:-left-[200%]": !tiltLeft,
            }
          )}
          style={{
            transform: tiltCover
              ? `perspective(400px) rotateY(${factor * 20}deg)`
              : undefined,
          }}
        >
          <div className="h-full w-full rounded-md object-cover">
            {image ? (
              <img
                alt={image?.alt || ""}
                {...image}
                className={cn(
                  "h-full w-full rounded-md object-cover",
                  image?.className
                )}
              />
            ) : (
              cover
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
