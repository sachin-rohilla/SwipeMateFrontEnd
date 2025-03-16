import { useEffect } from "react";
import ImageCarousel from "../components/ui/ImageCarousel";
import useFeeds from "../hooks/useFeeds";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { getFeedsApi, isLoading } = useFeeds();
  const { feedsData } = useAppContext();
  useEffect(() => {
    getFeedsApi();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  console.log(feedsData);
  return (
    <div className="max-w-3xl w-full mx-auto">
      <ImageCarousel items={feedsData} />
    </div>
  );
};

export default Home;
