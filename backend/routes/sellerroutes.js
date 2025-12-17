const express = require("express");
const { sellerlogin, issellerAuth, sellerlogout } = require("../controllers/sellercontroller");
const authSeller = require("../middlewares/authSeller");

const sellerrouter = express.Router();

sellerrouter.post("/login", sellerlogin);
sellerrouter.get("/is-auth", authSeller, issellerAuth);
sellerrouter.get("/logout", sellerlogout);

module.exports = sellerrouter;
