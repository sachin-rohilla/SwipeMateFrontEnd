import { useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../constants/constants";
import { useAppContext } from "../context/AppContext";

const useFeeds = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setFeedsData } = useAppContext();
  const getFeedsApi = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/feeds`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        const errorMessage =
          data?.message || response.statusText || "An unknown error occurred.";
        throw new Error(` ${errorMessage}`);
      }
      setFeedsData(data?.data);
    } catch (error: any) {
      console.log("Error in getFeedsApi", error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    getFeedsApi,
    isLoading,
  };
};
export default useFeeds;
