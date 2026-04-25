import mongoose, { connect } from "mongoose";
const userSchema = new mongoose.Schema({
  connectCode: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    minLenth: 3,
    maxLenth: 20,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    minLenth: 3,
    maxLenth: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLenth: 6,
  },
});

export default mongoose.model("User", userSchema);
