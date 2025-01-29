

const express = require("express");
const route = express.Router();
const { Register, Login, googleLogin, logout, jwtSignin } = require("../controllers/auth");
const User = require("../models/user");

route.post("/register",Register);
route.post("/login", Login);
route.post("/google", googleLogin);
route.get("/jwt", jwtSignin);
route.post("/logout", logout); 
module.exports = route;
