import mongoose from "mongoose";



const studentSchema = new mongoose.Schema({

  studentName: {
    type: "string",
    required: true,
  },

  studentEmail: {
    type: "string",
    required: true,
  },

  profession: {
    type: String,
    required: true,
  },
  classNumber: {
    type: String,
    required: true,
  },

});

export default mongoose.model("Student", studentSchema);
