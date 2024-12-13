import React from "react";
import useAdminDeleteBlog from "../../hooks/admin/useAdminDeleteBlog";

const AdminBlogCard = ({ singleBlog }) => {
  const { deleteBlog } = useAdminDeleteBlog();
  async function handleClick() {
    await deleteBlog(singleBlog._id);
  }

  return (
    <div className="w-full  bg-gray-900 bg-opacity-30 border backdrop-blur-md border-emerald-900 text-white flex justify-between items-center gap-4 p-2 rounded-md">
      <div className="w-20 h-14 ">
        <img
          src={`http://localhost:3000/${singleBlog.postImage}`}
          alt=""
          className="w-full h-full  object-cover flex-shrink-0"
        />
      </div>
      <div>{singleBlog.title}</div>
      <div>
        <button
          onClick={() => handleClick(singleBlog._id)}
          className="bg-red-900 p-1 rounded-md text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminBlogCard;
