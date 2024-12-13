import React from "react";
import useMakeAdmin from "../../hooks/admin/useMakeAdmin";

const AdminUserCard = ({singleUser}) => {
const {makeAdmin} = useMakeAdmin()
   async function handleClick() {
        await makeAdmin(singleUser._id)
    }
  return (
    <div className="w-full  bg-gray-900 bg-opacity-30 border backdrop-blur-md border-emerald-900 text-white flex justify-between items-center gap-4 p-3 rounded-md">
      <div className="w-28">{singleUser.userName}</div>
      <div className="bg-green-300 p-1 rounded-md text-green-800">{singleUser.role}</div>
      <button onClick={()=> handleClick(singleUser._id)} className="bg-red-400 p-1 rounded-md text-red-800">
        Make Admin
      </button>
    </div>
  );
};

export default AdminUserCard;
