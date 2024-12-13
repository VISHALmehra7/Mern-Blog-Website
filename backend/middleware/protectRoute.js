import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await User.findById(decodeToken.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute function ", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

export const adminRoute = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (req.user.role === "admin") {
      return next();
    } else {
      res.status(403).json({ message: "Access denied . Admins only" });
    }
  } catch (error) {
    console.log("Error in adminRoute function ", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};
