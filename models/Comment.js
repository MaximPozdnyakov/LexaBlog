const mongoose = require("mongoose");
const conn = mongoose.createConnection(process.env.mongoURI, {
  useNewUrlParser: true,
});

// Create Schema
const CommentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  parrentId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorAvatar: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Comment = conn.model("Comment", CommentSchema);
