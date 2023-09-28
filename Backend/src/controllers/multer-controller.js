import multer from "multer";
import fs from "fs";
import path from "path";
import UserModel from "../models/user.model.js";


// 1. Variante: Simpel, wenn man Dateinnamen nicht ändern und keine Unterordner erstellen möchte
// const upload = multer({dest:'./uploads'});

// export default [
//     upload.single('file'), 
//     (req,res) => {

//         res.send(`Datei erfolgreich hochgeladen in ${req.file.path}`)
//     }
// ]

// 2. Variante: Unterordner für jeden Nutzer und DAteinamen selbst festlegen

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Hole Benutzer ID
        const userId = req.userId; // von isAuth middleware gesetzt, die "vorangeschaltet" ist in der upload route

        // Erstelle den benutzerspezifischen Pfad
        const userPath = `uploads/${userId}/`;

        // Erstelle den Ordner, falls er nicht existiert
        if (!fs.existsSync(userPath)) {
            fs.mkdirSync(userPath, { recursive: true });
        }

        // Setze den benutzerspezifischen Pfad als Ziel
        cb(null, userPath);
    },
    filename: function (req, file, cb) {
        // Erstellt ein eindeutiges Suffix mit der aktuellen Zeit und einer zufälligen Nummer
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        
        // Holt die Dateierweiterung aus dem ursprünglichen Dateinamen
        const fileExtension = path.extname(file.originalname);

        // Setzt den neuen Dateinamen
        // cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
        cb(null, `profileImage-${uniqueSuffix}${fileExtension}`);
      }
})

const upload = multer({ storage: myStorage });

export default [
    upload.single('file'),
    async (req, res) => {

        const path = req.file.path;
        const userId = req.userId; 

        // Pfad in DB speichern
        // try catch eigetnlich noch
        const currentUser = await UserModel.findById(userId);
        currentUser.profileImage = path;
        await currentUser.save();

        res.send(`Datei erfolgreich hochgeladen in ${req.file.path}`)
    }
]