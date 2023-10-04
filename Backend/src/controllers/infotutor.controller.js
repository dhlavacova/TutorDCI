import Tutor from '../models/infotutor.model.js';
import { tutorSchema } from "../schemas/infotutor.schema.js";


export const createTutor = async (req, res) => {
  try {
    
    const tutorData = tutorSchema.parse(req.body);

    // Ahora tutorData contiene los datos validados según el esquema

    const tutor = new Tutor(tutorData);
    
    // Resto del código para crear el tutor y asignar el nombre del usuario (si es necesario)

    await tutor.save();
    res.status(201).json({ message: 'Tutor information was created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
};

export const getTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.json({ tutors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// export const getTutorsProfile = async (req, res) => {
//   try {
//     const tutors = await User.find({ role: "tutor" }, "_id username email role");
// console.log(tutors);
//     res.json({ tutors });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
