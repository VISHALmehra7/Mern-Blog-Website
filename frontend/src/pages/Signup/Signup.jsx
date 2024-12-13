import React, { useState } from "react";
import { motion } from "framer-motion";
import useSignup from "../../hooks/useSignup.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading } = useSignup();
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userDescription: "",
    userImage: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const userData = await signup(input);
    if (userData) {
      navigate("/");
    }
  }

  return (
    <div className=" pt-16 relative px-4 sm:px-6 md:px-8 lg:px-10   flex flex-col justify-center items-center w-96 sm:w-auto">
      <motion.div
        initial={{ opacity: 0, x: 0, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-emerald-400 font-bold text-center mb-4">
          Create Your Account
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 0, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="bg-emerald-500 bg-opacity-15 border border-emerald-900 p-6 rounded-md shadow-md w-full max-w-lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="label mb-2">
              <span className="text-base label-text text-gray-300">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Username..."
              className="w-full input input-bordered h-10 bg-transparent border border-emerald-800 rounded-md px-2 text-white"
              value={input.userName}
              onChange={(e) => setInput({ ...input, userName: e.target.value })}
            />
          </div>
          <div>
            <label className="label mb-2">
              <span className="text-base label-text text-gray-300">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email..."
              className="w-full input input-bordered h-10 bg-transparent border border-emerald-800 rounded-md px-2 text-white"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label mb-2">
              <span className="text-base label-text text-gray-300">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Password..."
              className="w-full input input-bordered h-10 bg-transparent border border-emerald-800 rounded-md px-2 text-white"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>
          <div>
            <label className="label mb-2">
              <span className="text-base label-text text-gray-300">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password..."
              className="w-full input input-bordered h-10 bg-transparent border border-emerald-800 rounded-md px-2 text-white"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label mb-2">
              <span className="text-base label-text text-gray-300">
                User Description
              </span>
            </label>
            <textarea
              placeholder="User Description..."
              className="w-full input input-bordered bg-transparent border border-emerald-800 rounded-md px-2 resize-none h-24 text-white"
              minLength="50"
              value={input.userDescription}
              onChange={(e) =>
                setInput({ ...input, userDescription: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center items-center">
            <label
              htmlFor="userImage"
              className="bg-blue-700 p-2 rounded-md cursor-pointer text-white"
            >
              Upload Image
            </label>
            <input
              id="userImage"
              type="file"
              className="hidden"
              onChange={(e) =>
                setInput({ ...input, userImage: e.target.files[0] })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white p-2 rounded-md text-center w-full hover:bg-red-600 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
