const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
               secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            message: "Registration Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Register Error:", error);
        res.json({ success: false, message: "Server Error" });
    }
};


//login

exports.login=async(req,res)=>{

        try {
            

                const{email,password}=req.body

                if(!email||!password)
                      return res.json({ success: false, message: "All fields required" });
                      const user=await User.findOne({email})
                      if(!user){   
                          return res.json({ success: false, message: "invalied" });
                }
                      

                const ismatch =await bcrypt.compare(password,user.password)
                if(!ismatch){
                          return res.json({ success: false, message: "invalied" });

                }

                 const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }  
        );


        
        res.cookie("token", token, {
            httpOnly: true,
               secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            message: "Registration Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });




        } catch (error) {
             console.log("Register Error:", error);
        res.json({ success: false, message: "Server Error" });
        }




}

//check auth

exports.isAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        return res.json({
            success: true,
            user
        });
    } catch (error) {
        console.log("isAuth Error:", error);
        res.json({ success: false, message: "Server Error" });
    }
};


exports.logout = async (req, res) => {
    try {

        // Remove token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        console.log("Logout Error:", error);
        return res.json({
            success: false,
            message: "Server Error"
        });
    }
};
