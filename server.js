const express = require('express');
const app = express();
const port = 5090;
const path = require("path");
const ejs = require("ejs");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require ("cookie-parser");


const MONGO_URI = "mongodb+srv://oluwamaxwell:M3bTL0AnIO1zkWKx@precluster0.fc7klfn.mongodb.net/linkedin"

app.set ("view engine", "ejs");
app.use (cookieParser());
app.use (express.urlencoded ({extended: true}));
app.use(express.json());
app.use ("/auth", authRouter);
app.use ("/user", userRouter);

app.use ("/", (req, res) =>{
    res.cookie ("new user", "true",{
        maxAge: 10000,
        httpOnly: true,
        expires: new Date ("2025-05-15"),
        path: "/visit",
        secure: true,
    });
    res.render ("create-post")
});

mongoose 
    .connect(MONGO_URI)
    .then(() =>{
        console.log("DB connected")
        app.listen(port, () => console.log(`server listening on port ${port}!`));
    })
    .catch((err) =>{
        console.log(err);
    });




    
