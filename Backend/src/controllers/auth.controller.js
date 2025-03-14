import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, role, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      username,
      email,
      role,
      password: passwordHash,
      profileImage,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    /*const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });*/

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      role: userSaved.role,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    console.log("userfound" + userFound)
    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });
    if (userFound.password === null) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
      role: userFound.role,
      profileImage: userFound.profileImage,

    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });
    res.cookie("isLogged", token)
    console.log(userFound)
    res.json({
      id: userFound._id,
      username: userFound.username,
      role: userFound.role,
      profileImage: userFound.profileImage,
      // userType: userFound.role === 'student' ? 'student' : 'tutor', 
      /*email: userFound.email,*/
    });


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/**
 * Handles the login post request.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  const { isLogged } = req.cookies;

  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);
    console.log({ user })
    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      profileImage: userFound.profileImage,
    });
  });
};


export const logout = async (req, res) => {
  res.clearCookie("token"); //delete cookie from browser
  res.clearCookie("isLogged"); //delete cookie from browser,
  console.log("logout controller")
  // res.cookie("token", "", {
  //   httpOnly: true,
  //   secure: true,
  //   expires: new Date(0),

  // }); 

  return res.sendStatus(200);
};
