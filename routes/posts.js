const express = require("express");
const {
    index,
    store,
    update,
    destroy,
} = require("../controllers/PostController");

const router = express.Router();

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
router.get("/", index);

// @route   POST api/posts/store
// @desc    Create post
// @access  Private
router.post("store", verifyToken, store);

// @route   PATCH api/posts/update
// @desc    Update post
// @access  Private
router.patch("/:id", verifyToken, update);

// @route   POST api/posts/store
// @desc    Delete post
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
