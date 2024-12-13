import React, { useEffect, useState } from "react";
import {
  LogIn,
  UserPlus,
  Menu,
  BadgePlus,
  House,
  Search,
  NotebookText,
  CircleUser,
  LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useSearchBlog from "../../hooks/useSearchBlog";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";

const Navbar = () => {
  const { searchBlog } = useSearchBlog();
 const {authUser} =  useAuthContext()
  const [searchInput, setsearchInput] = useState("");
  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const navigate = useNavigate();
const {logout} =   useLogout()

  const SIDEBAR_ITEMS = [
    {
      name: "Create BLog",
      icons: BadgePlus,
      color: "#6366f1",
      href: "/create-blog",
    },

    { name: "Sign Up", icons: UserPlus, color: "#ec4899", href: "/signup" },

    {name: "Login", icons: LogIn, color: "#10b981", href: "/login" },
    {name: "LogOut", icons: LogOut, color: "#990000", onClick: handleLogout },

    { name: "Home", icons: House, color: "#f97316", href: "/" },
    {
      name: "My Blogs",
      icons: NotebookText,
      color: "#8A2BE2",
      href: "/my-blogs",
    },
    { name: "Admin", icons: CircleUser, color: "#39FF14", href: "/admin" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    await searchBlog(searchInput);
    navigate("/searched-blog");
  }

async function handleLogout() {
  await logout()
}

  return (
    <motion.div
      className={`z-100 relative  transition-all duration-300 ease-in-out flex-shrink-0 `}
      initial={{ width: 256 }}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="h-screen bg-gray-900 bg-opacity-15 border backdrop-blur-md border-emerald-900 flex flex-col p-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setisSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-900 max-w-fit transition-colors "
        >
          <Menu size={24} color="gray" />
        </motion.button>
        <nav className="mt-8 flex-grow">
          <form
            onSubmit={handleSubmit}
            className="flex pl-3  pb-4 cursor-pointer  "
          >
            <Search
              size={20}
              color="red"
              onClick={() => setisSidebarOpen(true)}
              className="min-w-5"
            />
            <AnimatePresence>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setsearchInput(e.target.value)}
                className={`bg-transparent border border-emerald-800 rounded-md ml-4 w-full text-white
                ${isSidebarOpen ? "w-full" : "w-0 border-none"}
                `}
              />
            </AnimatePresence>
          </form>
          {SIDEBAR_ITEMS.map((item) => (
          
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors mb-2 cursor-pointer"
              onClick={item.onClick || (()=> navigate(item.href))} 
               >
                <item.icons
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                  
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap text-gray-300"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Navbar;
