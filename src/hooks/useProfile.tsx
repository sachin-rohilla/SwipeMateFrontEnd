import { useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../constants/constants";

const useProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/profile`, {
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
      console.log("profile data:", data?.data);
    } catch (error: any) {
      console.log("Profile error:", error?.message || "Something went wrong");
      toast.error(error?.message || "Something went wrong");
    }
  };
  return { getProfile, isLoading };
};

export default useProfile;
