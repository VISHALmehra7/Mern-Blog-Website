import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setloading] = useState(false);

  const login = async ({ userName, password }) => {
    const success = handleUserInputs({ userName, password });
    if (!success) return;

    try {
      setloading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }
      toast.success("Logged in successfully");
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      setAuthUser(data);
      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleUserInputs({ userName, password }) {
  if (!userName || !password) {
    toast.error("Please fill in all the fields");
    return false;
  }
  return true;
}
