import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateJwtAndSetCookie from "../utils/generateJwtAndSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword, userDescription } =
      req.body;

    if (password != confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
      userName,
      email,
      password: hashedPassword,
      userImage: req.file ? req.file.path : null,
      userDescription,
    });
    await newUser.save();
    generateJwtAndSetCookie(newUser._id, res);

    return res.status(201).json({
      userName: newUser.userName,
      email: newUser.email,
      userImage: newUser.userImage,
      userDescription: newUser.userDescription,
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal server erro" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if(!user){
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password);
    if ( !isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    generateJwtAndSetCookie(user._id, res);
    res.status(200).json({
      id:user._id,
      userName: user.userName,
      email: user.email,
      userDescription: user.userDescription,
      userImage: user.userImage,
      posts:user.posts
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
