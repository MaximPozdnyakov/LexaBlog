const express = require("express");
const {
    index,
    register,
    login,
    logout,
} = require("../controllers/AuthController");

const router = express.Router();

// @route   GET api/auth
// @desc    Get Entered User
// @access  Private
router.get("/", verifyToken, index);

// @route   POST api/auth
// @desc    Register new user
// @access  Public
router.post("/", register);

// @route   POST api/auth/login
// @desc    Login new user
// @access  Public
router.post("/login", login);

// @route   POST api/auth/logout
// @desc    Logout new user
// @access  Private
router.post("/logout", verifyToken, logout);

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;
