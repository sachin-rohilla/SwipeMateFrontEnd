import { useState } from "react";
import { API_URL } from "../constants/constants";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import useProfile from "./useProfile";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserData } = useAppContext();
  const { getProfile } = useProfile();

  const navigate = useNavigate();
  const loginApi = async (payload: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data?.message || response.statusText || "An unknown error occurred.";
        throw new Error(` ${errorMessage}`);
      }
      toast.success(data?.message || "Login Successfully");
      setUserData(data?.data);
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error.message || "Something went wrong");
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const signUpApi = async (payload: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data?.message || response.statusText || "An unknown error occurred.";
        throw new Error(` ${errorMessage}`);
      }
      toast.success(data?.message || " Sign Up Successfully");
      // navigate("/login");
      getProfile();
    } catch (error: any) {
      console.log("SignUp error:", error.message || "Something went wrong");
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const logOutApi = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        const errorMessage =
          data?.message || response.statusText || "An unknown error occurred.";
        throw new Error(` ${errorMessage}`);
      }
      toast.success(data?.message || "Log Out Successfully");
      setUserData(null);
      navigate("/login");
    } catch (error: any) {
      console.log("LogOut error:", error.message || "Something went wrong");
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { loginApi, signUpApi, logOutApi, isLoading };
};

export default useAuth;
