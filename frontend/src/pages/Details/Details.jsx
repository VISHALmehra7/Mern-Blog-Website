import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import useDeleteBlog from "../../hooks/useDeleteBlog";
import { useAuthContext } from "../../context/AuthContext";

const Details = () => {
  const select = useSelector((state) => state.blogSlice.selectedBlog);

  const { authUser } = useAuthContext();
  const [isMyPost, setisMyPost] = useState(authUser.posts.includes(select._id));
  const navigate = useNavigate();

  const { deleteBlog } = useDeleteBlog();
  async function handleDelete(postId) {
    await deleteBlog(postId);
    navigate("/my-blogs");
  }

  async function handleUpdate(postId) {
    navigate("/update-blog");
  }

  return (
    <div>
      <div className="m-2  flex flex-col justify-center items-center gap-4 flex-shrink ">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className=" flex flex-col md:flex-row justify-center items-center gap-2 "
        >
          <div className="w-96 h-72 rounded-lg overflow-hidden ">
            <img
              className="object-cover w-full h-full hover:scale-105 transition-all duration-1000 ease-in-out "
              src={`http://localhost:3000/${select.postImage}`}
              alt="UserImage"
            />
          </div>
          <div className=" w-full  mx-auto text-xl text-emerald-500 bg-gray-900 bg-opacity-15 border backdrop-blur-md border-emerald-900 rounded-md p-4 max-w-7xl ">
            <Link to={"/userDetails"}>
              <h3
                to={"/userDetails"}
                className=" text-gray-400 text-center md:text-left cursor-pointer hover:underline "
              >
                {select.author.userName}
              </h3>
            </Link>

            <h3 className="mb-6 font-thin text-blue-400 text-center md:text-left">
              {select.author.email}
            </h3>
            <h3 className=" text-center md:text-left text-red-400 ">
              {select.title}
            </h3>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-gray-900 bg-opacity-15 border backdrop-blur-md border-emerald-900 p-4 rounded-md text-gray-400 md:max-w-7xl md:text-xl text-center mx-auto relative  "
        >
          {isMyPost ? (
            <div className="absolute right-0 top-4 flex gap-5 p-2 ">
              <span onClick={() => handleDelete(select._id)}>
                <Trash2 size={18} color="red" className="cursor-pointer" />{" "}
              </span>
              <span onClick={() => handleUpdate(select._id)}>
                {" "}
                <Pencil
                  size={18}
                  color="orange"
                  className="cursor-pointer"
                />{" "}
              </span>
            </div>
          ) : null}

          <div className="pt-8">
            <p>{select.content}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Details;
