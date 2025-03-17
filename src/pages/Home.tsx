import { useEffect } from "react";
import ImageCarousel from "../components/ui/ImageCarousel";
import useFeeds from "../hooks/useFeeds";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import useConnectionRequest from "../hooks/useConnectionRequest";

const Home = () => {
  const { getFeedsApi, isLoading } = useFeeds();
  const { feedsData } = useAppContext();
  const { connectionRequestApi } = useConnectionRequest();

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
  console.log(feedsData);
  return (
    <div className="max-w-3xl w-full mx-auto">
      <ImageCarousel
        items={feedsData}
        handleInterest={handleInterest}
        handleIgnored={handleIgnored}
      />
    </div>
  );
};

export default Home;
