import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const UserDetails = () => {
  const select = useSelector((state) => state.blogSlice.selectedBlog);

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
              src={`http://localhost:3000/${select.author.userImage}`}
              alt="UserImage"
            />
          </div>
          <div className=" w-full  mx-auto text-xl text-emerald-500 bg-gray-900 bg-opacity-15 border backdrop-blur-md border-emerald-900 rounded-md p-4 max-w-7xl">
            <h3
              to={"/userDetails"}
              className=" text-gray-400  text-center md:text-left  cursor-pointer  "
            >
              {select.author.userName}
            </h3>
            <h3 className="mb-6 font-thin text-blue-400 text-center md:text-left">
              {select.author.email}
            </h3>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-gray-900 bg-opacity-15 border backdrop-blur-md border-emerald-900 p-4 rounded-md text-gray-400 md:max-w-7xl md:text-xl text-center mx-auto "
        >
          <p>{select.author.userDescription}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDetails;
