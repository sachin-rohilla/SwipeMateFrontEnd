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
    <div
      className=" w-full mx-auto"
      // style={{
      //   backgroundImage:
      //     'url("https://img.freepik.com/free-vector/hand-drawn-women-s-day-background_23-2151251162.jpg?t=st=1742452495~exp=1742456095~hmac=a3506f960446457517f3c7425c2cb5a7c575a5ec6433f6d3d531f828c043e240&w=996")', // Path to your background image
      //   backgroundSize: "cover", // Ensures the image covers the entire div
      //   backgroundPosition: "center", // Centers the image
      // }}
    >
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
