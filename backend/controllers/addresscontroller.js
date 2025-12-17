


//add 
 const Address = require("../models/address");

// ADD ADDRESS
exports.addaddress = async (req, res) => {
  try {
    const userId = req.userId;     // ✅ from auth middleware
    const { address } = req.body;

    if (!address) {
      return res.json({
        success: false,
        message: "Address data missing",
      });
    }

    await Address.create({
      ...address,
      userId,
    });

    return res.json({
      success: true,
      message: "Address added successfully",
    });

  } catch (error) {
    console.log("Add Address Error:", error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};



exports.getaddress = async (req, res) => {
  try {
    const userId = req.userId; // ✅ from token

    const addresses = await Address.find({ userId });

    return res.json({
      success: true,
      addresses,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
