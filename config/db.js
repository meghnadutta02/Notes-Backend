import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err.message);
    process.exit(1);
  }
};

export default connect;
