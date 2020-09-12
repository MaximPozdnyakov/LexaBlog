const mongoose = require("mongoose");
const conn = mongoose.createConnection(process.env.mongoURI, {
  useNewUrlParser: true,
});

// Create Schema
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  headerImg: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = conn.model("Posts", PostSchema);
