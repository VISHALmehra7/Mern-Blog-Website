import React, { useEffect } from "react";
import AdminUserCard from "../../components/admin/AdminUserCard";
import AdminBlogCard from "../../components/admin/AdminBlogCard";
import useGetAllUsers from "../../hooks/admin/useGetAllUsers";
import { useSelector } from "react-redux";
import useGetAllBlogs from "../../hooks/admin/useGetAllBlogs";

const Admin = () => {
  const userSelect = useSelector((state) => state.blogSlice.allUsers);
  const BlogSelect = useSelector((state) => state.blogSlice.allBlogs);
  const { getAllUsers } = useGetAllUsers();
  const { getAllBlogs } = useGetAllBlogs();

  useEffect(() => {
    async function allUsers() {
      await getAllUsers();
    }
    allUsers();
    async function allBlogs() {
      await getAllBlogs();
    }
    allBlogs();
  }, []);

  return (
    <div className=" flex flex-col gap-4 mb-2 text-center items-center p-4 ">
      <div>
        <h1 className="mx-auto text-xl font-bold text-emerald-500 md:text-2xl lg:text-4xl text-center  ">
          Admin Dash Board
        </h1>
      </div>

      <div className=" w-full  ml-2 p-3  bg-gray-900 bg-opacity-40 border backdrop-blur-md border-emerald-900 text-white flex flex-col gap-2 h-80 overflow-auto rounded-md ">
        <div>
          <div>
            <h1 className="mx-auto text-xl font-bold text-emerald-500 md:text-2xl lg:text-3xl text-center  ">
              All Users{" "}
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2">
          {userSelect.map((singleUser) => (
            <AdminUserCard key={singleUser._id} singleUser={singleUser} />
          ))}
        </div>
      </div>
      <div className=" w-full ml-2 p-3  bg-gray-900 bg-opacity-40 border backdrop-blur-md border-emerald-900 text-white flex flex-col gap-2 h-80 overflow-y-auto rounded-md">
        <div>
          <h1 className="mx-auto text-xl font-bold text-emerald-500 md:text-2xl lg:text-3xl text-center  ">
            All Blogs{" "}
          </h1>
        </div>
        <div className="flex flex-col gap-2 p-2">
          {BlogSelect.map((singleBlog) => (
            <AdminBlogCard key={singleBlog._id} singleBlog={singleBlog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
