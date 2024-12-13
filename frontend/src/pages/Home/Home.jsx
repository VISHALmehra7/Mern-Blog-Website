import React, { useEffect } from "react";
import BLogCard from "../../components/BLogCard";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useGetRecommendedBlogs from "../../hooks/useGetRecommendedBlogs.js";

const Home = () => {
  const select = useSelector((state) => state.blogSlice.allBlogs);
  const { getRecommendedBlogs, loading } = useGetRecommendedBlogs();

  useEffect(() => {
    const fetchRecommendedBlogs = async () => {
      await getRecommendedBlogs();
    };
    fetchRecommendedBlogs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="text-center">
        <h1 className="mx-auto text-xl font-bold text-emerald-500 md:text-2xl lg:text-4xl text-center mb-1 ">
          Browse Our Blogs Collections
        </h1>
        <span className="text-gray-400">Discover the latest blogs here</span>
      </div>

      <div
        className=" px-2 overflow-auto flex flex-col gap-2 sm:w-auto
   sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 sm:pl-11 sm:pr-11 md:pl-20 md:pr-20 lg:pl-28 lg:pr-28 lg:max-w-7xl lg:mx-auto pt-12 "
      >
        {!loading && select.length > 0
          ? select.map((singleBlog) => (
              <BLogCard key={singleBlog.id} singleBlog={singleBlog} />
            ))
          : null}
      </div>
    </motion.div>
  );
};

export default Home;
