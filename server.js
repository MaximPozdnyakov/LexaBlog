const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const cookieSession = require("cookie-session");
const multer = require("multer");
const path = require("path");

const { storage } = require("./config/multer");

dotenv.config({ path: "./config/env/config.env" });

const app = express();

// Passport Config
require("./config/passport")(passport);

// Session
app.use(
    cookieSession({
        name: "session",
        secret: "secret",
    })
);

// Session Age
app.use(function (req, res, next) {
    req.sessionOptions.maxAge = 30 * 24 * 60 * 60 * 1000;
    next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Bodyparser middleware
app.use(express.json());

// Apply routes
const auth = require("./routes/auth");
const posts = require("./routes/posts");

// Use routes
app.use("/api/auth", auth);
app.use("/api/posts", posts);

// Connect to mongo
mongoose
    .connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

const port = process.env.PORT || 8000;

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
