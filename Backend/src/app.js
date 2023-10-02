import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taksRoutes from "./routes/tasks.routes.js";
import protocolRoutes from "./routes/protocol.routes.js";
import slackRoutes from "./routes/slack.routes.js";
import passwordRoutes from "./routes/password.routes.js";



const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", taksRoutes);
app.use("/api/", protocolRoutes);
app.use("/api/", slackRoutes);
app.use("/api/", passwordRoutes);





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
