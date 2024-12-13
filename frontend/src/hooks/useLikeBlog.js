import React, { useState } from "react";
import { toast } from "react-hot-toast";

const useLikeBlog = () => {
  const [loading, setloading] = useState(false);
  const likePost = async (postId) => {
    try {
      setloading(true);
      const res = await fetch(`/api/post/like/${postId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success("Post Liked !!");
      
      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { likePost, loading };
};

export default useLikeBlog;
