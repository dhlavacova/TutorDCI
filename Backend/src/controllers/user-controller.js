import fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';
import UserModel from "../models/user.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getUserImage = async (req, res) => {
    // hole userID
    const userId = req.userId; // von isAuth middleware gesetzt, die "vorangeschaltet" ist in der upload route

  
    // Finde den Pfad in der MongoDB, basierend auf dem Benutzernamen
    const currentUser = await UserModel.findById(userId);

    if(!currentUser) {
        res.status(404).send('Nutzer nicht gefunden');
        return;
    }

  
    // Hole den Pfad aus der Datenbank
    const imagePath = currentUser.profileImage;

    // Überprüfe, ob die Datei existiert
    if (fs.existsSync(imagePath)) {
        // Sende die Datei
        console.log("__dirname:", __dirname)
        return res.sendFile(path.join(__dirname, "/..", imagePath));
    } else {
        return res.sendFile(path.join(__dirname, "/..", "assets", "placeholder-profile-img.jpeg"));

    }
  
  
}



  
//   Du kannst den oben erstellten Controller zur Route  hinzufügen
//  und die Route dann vom Client aus aufrufen, indem du den Pfad zur img-Quelle setzt:
//   <img src="/user-image" alt="Profilbild" />

//   Wenn der Benutzer auf die Seite zugreift, wird der Browser automatisch eine Anfrage 
// an die /user-image-Route senden, und der Server wird das Bild als Antwort senden.
    
  
  
  
//  Folgende Vorgehensweise ist unpraktisch, wenn die Bilder einem bestimmten
//  Nutzer-Account zugeordnet werden  und nicht öffentlich einsehbar sein sollen
  
//  app.use("/uploads",express.static(path.join(__dirname, 'uploads')));
//  => Somit wären alle Fotos öffentlich und könnten über den Browser abgerufen werden

//  Genauer: 
//   app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
//   stellt den gesamten uploads-Ordner als öffentlich zugänglich dar. Das bedeutet, dass jeder, der den genauen Pfad zu einer Datei in diesem Ordner kennt, darauf zugreifen kann, indem er die URL direkt in den Browser eingibt.
  
//   In einem Szenario, in dem du Bilder oder andere Dateien speicherst, die nur für bestimmte Benutzer oder Rollen zugänglich sein sollen, wäre diese Methode nicht sicher. Jeder, der den genauen Pfad kennt oder erraten kann, hätte Zugriff auf die Datei, unabhängig von seinen Berechtigungen.
  
//   Wenn du sicherstellen möchtest, dass nur authentifizierte Benutzer auf ihre eigenen Bilder zugreifen können, solltest du stattdessen eine Route mit Authentifizierung verwenden, wie im vorherigen Beispiel gezeigt. Auf diese Weise kannst du die Anfrage überprüfen, um sicherzustellen, dass der Benutzer die richtigen Berechtigungen hat, bevor du die Datei sendest.
  
//   Das Hinzufügen einer Authentifizierungsmiddleware zu der Route könnte so aussehen:
  
//   app.get('/user-image', isAuth, getUserImage);
//   Hier wäre isAuthenticated eine Middleware-Funktion, die überprüft, ob der Benutzer angemeldet ist, und gegebenenfalls weitere Berechtigungsprüfungen durchführt.
  
//   Das Verwenden von express.static für den uploads-Ordner wäre in einem Szenario sinnvoll, in dem alle Dateien in diesem Ordner öffentlich zugänglich sein sollen, wie z.B. bei öffentlichen Bildern, Skripten oder Stylesheets. In deinem Fall, wo du den Zugriff auf Benutzerbilder kontrollieren möchtest, wäre es nicht die beste Wahl.
  
  
  
  
  
  