import mongoose from "mongoose";

// Teaching Unit teachingUnitSchema

const tutorSchema = new mongoose.Schema({

  tutorName: {
    type: "string",
    required: true,
  },

  course: {
    type: String,
    required: true,
  },
  classNumber: {
    type: String,
    required: true,
  },
  availability:[ 
    {
      day: String,
      time: String,
      duration: String,
    },
  ],
  platformLink: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Tutor", tutorSchema);
