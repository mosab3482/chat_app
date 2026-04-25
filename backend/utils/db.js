import mongoose from "mongoose";
async function connectDB() {
  const url = process.env.MONGO_URL;
  if (!url) throw new Error("MONGO_URL is not set");
  try {
    await mongoose.connect(url);
    console.log("DB Connected");
  } catch (err) {
    console.log("DB Connection Failed");
    process.exit(1);
  }
}
export default connectDB;
