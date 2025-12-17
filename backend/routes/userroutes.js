const express = require("express");
const { register, login, isAuth, logout } = require("../controllers/Usercontroller");
const authUser = require("../middlewares/authuser");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth",authUser, isAuth);
userRouter.get("/logout",authUser, logout);




console.log("LOADING USER ROUTER FILE..."); 

module.exports = userRouter;
