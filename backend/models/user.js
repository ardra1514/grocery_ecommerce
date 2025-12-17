const mongoose = require("mongoose");

const userschema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    cartitems: { type: Object, default: {} }

}, { minimize: false });

const User = mongoose.models.user || mongoose.model("user", userschema);

module.exports = User;
