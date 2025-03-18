import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import useConnectionRequest from "../hooks/useConnectionRequest";
import { FaInfoCircle } from "react-icons/fa";
import TiltedCover from "../components/ui/TitledCover";
import Skeleton from "../components/Skeleton";

const Requests = () => {
  const { receivedRequests } = useAppContext();
  const { getReceivedRequestApi, isLoading } = useConnectionRequest();

  useEffect(() => {
    getReceivedRequestApi();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen max-w-6xl w-full mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <Skeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-6xl w-full mx-auto p-8">
      <h1 className="font-modern font-bold text-2xl text-center">Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {receivedRequests?.length > 0 &&
          receivedRequests.map((item, index) => (
            <div key={item.id} className="w-full ">
              <TiltedCover
                image={{
                  alt: item?.firstName + " " + item?.lastName || "No Name",
                  src: item?.profilePicUrl || "",
                }}
                direction={"left"}
                tiltCover={true}
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold capitalize mb-2">
                    {item?.firstName || ""} {item?.lastName || ""}
                  </h2>
                  <div className="text-gray-600 flex items-center mt-2">
                    <FaInfoCircle className="mr-2 text-lg" />
                    <p className="text-sm">
                      {item?.about || "No about information available."}
                    </p>
                  </div>
                  <div className="text-gray-600 flex items-center mt-2">
                    <FaInfoCircle className="mr-2 text-lg" />
                    <p className="text-sm">{item?.gender || "Not specified"}</p>
                  </div>
                </div>
              </TiltedCover>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Requests;
