import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import useConnectionRequest from "../hooks/useConnectionRequest";
import { FaHandshake, FaInfoCircle } from "react-icons/fa";
import TiltedCover from "../components/ui/TitledCover";
import Skeleton from "../components/Skeleton";

const Connections = () => {
  const { connections } = useAppContext();
  const { getAcceptedRequestApi, isLoading } = useConnectionRequest();

  useEffect(() => {
    getAcceptedRequestApi();
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

  if (!connections?.length) {
    return (
      <div className="min-h-screen max-w-6xl font-modern w-full mx-auto p-8 flex flex-col items-center justify-center">
        <p className="text-8xl">🤷‍♂️🤷‍♀️</p>
        <p className="text-lg font-semibold mt-4  text-center text-gray-500">
          No connections at the moment.
        </p>
        <p className="text-md mt-2 text-gray-500">
          It looks like you're all caught up! Check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-6xl w-full mx-auto p-8">
      <h1 className="font-smooth font-bold mx-auto text-2xl text-center w-fit flex items-center gap-x-2">
        Connections <FaHandshake size={30} />
      </h1>
      <div className="divider"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {connections?.length > 0 &&
          connections.map((item) => (
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

export default Connections;
