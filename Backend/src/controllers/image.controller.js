import fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';
import User from "../models/user.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getUserImage = async (req, res) => {
    const userId = req.user.id;

    const currentUser = await User.findById(userId);

    if (!currentUser) {
        res.status(404).send('Nutzer nicht gefunden');
        return;
    }

    if (currentUser.profileImage === undefined || currentUser.profileImage === null) {
        // Si profileImage es undefined o null, puedes devolver una imagen predeterminada o un mensaje de error.
        const defaultImage = (path.join(__dirname, "/../../uploads", "default.png"));
        return res.sendFile(defaultImage);
    }

    const imageName = currentUser.profileImage.split('/uploads/')[1];
    const imagePath = (path.join(__dirname, "/../../uploads", imageName));

    if (fs.existsSync(imagePath)) {
        console.log("__dirname:", __dirname);
        return res.sendFile(imagePath);
    } else {
        return res.status(404).send('Imagen no encontrada');
    }
}

