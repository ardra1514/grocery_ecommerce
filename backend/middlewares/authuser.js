const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ success: false, message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ correct
    next();

  } catch (error) {
    return res.json({ success: false, message: "Invalid token" });
  }
};

module.exports = authUser;
