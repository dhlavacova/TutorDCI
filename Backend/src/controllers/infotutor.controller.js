import Tutor from '../models/infotutor.model.js';


export const createTutorClass = async (req, res) => {
  const tutorData = req.body;
  if(!tutorData){
    return res.status(400).json({message: "not data"});
  }
  try {
    const tutor = new Tutor(tutorData);
    await tutor.save();
    res.status(201).json({ message: 'Tutor information was created successfully' });
  } catch (error) {
    console.error(error.message);
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

