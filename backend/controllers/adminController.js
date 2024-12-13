import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const assignAdminRole = async (req, res) => {
  try {
    const { userId } = req.params;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied . Admins only" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(403).json({ message: "User is already an admin" });
    }
    user.role = "admin";
    await user.save();
    res.status(200).json({ message: "User updated to admin role" });
  } catch (error) {
    console.log("Error in assignAdminRole controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const allUsers = async(req,res)=>{
  try {
    if(req.user.role!=='admin'){
      return res.status(403).json({message:"Access denied .Admins only"})
    }
    const allUsers = await User.find()
    res.status(200).json(allUsers)
  } catch (error) {
    console.log("Error in allUsers controller",error);
    res.status(500).json({message:"Internal server error"})
    
  }
}

export const getAllBlogs = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied .Admins only" });
    }

    const allBlogs = await Post.find();
    res.status(200).json(allBlogs);
  } catch (error) {
    console.log("Error in getAllBlogs controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { postId } = req.params;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied . Admins only" });
    }
    const deletedBlog = await Post.findByIdAndDelete(postId);
    if (!deletedBlog) {
      return res.status(401).json({ message: "Post not deleted" });
    }

    const deletedBlogIdfromUser = await User.findByIdAndUpdate(
      deletedBlog.author,
      { $pull: { posts: postId } },
      { new: true }
    );
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    console.log("Error in deleteBlog controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

