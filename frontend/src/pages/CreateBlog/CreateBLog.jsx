import { motion } from "framer-motion";
import React, { useState } from "react";
import useCreateBlog from "../../hooks/useCreateBlog.js";
import { useNavigate } from "react-router-dom";

const CreateBLog = () => {
 const {createBlog} =  useCreateBlog()
 const navigate = useNavigate()
  const [input, setinput] = useState({
    title: "",
    content: "",
    postImage: null,
  });
  async function handleSubmit(e) {
    e.preventDefault();

    const blogData = await createBlog(input)
    if(blogData){
      navigate("/")
    }
    
  }

  return (
    <div className=" pt-16 relative px-4 sm:px-6 md:px-8 lg:px-10   flex flex-col justify-center items-center w-96 sm:w-auto text-white ">
      <motion.div
        initial={{ opacity: 0, x: 0, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-emerald-400 font-bold text-center mb-4">
          Create Your Own Blog
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 0, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="bg-emerald-500 bg-opacity-15 border border-emerald-900 p-6 rounded-md shadow-md w-full max-w-lg"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-2">
            <label className="label mb-2">
              <span className="text-base label-text text-gray-300 ">Title</span>
            </label>
            <input
              type="text"
              placeholder="title..."
              className="w-full input input-bordered h-10 bg-transparent border border-emerald-800 rounded-md px-2 text-white outline-none"
              minLength={"5"}
              value={input.title}
              onChange={(e) => setinput({ ...input, title: e.target.value })}
            />
          </div>
          <div>
            <label className="label mb-2">
              <span className="text-base label-text text-gray-300  font-medium ">
                Your Content
              </span>
            </label>
            <textarea
              type="text"
              placeholder="content..."
              className="w-full input input-bordered bg-transparent border border-emerald-800 rounded-md px-2 text-white h-96 resize-none outline-none   "
              minLength={"20"}
              value={input.content}
              onChange={(e) => setinput({ ...input, content: e.target.value })}
            />
          </div>
          <div className="flex justify-center items-center">
            <label
              htmlFor="userImage"
              className="bg-blue-700 p-2 rounded-md cursor-pointer text-white mb-2"
            >
              Upload Image
            </label>
            <input
              id="userImage"
              type="file"
              className="hidden"
              onChange={(e) =>
                setinput({ ...input, postImage: e.target.files[0] })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white p-2 rounded-md text-center w-full hover:bg-red-600 transition"
          >
            Create
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBLog;
