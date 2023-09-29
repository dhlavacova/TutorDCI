import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { v4 as uuid } from 'uuid'
import cron from 'node-cron'

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
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(randomPassword, salt);
                const userUpdatedPassword = await User.findOneAndUpdate({email: email},{$set: {password: passwordHash, passwordCreatedAt:new Date()}},{new: true});
                console.log("findoneandupdate" + userUpdatedPassword)
                console.log(randomPassword)
                console.log(userUpdatedPassword)
                console.log('date now'+ new Date(Date.now() + 60 * 1000).toISOString())
                //spustit casovac
                cron.schedule('*/30 * * * *', async () => {
                    console.log('Kontrola hesla po 30 minutách...');

                    const fiveMinutesAgo = new Date(Date.now() + 30* 60 * 1000);

                    // Hledejte uživatele, kteří změnili heslo před více než 5 minutami a update je
                    const usersWithOldPasswords = await User.updateMany({
                        passwordCreatedAt: { $lt: fiveMinutesAgo }
                    }, {
                        $set: {
                            passwordCreatedAt: null,
                            password: null
                        }
                    });
                    console.log(usersWithOldPasswords)


                });
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