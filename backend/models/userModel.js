import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      unique: [true, "Username must be unique"],
      required: [true, "Username is required"],
      minlength: [4, "Username must be of length 4 or greater"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be atleast of length 6 or greater"],
    },
    userDescription: {
      type: String,
      required: [true, "User description is required"],
      minlength: [50, "User description must be of length 50 or greater"],
    },
    userImage: {
      type: String,
      required: [true, "User image is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
