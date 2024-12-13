import React, { useState } from "react";
import toast from "react-hot-toast";

const useDeleteBlog = () => {
  const [loading, setloading] = useState(false);
  const deleteBlog = async (postId) => {
    try {
      setloading(true);
      const res = await fetch(`/api/post/delete/${postId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message || "Blog Deleted successfully");

      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { deleteBlog, loading };
};

export default useDeleteBlog;
