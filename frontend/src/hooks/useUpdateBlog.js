import React, { useState } from "react";
import toast from "react-hot-toast";

const useUpdateBlog = () => {
  const [loading, setloading] = useState(false);
  const updateBlog = async (postId,{title,content,postImage}) => {

    const formData = new FormData()
    formData.append("title", title);
    formData.append("content", content);
    formData.append("postImage", postImage);
    try {
      setloading(true);
      const res = await fetch(`/api/post/update/${postId}`, {
        method: "PUT",
        body:formData
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error);
        return;
      }
      toast.success(data.message || "Post updated successfully");
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { updateBlog, loading };
};

export default useUpdateBlog;
