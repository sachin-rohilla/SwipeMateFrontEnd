import { ImageUp, LoaderCircle } from "lucide-react";
import { UploadImageProps } from "../types/types";

const UploadImageComp = ({
  handleUpload,
  imageUrl,
  isLoading,
}: UploadImageProps) => {
  return (
    <div>
      {" "}
      {!imageUrl && (
        <button
          onClick={handleUpload}
          className="   h-40  w-full flex items-center justify-center border border-dashed  border-base-300 
    "
        >
          {!imageUrl && !isLoading && (
            <div className="flex flex-col items-center gap-y-4">
              <ImageUp strokeWidth={0.75} size={50} />
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 dark:after:bg-white after:bg-neutral-800 font-poppins after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">
                Click to upload image
              </span>
              <span className="-mt-1 font-poppins text-xs">JPG, JPEG, PNG</span>
              <span className="text-error text-xs  -mt-3">
                Note : Image size should be less than 5 MB
              </span>
            </div>
          )}

          {isLoading && !imageUrl && (
            <div className="flex items-center justify-center">
              <LoaderCircle className="animate-spin" size={35} />
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default UploadImageComp;
