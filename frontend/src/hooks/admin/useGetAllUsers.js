import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {setUsers} from '../../store/blogSlice.js'

const useGetAllUsers = () => {
 const dispatch =    useDispatch()
  const [loading, setloading] = useState(false);
  const getAllUsers = async () => {
    try {
      setloading(true);
      const res = await fetch("/api/admin/getallusers");
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return
      }
      dispatch(setUsers(data))
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return {loading ,getAllUsers}
};

export default useGetAllUsers;
