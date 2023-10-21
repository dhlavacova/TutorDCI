import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taksRoutes from "./routes/tasks.routes.js";
import protocolRoutes from "./routes/protocol.routes.js";
import slackRoutes from "./routes/slack.routes.js";
import passwordRoutes from "./routes/password.routes.js";

import multerUpload from './multer.config.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import User from './models/user.model.js'
import { auth } from './middlewares/auth.middleware.js'
import { getUserImage } from "./controllers/image.controller.js";
import { connectMongoose } from './db.js'
import dotenv from 'dotenv';

dotenv.config();
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const app = express();


app.disable('x-powered-by')

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.post('/upload', auth, multerUpload.single('file'), async (req, res) => {

    const path = req.file.path;
    const userId = req.user.id;

    // Pfad in DB speichern
    // try catch eigetnlich noch
    try {
        const currentUser = await User.findById(userId);

        currentUser.profileImage = path;
        await currentUser.save();
    } catch (error) {
        console.log("fehler mit mongo DB", error)
    }



    res.send(`Datei erfolgreich hochgeladen in ${req.file.path}`)
});

app.use('/public', express.static(join(CURRENT_DIR, '../uploads')));


app.use("/api/auth", authRoutes);
app.get("/api/user-image", auth, getUserImage);

app.use("/api", taksRoutes);
app.use("/api/", protocolRoutes);
app.use("/api/", slackRoutes);
app.use("/api/", passwordRoutes);


connectMongoose();
app.listen(process.env.PORT || 5050)
console.log(`server listening on port ${process.env.PORT }`)





//app.use("/", express.static("./frontend"));

// app.get("/*", (req, res) => res.sendFile("/frontend/index.html", { root: process.env.PWD }));


// if (process.env.NODE_ENV === "production") {
//   const path = await import("path");
//   app.use(express.static("client/dist"));

//   app.get("*", (req, res) => {
//     console.log(path.resolve("client", "dist", "index.html") );
//     res.sendFile(path.resolve("client", "dist", "index.html"));

//   });
// }


export default app;
