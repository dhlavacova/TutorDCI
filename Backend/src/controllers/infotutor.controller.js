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
/**
 * Handle request to some endpoint
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
//wann ist verfügbar den Tutor :) seinen terminen (tutor Profil)
export const getAvailibility = async (req, res) => {

  try {
    if (!req.user.username) {

      return res.status(400).json({message: "Chyba autentikace."});
    }
else{
      const availibity = await Tutor.find({ tutorName: req.user.username });
     console.log({availibity})
    res.json(availibity);
  }
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//filter for the studenten (my Booking form) hir kann er die Tutor suchen und reservation booken
export const getTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    console.log(tutors.map((tutor) => tutor.availability.map((available) => available.day)))
    res.json({ tutors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};

