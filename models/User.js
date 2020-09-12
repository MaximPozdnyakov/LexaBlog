const mongoose = require("mongoose");
const conn = mongoose.createConnection(process.env.mongoURI, {
  useNewUrlParser: true,
});

// Create Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
    validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    // password between 7 to 16 characters which contain only characters,
    // numeric digits, underscore and first character must be a letter
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = conn.model("User", UserSchema);
