import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setBlogs } from "../store/blogSlice.js";

const useGetLoggedInUserBlogs = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const getLoggedInUseBlog = async () => {
    try {
      setloading(true);
      const res = await fetch("/api/post/loggedInUserPosts");
      const data = await res.json();
      if(!res.ok){
        toast.error(data.message)
        return
      }
      dispatch(setBlogs(data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { getLoggedInUseBlog, loading };
};

export default useGetLoggedInUserBlogs;
