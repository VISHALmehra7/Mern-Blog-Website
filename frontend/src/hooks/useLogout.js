import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setloading] = useState(false);
  const logout = async () => {
    try {
      setloading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      setAuthUser(null);
      localStorage.removeItem("loggedInUser");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
