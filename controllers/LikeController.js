const jwt = require("jsonwebtoken");

const Like = require("../models/Like");

index = (req, res) => {
  Like.find()
    .then((likes) => res.status(200).json(likes))
    .catch((err) => res.status(500).json({ isError: true, err }));
};

store = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      return res.sendStatus(401).json({ isError: true, err });
    } else {
      Like.findOne({ authorId: authData.user.id })
        .then((existedLike) => {
          if (existedLike) {
            return res
              .status(403)
              .json({ isError: true, err: "You already rated that comment" });
          }
          const { attitude, commentId } = req.body;
          const like = new Like({
            attitude,
            commentId,
            authorId: authData.user.id,
          });
          like
            .save()
            .then((savedLike) => res.status(201).json(savedLike))
            .catch((err) => res.status(500).json({ isError: true, err }));
        })
        .catch((err) => res.status(500).json({ isError: true, err }));
    }
  });
};

update = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(401).json({ isError: true, err });
    } else {
      Like.findOne(req.params.id)
        .then((existedLike) => {
          if (!existedLike) {
            return res
              .status(400)
              .json({ isError: true, err: "Like don't exist" });
          }
          if (existedLike.authorId === authData.user.id) {
            const { attitude } = req.body;

            Like.updateOne(req.params.id, {
              attitude,
            })
              .then((updatedLike) => {
                return res.status(201).json(updatedLike);
              })
              .catch((err) => res.status(500).json({ isError: true, err }));
          } else {
            return res.status(403).json({ isError: true, err: "Forbidden" });
          }
        })
        .catch((err) => res.status(500).json({ isError: true, err }));
    }
  });
};

destroy = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(401).json({ isError: true, err });
    } else {
      Like.findOne(req.params.id)
        .then((existedLike) => {
          if (!existedLike) {
            return res
              .status(400)
              .json({ isError: true, err: "Like don't exist" });
          }
          if (existedLike.authorId === authData.user.id) {
            Like.deleteOne(req.params.id)
              .then((deleteInfo) => res.status(200).json(deleteInfo))
              .catch((err) => res.status(500).json({ isError: true, err }));
          } else {
            return res.status(403).json({ isError: true, err: "Forbidden" });
          }
        })
        .catch((err) => res.status(500).json({ isError: true, err }));
    }
  });
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
