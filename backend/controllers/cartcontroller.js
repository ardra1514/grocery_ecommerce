// controllers/cartcontroller.js
const User = require("../models/user");

exports.updatecart = async (req, res) => {
  try {
    const { cartitems } = req.body;
    const userId = req.userId; // ✅ from middleware

    await User.findByIdAndUpdate(userId, { cartitems });

    res.json({
      success: true,
      message: "Cart updated",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
