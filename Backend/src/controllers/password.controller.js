import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const changePassword = async (req, res) => {
    console.log("changePassword");
    try {
        if (!req.user) {

            return res.status(400).json({message: "Chyba autentikace."});
        }
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