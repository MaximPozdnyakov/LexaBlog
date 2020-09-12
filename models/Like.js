const mongoose = require("mongoose");
const conn = mongoose.createConnection(process.env.mongoURI, {
  useNewUrlParser: true,
});

// Create Schema
const CommentSchema = new mongoose.Schema({
  attitude: {
    type: Boolean,
    required: true,
  },
  commentId: {
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

module.exports = Comment = conn.model("Comments", CommentSchema);
