import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";
import useLikeBlog from "../hooks/useLikeBlog";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectBlog } from "../store/blogSlice.js";

const BLogCard = ({ singleBlog }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [isLiked, setisLiked] = useState(
    singleBlog.likes.includes(authUser.id)
  );
  const { likePost, loading } = useLikeBlog();

  const dispatch = useDispatch();

  async function handleLike(postId) {
    const data = await likePost(postId);
    if (data.message === "Post liked") {
      setisLiked(true);
    } else if (data.message === "Post already liked") {
      setisLiked(true);
    }
  }

  function handleShowDetails() {
    dispatch(selectBlog(singleBlog));
    navigate("/details");
  }

  return (
    <div onClick={handleShowDetails} className="cursor-pointer">
      <div className="relative bg-gray-900 max-w-full h-56 overflow-hidden shadow-lg rounded-md">
        <img
          className="w-full h-full object-cover opacity-70 hover:scale-125 transition-all duration-700 ease-in-out"
          src={`http://localhost:3000/${singleBlog.postImage}`}
          alt=""
        />
        <span className="absolute bottom-2 left-2 p-1  text-white text-sm">
          {singleBlog.title}
        </span>
        <span className="absolute right-2 bottom-2 p-1">
          <ThumbsUp
            onClick={() => handleLike(singleBlog._id)}
            className="cursor-pointer "
            color="gold"
            fill={isLiked ? "orange" : "gray"}
            size={19}
          />
        </span>
      </div>
    </div>
  );
};

export default BLogCard;
