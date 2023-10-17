import Student from '../models/infostudent.model.js';


export const createStudentClass = async (req, res) => {
  const studentData = req.body;
  if(!studentData){
    return res.status(400).json({message: "not data"});
  }
  try {
    const student = new Student(studentData);
    await student.save();
    res.status(201).json({ message: 'Student information was created successfully' });
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

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }};

