import Navbar from "./components/common/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import CreateBLog from "./pages/CreateBlog/CreateBLog";
import LoggedInUserBlogs from "./pages/LoggedInUserBlogs/LoggedInUserBlogs";
import Details from "./pages/Details/Details";
import UserDetails from "./pages/UserDetails/UserDetails";
import UpdateBlog from "./pages/updateBlog/UpdateBlog";
import { useAuthContext } from "./context/AuthContext";
import SearchedBlog from "./pages/SearchedBlog/SearchedBlog";
import Admin from "./pages/Admin/Admin";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className=" h-screen flex  bg-gray-900 overflow-auto">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className=" absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-200 to-emerald-800 opacity-20" />
        <div className="absolute inset-0 backdrop-blur mr-8 mb-8" />
      </div>
      <Navbar />
      <main className=" flex-grow z-10 pt-3 ">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <Signup />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/create-blog"
            element={authUser ? <CreateBLog /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/my-blogs"
            element={
              authUser ? <LoggedInUserBlogs /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/details"
            element={authUser ? <Details /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/userDetails"
            element={authUser ? <UserDetails /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/update-blog"
            element={authUser ? <UpdateBlog /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/searched-blog"
            element={authUser ? <SearchedBlog /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/admin"
            element={authUser ? <Admin /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
