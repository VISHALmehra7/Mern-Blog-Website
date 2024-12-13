import React, { useState } from "react";
import toast from "react-hot-toast";

const useMakeAdmin = () => {
  const [loading, setloading] = useState(false);
  const makeAdmin = async (userId) => {
    try {
      setloading(true);
      const res = await fetch(`/api/admin/assign-admin-role/${userId}`,{
        method:"POST"
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { loading, makeAdmin };
};

export default useMakeAdmin;
