import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  repo: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Project", projectSchema);
