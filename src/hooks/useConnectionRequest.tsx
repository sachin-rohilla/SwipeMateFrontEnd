import { useState } from "react";
import { API_URL } from "../constants/constants";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const useConnectionRequest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setFeedsData, feedsData } = useAppContext();

  const connectionRequestApi = async (status: string, id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_URL}/api/send/request/${status}/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        const errorMessage =
          data?.message || response.statusText || "An unknown error occurred.";
        throw new Error(` ${errorMessage}`);
      }
      const filterData = feedsData?.filter(
        (item: any) => item?._id !== data?.data?.toUserId
      );
      setFeedsData(filterData);
    } catch (error: any) {
      console.log(
        "Connection request error:",
        error?.message || "Something went wrong"
      );
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return { connectionRequestApi, isLoading };
};
export default useConnectionRequest;
