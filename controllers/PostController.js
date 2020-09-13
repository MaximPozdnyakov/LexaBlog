const jwt = require("jsonwebtoken");

const Post = require("../models/Post");

const { imgUpload } = require("../server");

index = (req, res) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(500).json({ isError: true, err }));
};

store = (req, res) => {
  imgUpload(req, res, (err) => {
    if (err) {
      res.status(400).json({ isError: true, err });
    } else {
      jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
          return res.status(401).json({ isError: true, err: "Unauthorized" });
        } else {
          if (req.file == undefined) {
            return res
              .status(400)
              .json({ isError: true, err: "You should attach an image" });
          } else {
            const { title, body } = req.body;
            const headerImg = req.file.filename;
            const post = new Post({
              title,
              body,
              headerImg,
              authorName: authData.user.username,
              authorId: authData.user._id,
            });
            post
              .save()
              .then((savedPost) => res.status(201).json(savedPost))
              .catch((err) => res.status(500).json({ isError: true, err }));
          }
        }
      });
    }
  });
};

update = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(401).json({ isError: true, err });
    } else {
      imgUpload(req, res, (err) => {
        if (err) {
          res.status(400).json({ isError: true, err });
        } else {
          if (req.file == undefined) {
            return res.json({
              isError: true,
              err: "You should attach an image",
            });
          } else {
            Post.findOne({ _id: req.params.id })
              .then((existedPost) => {
                if (!existedPost) {
                  return res
                    .status(400)
                    .json({ isError: true, err: "Post don't exist" });
                }
                if (existedPost.authorId === authData.user._id) {
                  const { title, body } = req.body;
                  const headerImg = req.file.filename;

                  Post.updateOne(
                    { _id: req.params.id },
                    {
                      title,
                      body,
                      headerImg,
                    }
                  )
                    .then((updateInfo) => {
                      return res.status(201).json({
                        _id: req.params.id,
                        authorId: existedPost.authorId,
                        authorName: existedPost.authorName,
                        title,
                        body,
                        headerImg,
                        created_at: existedPost.created_at,
                      });
                    })
                    .catch((err) =>
                      res.status(500).json({ isError: true, err })
                    );
                } else {
                  return res
                    .status(403)
                    .json({ isError: true, err: "Forbidden" });
                }
              })
              .catch((err) => res.status(500).json({ isError: true, err }));
          }
        }
      });
    }
  });
};

destroy = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(401).json({ isError: true, err });
    } else {
      Post.findOne({ _id: req.params.id })
        .then((existedPost) => {
          if (!existedPost) {
            return res
              .status(400)
              .json({ isError: true, err: "Post don't exist" });
          }
          if (existedPost.authorId === authData.user._id) {
            Post.deleteOne({ _id: req.params.id })
              .then((deleteInfo) => res.status(200).json(deleteInfo))
              .catch((err) => res.status(500).json({ isError: true, err }));
          } else {
            return res.status(403).json({ err: "Forbidden" });
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
