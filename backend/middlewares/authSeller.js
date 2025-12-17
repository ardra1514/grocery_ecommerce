const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const { sellertoken } = req.cookies;

        if (!sellertoken)
            return res.json({ success: false, message: "Not authorised" });

        const decoded = jwt.verify(sellertoken, process.env.JWT_SECRET);

        req.email = decoded.email;

        next();
    } catch (error) {
        res.json({ success: false, message: "Invalid token" });
    }
};

