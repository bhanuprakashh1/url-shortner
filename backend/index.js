import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import connectDB from "./src/config/mongoDb.config.js"
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"

import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";

const app = express();

dotenv.config("./.env")

const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true  // this allows cookies to be sent
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/user", user_routes)
app.use("/api/auth", auth_routes)
app.use("/api/create", short_url)
app.get("/:id", redirectFromShortUrl)

app.use(errorHandler)

connectDB().then(() => {   // This will first connect to database then server will run
    app.listen(port, () => {
        console.log("Server is running on http://localhost:3000");
    })
})

