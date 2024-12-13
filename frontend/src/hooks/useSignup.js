import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    userName,
    email,
    password,
    confirmPassword,
    userDescription,
    userImage,
  }) => {
    const success = handleInputs({
      userName,
      email,
      password,
      confirmPassword,
      userDescription,
      userImage,
    });
    if (!success) return;

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("userDescription", userDescription);
    formData.append("userImage", userImage);

    try {
      setloading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }
      toast.success("Signup successfull");
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      setAuthUser(data);
      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputs({
  userName,
  email,
  password,
  confirmPassword,
  userDescription,
  userImage,
}) {
  if (
    !userName ||
    !email ||
    !password ||
    !confirmPassword ||
    !userDescription ||
    !userImage
  ) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (userImage.length < 4) {
    toast.error("Username must be of length 4 or greater");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least of length 6");
    return false;
  }
  if (userDescription.length < 50) {
    toast.error("userDescription must be of length 50 and greater");
    return false;
  }
  return true;
}
