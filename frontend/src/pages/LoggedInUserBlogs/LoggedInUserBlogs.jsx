import React, { useEffect } from "react";
import { motion } from "framer-motion";
import BLogCard from "../../components/BLogCard";
import { useSelector } from "react-redux";
import useGetLoggedInUserBlogs from "../../hooks/useGetLoggedInUserBlogs";
const LoggedInUserBlogs = () => {
  const select = useSelector((state) => state.blogSlice.allBlogs);
  const { getLoggedInUseBlog, loading } = useGetLoggedInUserBlogs();

  

  useEffect(() => {
    const fetchLoggedInUserBlogs = async () => {
      await getLoggedInUseBlog();
    };
    fetchLoggedInUserBlogs();
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 0, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="text-center">
          <h1 className="mx-auto text-xl font-bold text-emerald-500 md:text-2xl lg:text-4xl text-center mb-1 ">
            Your Blog Collection
          </h1>
          <span className="text-gray-400">Relive the memories</span>
        </div>

        <div
          className=" px-2 overflow-auto flex flex-col gap-2 sm:w-auto w-96
   sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 sm:pl-11 sm:pr-11 md:pl-20 md:pr-20 lg:pl-28 lg:pr-28 lg:max-w-7xl lg:mx-auto pt-12   "
        >
         {
          !loading && select.length >0 ? select.map((singleBlog)=>(
            <BLogCard singleBlog={singleBlog}/>
            
          )):null
         }
        </div>
      </motion.div>
    </div>
  );
};

export default LoggedInUserBlogs;
