import "dotenv/config";
import mongoose from "mongoose";

const connectToMongoDb = () => {
  try {
    const connect = mongoose.connect(process.env.DB_CONNECT_URL + "/auth-user");
    if (connect) {
      console.log(
        "Connected to database: ",
        process.env.DB_CONNECT_URL + "/auth-user"
      );
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

export default connectToMongoDb;
