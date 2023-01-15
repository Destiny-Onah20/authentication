const express = require("express");
const { signUp } = require("../controllers/userContrl");

const userRoute = express.Router();

userRoute.route("/user").post(signUp);

module.exports = userRoute;