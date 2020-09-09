const express = require("express");
const {
    index,
    store,
    update,
    destroy,
} = require("../controllers/LikeController");

const router = express.Router();

// @route   GET api/likes
// @desc    Get All likes
// @access  Public
router.get("/", index);

// @route   POST api/likes
// @desc    Create like
// @access  Private
router.post("/", verifyToken, store);

// @route   PATCH api/likes/:id
// @desc    Update like
// @access  Private
router.patch("/:id", verifyToken, update);

// @route   POST api/likes/:id
// @desc    Delete like
// @access  Private
router.delete("/:id", verifyToken, destroy);

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
