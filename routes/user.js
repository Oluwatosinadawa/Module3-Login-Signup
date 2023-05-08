const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { authCheck } = require("../middlewares/index");

router.get("/create-post", authCheck, userController.create_post_get);

module.exports = router;
