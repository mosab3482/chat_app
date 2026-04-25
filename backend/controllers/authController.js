import bcript from "bcryptjs";
import User from "../models/User.js";
import { generateUniqueConnectCode } from "../utils/connectCodeGenerator.js";
import jwt from "jsonwebtoken";

class AuthController {
  static async register(req, res) {
    try {
      const { fullName, userName, email, password } = req.body;
      if (!fullName || !userName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }
      const existingUser = await User.findOne({
        $or: [{ email }, { userName }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email or username already exists" });
      }
      const hashedPassword = await bcript.hash(password, 10);
      const user = new User({
        fullName,
        userName,
        email,
        password: hashedPassword,
        connectCode: await generateUniqueConnectCode(),
      });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcript.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cooke("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      res.status(200).json({
        user: {
          id: user.id,
          userName: user.userName,
          fullName: user.fullName,
          email: user.email,
          connectCode: user.connectCode,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async me(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        user: {
          id: user.id,
          userName: user.userName,
          fullName: user.fullName,
          email: user.email,
          connectCode: user.connectCode,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  }
}
export default AuthController;
