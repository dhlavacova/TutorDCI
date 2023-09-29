import mongoose from "mongoose";


const tutorSchema = new mongoose.Schema({

  course: {
    type: String,
    required: true,
  },
  classNumber: {
    type: String,
    required: true,
  },
  availability: [
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

  // profileImage: {
  //   type: String, // Almacenar la URL de la imagen
  // },
});

export default mongoose.model('Tutor', tutorSchema);