const express = require (`express`);
const Router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user")
const users = require("../models/users");

const mongoose =require("mongoose")

Router.get("/signup", authController.signup_get);
Router.post("/signup", authController.signup_user);

Router.get("/login", authController.login_get);
Router.post("/login", authController.login_post);

Router.get("/profile", userController.profile_get);


module.exports = Router;

console.log("authRouter is working")