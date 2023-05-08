const jwt = require("jsonwebtoken");
const JWT_SECRET = "cbeucbuebcuececneceicne";
const userSchema = require("../models/users");

const authCheck = async (req, res, next) => {
  try {
    const token = req.cookies.edsa_token;
    if (!token) return res.render("index", { error: "token not provided", isLoggedIn: false, data: [] });
    const decoded = await jwt.verify(token, JWT_SECRET);
    const user = await userSchema.findOne({ _id: decoded.id }, "name email");
    if (!user) return res.render("index", { error: "user not found", isLoggedIn: false, data: [] });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.render("login", { error: error.message, isLoggedIn: false });
  }
};

module.exports = {
  authCheck,
};
