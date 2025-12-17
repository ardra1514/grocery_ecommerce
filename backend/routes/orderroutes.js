const express = require("express");
const authUser = require("../middlewares/authuser");
const authSeller = require("../middlewares/authSeller");
const {
  placeordercod,
  placeorderstripe,
  getuserorder,
  getallorders,
} = require("../controllers/ordercontroller");

const orderRouter = express.Router();

// USER ROUTES
orderRouter.post("/cod", authUser, placeordercod);
orderRouter.post("/stripe", authUser, placeorderstripe); // ✅ FIXED
orderRouter.get("/user", authUser, getuserorder);

// SELLER / ADMIN ROUTES
orderRouter.get("/seller", authSeller, getallorders);

module.exports = orderRouter;
