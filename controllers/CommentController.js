const jwt = require("jsonwebtoken");

const Comment = require("../models/Comment");

index = (req, res) => {
  Comment.find()
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ isError: true, err }));
};

store = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(401).json({ isError: true, err });
    } else {
      const {
        body,
        postId,
        parrentId,
        authorName,
        authorId,
        authorAvatar,
      } = req.body;
      console.log("req.body", req.body);

      const comment = new Comment({
        body,
        postId,
        parrentId,
        authorName,
        authorAvatar,
        authorId,
      });
      console.log("comment", comment);
      comment
        .save()
        .then((savedComment) => res.status(201).json(savedComment))
        .catch((err) => res.status(500).json({ isError: true, err }));
    }
  });
};

module.exports = {
  index,
  store,
};
