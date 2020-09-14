const express = require("express");
const { index, store } = require("../controllers/CommentController");

const router = express.Router();

// @route   GET api/comments
// @desc    Get All comments
// @access  Public
router.get("/", index);

// @route   POST api/comments/
// @desc    Create comment
// @access  Private
router.post("/", verifyToken, store);

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
