const mongoose = require("mongoose");

const orderschema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    items: [
      {
        name: String,
        image: String,      // ✅ MUST EXIST
        price: Number,
        quantity: Number,
      },
    ],

    amount: Number,
    address: mongoose.Schema.Types.ObjectId,
    paymenttype: String,
    ispaid: Boolean,
    status: { type: String, default: "Order Placed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderschema);
