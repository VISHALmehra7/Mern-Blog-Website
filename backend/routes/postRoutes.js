import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost,
  likePost,
  getLoggedInUserPost,
  searchBlog,
  updateBlog,
  deleteBlog,
  recommendedPosts,
} from "../controllers/postController.js";
import upload from "../utils/multer.js";

const router = express.Router();
router.post("/create", protectRoute, upload.single("postImage"), createPost);
router.post("/like/:postId", protectRoute, likePost);
router.get("/loggedInUserPosts", protectRoute, getLoggedInUserPost);
router.get("/search", protectRoute, searchBlog);
router.put("/update/:postId",protectRoute,upload.single("postImage"),updateBlog);
router.delete("/delete/:postId", protectRoute, deleteBlog);
router.get("/recommendedPosts", protectRoute, recommendedPosts);

export default router;
