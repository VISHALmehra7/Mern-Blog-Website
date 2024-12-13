import mongoose, { Types } from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title length must be of length 5 or greater"],
      maxlength: [100, "Title length must not be greater than 15"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [20, "Content must be of length 20 or greater"],
    },
    postImage: {
      type: String,
      required: [true, "Cover image is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
