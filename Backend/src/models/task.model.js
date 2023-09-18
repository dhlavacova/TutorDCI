import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {

    theme: {
      type: String,
      required: true,
    },
    tutor: {
      type: String,
      required: true,
    },
student: {
        type: String,
    required: true
},
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
