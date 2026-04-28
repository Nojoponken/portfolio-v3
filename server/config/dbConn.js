import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connect.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  mongoose.connection.on("error", (err) => {
    console.error(err);
    // logEvents(
    //   `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    //   "mongoErrlog.log",
    // );
  });
};

export default connectDB;
