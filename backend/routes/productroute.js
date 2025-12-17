const express = require("express");
const { upload } = require("../config/multer");
const { addproduct, productlist, productbyId, changestock } = require("../controllers/productcontroller");
const authSeller = require("../middlewares/authSeller");

const productrouter = express.Router();

// Add product (seller only)
productrouter.post(
  "/add",
  authSeller,
  upload.array("images", 4), // field name must match React FormData
  addproduct
);

// Get all products
productrouter.get("/list", productlist);

// Get single product by ID
productrouter.get("/:id", productbyId);

// Change stock (seller only)
productrouter.post("/stock", authSeller, changestock);

module.exports = productrouter;
