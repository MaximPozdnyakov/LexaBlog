const jwt = require("jsonwebtoken");

const Post = require("../models/Post");

const { imgUpload } = require("../server");

index = (req, res) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(500).json({ msg: "Server Error" }));
};

store = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      return res.sendStatus(401).json({ msg: "Unauthorized" });
    } else {
      imgUpload(req, res, (err) => {
        if (err) {
          res.status(500).json({ msg: "Server Error" });
        } else {
          if (req.file == undefined) {
            return res.status(400).json({ err: "You should attach an image" });
          } else {
            const { title, body } = req.body;
            const headerImg = req.file.filename;
            const post = new Post({
              title,
              body,
              headerImg,
              authorName: authData.username,
              authorId: authData.id,
            });
            post
              .save()
              .then((savedPost) => res.status(201).json(savedPost))
              .catch((err) => res.status(500).json({ msg: "Server Error" }));
          }
        }
      });
    }
  });
};

update = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(401).json({ msg: "Unauthorized" });
    } else {
      imgUpload(req, res, (err) => {
        if (err) {
          res.status(500).json({ msg: "Server Error" });
        } else {
          if (req.file == undefined) {
            return res.json({ err: "You should attach an image" });
          } else {
            Post.findOne(req.params.id)
              .then((existedPost) => {
                if (!existedPost) {
                  return res.status(400).json({ err: "Post don't exist" });
                }
                if (existedPost.authorId === authData.id) {
                  const { title, body } = req.body;
                  const headerImg = req.file.filename;

                  Post.updateOne(req.params.id, {
                    title,
                    body,
                    headerImg,
                  })
                    .then((updatedPost) => {
                      return res.status(201).json(updatedPost);
                    })
                    .catch((err) =>
                      res.status(500).json({ msg: "Server Error" })
                    );
                } else {
                  return res.status(403).json({ msg: "Forbidden" });
                }
              })
              .catch((err) => res.status(500).json({ msg: "Server Error" }));
          }
        }
      });
    }
  });
};

destroy = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(401).json({ msg: "Unauthorized" });
    } else {
      Post.findOne(req.params.id)
        .then((existedPost) => {
          if (!existedPost) {
            return res.status(400).json({ err: "Post don't exist" });
          }
          if (existedPost.authorId === authData.id) {
            Post.deleteOne(req.params.id)
              .then((deleteInfo) => res.status(200).json(deleteInfo))
              .catch((err) => res.status(500).json({ msg: "Server Error" }));
          } else {
            return res.status(403).json({ err: "Forbidden" });
          }
        })
        .catch((err) => res.status(500).json({ msg: "Server Error" }));
    }
  });
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
