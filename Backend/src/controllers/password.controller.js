import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { v4 as uuid } from 'uuid'
export const changePassword = async (req, res) => {
    console.log("changePassword");
    try {
        if (!req.user) {

            return res.status(400).json({message: "Chyba autentikace."});
        }
        console.log(req.body)
        const userId = req.user.id; //Anfrage das Cookei Object
        const {oldPassword, newPassword} = req.body; //Anfrage des gesamten JSON Body: req.body.oldPassword
        console.log("req.body" + req.body);
        console.log("userId: " + userId);
        const passwordDatabase = await User.findOne({_id: userId});
        const passwordMatch = await bcrypt.compare(oldPassword, passwordDatabase.password);
        console.log("compare" + passwordMatch)
        if (!passwordMatch) {
            return res.status(400).json({message: "The password is incorrect"});
        } else {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(newPassword, salt);
            const userUpdatedPassword = await User.findOneAndUpdate({_id: userId}, {password: passwordHash}, {new: true});
            console.log("findoneandupdate" + userUpdatedPassword)
            if (userUpdatedPassword) {
                return res.status(200).json({message: "Password changed."})
            }
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

export const forgetPassword = async(req, res) => {
    console.log("forget password")
    try{
        if(!req.body){
            return res.status(400).json({message: "not data."});
        }
        else{
            const email=req.body.email;
            const isUserinRegister=await User.findOne({email:req.body.email})
            if(!isUserinRegister){
                return res.status(400).json({message: "User was not finde. Pleas make registration"})
            }
            else{
                const randomPassword=uuid().slice(0,8)
                console.log({randomPassword})
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(randomPassword, salt);
                const userUpdatedPassword = await User.findOneAndUpdate({email: email}, {password: passwordHash}, {new: true});
                console.log("findoneandupdate" + userUpdatedPassword)
                console.log(randomPassword)
                if (userUpdatedPassword) {
                    return res.status(200).json({message: "Password changed."})
                }
            }
        }
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}