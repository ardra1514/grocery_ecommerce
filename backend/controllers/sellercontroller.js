
const jwt = require("jsonwebtoken");


exports.sellerlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.json({ success: false, message: "All fields required" });

        // FIXED: process.env (NOT Process.env)
        if (
            password === process.env.SELLER_PASSWORD &&
            email === process.env.SELLER_EMAIL
        ) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });

            res.cookie("sellertoken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ success: true, message: "logged in" });
        }

        return res.json({
            success: false,
            message: "invalid credentials",
        });
    } catch (error) {
        console.log("Seller Login Error:", error);
        res.json({ success: false, message: "Server Error" });
    }
};

//seller isAuth 

exports.issellerAuth = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: "Server Error" });
    }
};


exports.sellerlogout = async (req, res) => {
    try {
        res.clearCookie("sellertoken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        res.json({ success: false, message: "Server Error" });
    }
};
