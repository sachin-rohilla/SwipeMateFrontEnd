import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import useConnectionRequest from "../hooks/useConnectionRequest";
import { FaInfoCircle } from "react-icons/fa";
import { FaHands } from "react-icons/fa6";
import Skeleton from "../components/Skeleton";

import TiltedCover from "../components/ui/TitledCover";

const Requests = () => {
  const { receivedRequests } = useAppContext();
  const { getReceivedRequestApi, acceptRejectRequestApi, isLoading } =
    useConnectionRequest();

  const handleAccepetRequest = (id: string) => {
    acceptRejectRequestApi("accepted", id);
  };
  const handleRejectRequest = (id: string) => {
    acceptRejectRequestApi("rejected", id);
  };

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

  if (!receivedRequests?.length) {
    return (
      <div className="min-h-screen max-w-6xl w-full font-modern mx-auto p-8 flex flex-col items-center justify-center">
        <p className="text-8xl">🤷‍♂️🤷‍♀️</p>
        <p className="text-lg font-semibold mt-4 text-center text-gray-500">
          No connection requests at the moment.
        </p>
        <p className="text-md mt-2 text-gray-500">
          It looks like you're all caught up! Check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-6xl w-full mx-auto p-8">
      <h1 className="font-modern font-smooth font-bold text-2xl text-center flex items-center gap-x-2 mx-auto w-fit">
        Requests <FaHands />
      </h1>
      <div className="divider"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {receivedRequests?.length > 0 &&
          receivedRequests.map((item) => (
            <div key={item?._id} className="w-full relative">
              <TiltedCover
                image={{
                  alt:
                    item?.fromUserId?.firstName +
                      " " +
                      item?.fromUserId?.lastName || "No Name",
                  src: item?.fromUserId?.profilePicUrl || "",
                }}
                direction={"left"}
                tiltCover={true}
                showButton={true}
                handleAccept={handleAccepetRequest}
                handleReject={handleRejectRequest}
                id={item?._id}
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold capitalize mb-2">
                    {item?.fromUserId?.firstName || ""}{" "}
                    {item?.fromUserId?.lastName || ""}
                  </h2>
                  <div className="text-gray-600 flex items-center space-x-2 mt-2">
                    <span role="img" aria-label="gender" className="text-lg">
                      🧑
                    </span>
                    <span className="font-semibold">Gender:</span>
                    <p className="text-sm ml-2">
                      {item?.fromUserId?.about || "N/A"}
                    </p>
                  </div>

                  <div className="text-gray-600 flex items-center space-x-2 mt-2">
                    <span role="img" aria-label="star" className="text-lg">
                      🌟
                    </span>
                    <span className="font-semibold">About:</span>
                    <p className="text-sm ml-2">
                      {item?.fromUserId?.gender || "N/A"}
                    </p>
                  </div>
                </div>
              </TiltedCover>

              {/* Button Container */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Requests;
