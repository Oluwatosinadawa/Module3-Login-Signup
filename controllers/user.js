const userSchema = require ("../models/users")

const profile_get = async (req, res) => {
    try {
        console.log(req.user);
        res.render ("profile");
    } catch (error) {
        console.log (error);
    }
};
// module.exports = {
    // profile_get
// };
// const userSchema = require("../models/users");

const create_post_get = async (req, res, next) => {
  const { _id } = req.user;
  res.render("create-post", { error: "", isLoggedIn: _id ? true : false });
};
module.exports = {
    profile_get,
  create_post_get,
};


