import React, { useState } from "react";
import { motion } from "framer-motion";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useLogin();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    const userData = await login(userInput);
    console.log("Ud", userData);

    navigate("/");
  }
  return (
    <div className=" h-full  flex flex-col justify-center items-center gap-4 pl-4 pr-4 w-96 sm:w-auto">
      <motion.div
        initial={{ opacity: 0, x: 0, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h1 className="text-2xl sm:text-3xl text-emerald-400 font-bold">
          Login your account
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 0, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="bg-emerald-500 bg-opacity-15 border border-emerald-900  p-4 rounded-md shadow-md"
      >
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-300">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="username..."
              className="w-full input input-bordered h-10 bg-transparent border border-emerald-800 rounded-md px-2 text-white"
              value={userInput.userName}
              onChange={(e) =>
                setUserInput({ ...userInput, userName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-300">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="password..."
              className="w-full input input-bordered h-10 bg-transparent border border-emerald-800 rounded-md px-2 text-white"
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
            />
          </div>
          <div className="bg-red-400 p-2 rounded-md text-white text-center ">
            <button className="w-full" type="submit">
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
