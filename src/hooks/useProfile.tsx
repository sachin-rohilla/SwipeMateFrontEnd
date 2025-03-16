import { useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../constants/constants";
import { useAppContext } from "../context/AppContext";

const useProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserData } = useAppContext();

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/get-profile`, {
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
      setUserData(data?.data);
      console.log(data?.data);
    } catch (error: any) {
      console.log("Profile error:", error?.message || "Something went wrong");
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return { getProfile, isLoading };
};

export default useProfile;
