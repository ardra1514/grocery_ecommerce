// routes/cartroutes.js
const express = require("express");
const authUser = require("../middlewares/authuser");
const { updatecart } = require("../controllers/cartcontroller");

const cartRouter = express.Router();

cartRouter.post("/update", authUser, updatecart);

module.exports = cartRouter;
