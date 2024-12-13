import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import fuzzySearch from "fuzzy-search";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newPost = await new Post({
      title: title,
      content: content,
      postImage: req.file ? req.file.path : null,
      author: req.user._id,
    }
  );

    await newPost.save();
    req.user.posts.push(newPost._id);
    await req.user.save();
    res.status(200).json({
      post: {
        id: newPost._id,
        title: newPost.title,
        content: newPost.content,
        postImage: newPost.postImage,
        author: newPost.author,
      
      },
      user: {
        id: req.user._id,
        email: req.user.email,
        username: req.user.username,
        posts: req.user.posts, 
        userImage:req.user.userImage,
       userDescription:req.user.user
      },
  });
  } catch (error) {
    console.log("Error in createPost controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({ message: "Post already liked" });
    }

    post.likes.push(req.user._id);

    await post.save();

    res
      .status(200)
      .json({ message: "Post liked", likesCount: post.likes.length });
  } catch (error) {
    console.log("Error in likesPost controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLoggedInUserPost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const loggedInUser = await User.findById(req.user._id)
      .populate("posts")
      .select("-password");
    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!loggedInUser.posts) {
      return req.status(404).json({ message: "No post availaible" });
    }

    res.status(200).json(loggedInUser.posts);
  } catch (error) {
    console.log("Error in getLoggedInUserPost controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchBlog = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const posts = await Post.find();

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    const searcher = new fuzzySearch(posts, ["title"], {
      caseSensitive: false,
    });

    const result = searcher.search(searchTerm);

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts matched the search term" });
    }

    const postWithAuthors = await Post.populate(result, {
      path: "author",
      select: "-password",
    });
    res.status(200).json(postWithAuthors);
  } catch (error) {
    console.error("Error in searchBlog controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { postId } = req.params;
    const updates = { ...req.body };

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.user.posts.includes(postId)) {
      return res
        .status(401)
        .json({ message: "You are not allowed to update this blog" });
    }

    if (req.file) {
      updates.postImage = req.file.path;
    }

    const updatePost = await Post.findOneAndUpdate({ _id: postId }, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatePost) {
      return res.status(404).json({ message: "No post found" });
    }

    res.status(200).json(updatePost);
  } catch (error) {
    console.log("Error in updateBlog controller", error);
    res.status(500).json({ messsage: "Internal server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.user.posts.includes(postId)) {
      return res
        .status(401)
        .json({ message: "You are not allowed to delete this blog" });
    }
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(401).json({ message: "Blog cannot be deleted" });
    }
    const deletePostIdFromUser = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { posts: postId } },
      { new: true }
    );

    res.status(200).json({ message: "Blog delete successfully" });
  } catch (error) {
    console.log("Error in deleteBlog controller", error);
    res.status(500).json({ messsage: "Internal server error" });
  }
};

export const recommendedPosts = async (req, res) => {
  try {
    const randomPosts = await Post.aggregate([{ $sample: { size: 9 } }]);
    if (!randomPosts) {
      return res.status(404).json({ message: "No posts available to suggest" });
    }

    const postWithAuthors = await Post.populate(randomPosts, {
      path: "author",
      select: "-password",
    });
    res.status(200).json(postWithAuthors);
  } catch (error) {
    console.log("Error in recommendedPosts controller");
    res.status(500).json({ message: "Internal server error" });
  }
};
