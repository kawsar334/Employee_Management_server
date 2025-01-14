

const express = require("express");
const route = express.Router();
const { Register, Login, googleLogin, logout, jwtSignin } = require("../controllers/auth");

route.post("/register",Register);
route.post("/login", Login);
route.post("/google", googleLogin);
route.post("/jwt", jwtSignin);
route.post("/logout", logout);


module.exports = route;
