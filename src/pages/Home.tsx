import { useEffect } from "react";
import ImageCarousel from "../components/ui/ImageCarousel";
import useFeeds from "../hooks/useFeeds";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import useConnectionRequest from "../hooks/useConnectionRequest";

const Home = () => {
  const { getFeedsApi, isLoading } = useFeeds();
  const { feedsData } = useAppContext();
  const { connectionRequestApi, isLoading: isLoadingRequest } =
    useConnectionRequest();

  const handleInterest = (id: string) => {
    connectionRequestApi("interested", id);
  };
  const handleIgnored = (id: string) => {
    connectionRequestApi("ignored", id);
  };
  useEffect(() => {
    getFeedsApi();
  }, []);
  if (isLoading) {
    return <Loader />;
  }

  if (!feedsData?.length) {
    return (
      <div className="max-w-3xl w-full mx-auto">
        <div className="flex flex-col items-center justify-center h-screen font-modern">
          <img
            src="./no.png"
            alt="No users available"
            className="w-40 h-40 object-cover"
          />
          <p className="text-lg font-semibold mt-4  text-center text-gray-500">
            It looks like you've connected with all available users for now.
          </p>
          <p className="text-md mt-2 text-gray-500">
            Check back later or explore other options.
          </p>
        </div>
      </div>
    );
  }

  console.log(feedsData);
  return (
    <div className="max-w-3xl w-full mx-auto">
      {feedsData?.length > 0 && (
        <ImageCarousel
          items={feedsData}
          handleInterest={handleInterest}
          handleIgnored={handleIgnored}
          isLoading={isLoadingRequest}
        />
      )}
    </div>
  );
};

export default Home;
