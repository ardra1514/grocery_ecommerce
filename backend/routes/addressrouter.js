
const express=require("express");
const authUser = require("../middlewares/authuser");
const { addaddress, getaddress } = require("../controllers/addresscontroller");

const addressrouter=express.Router();
addressrouter.post('/add',authUser,addaddress);
addressrouter.get('/get',authUser,getaddress);


module.exports=addressrouter