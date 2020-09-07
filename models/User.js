const mongoose = require("mongoose");

// Create Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default:
            "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png",
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model("Users", UserSchema);
