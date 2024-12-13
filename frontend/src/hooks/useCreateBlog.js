import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useCreateBlog = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setloading] = useState(false);
  const createBlog = async ({ title, content, postImage }) => {
    const success = handleInput({ title, content, postImage });
    if (!success) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("postImage", postImage);

    try {
      setloading(true);
      const res = await fetch("/api/post/create", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not create blog");
        return;
      }
      toast.success("Blog Created");
      console.log(data);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      setAuthUser(data.user);
      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { createBlog, loading };
};

export default useCreateBlog;

function handleInput({ title, content, postImage }) {
  if (!title || !content || !postImage) {
    toast.error("Please enter all the fields");
    return false;
  }
  if (title.length < 5) {
    toast.error("Title length must be atleast be 5 or greater");
    return false;
  }
  if (content.length < 20) {
    toast.error("Content length must be atleast be 20 or greater");
    return false;
  }
  return true;
}
