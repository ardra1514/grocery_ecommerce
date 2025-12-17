const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    offerprice: {
      type: Number,
      required: true,
    },

    img: {
      type: [String], // array of image URLs
      required: true,
    },

    category: {
      type: String, // one category per product
      required: true,
    },

    instock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Correct model creation
const Product = mongoose.models.product || mongoose.model("product", productSchema);

module.exports = Product;
