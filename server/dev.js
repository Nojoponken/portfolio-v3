import app from "./server.js";
import mongoose from "mongoose";
import connectDB from "./config/dbConn.js";

const PORT = process.env.PORT || 3500;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
});

await connectDB();
