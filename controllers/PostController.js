const jwt = require("jsonwebtoken");

const Post = require("../models/Post");

const { imgUpload } = require("../config/multer");

index = (req, res) => {
    Post.find()
        .then((posts) => res.json(posts))
        .catch((err) => console.log(err));
};

store = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            imgUpload(req, res, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    if (req.file == undefined) {
                        return res.json({ err: "You should attach image" });
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
                        return res.json(post);
                    }
                }
            });
        }
    });
};

update = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            imgUpload(req, res, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    if (req.file == undefined) {
                        return res.json({ err: "You should attach image" });
                    } else {
                        const existedPost = Post.findOne(req.params.id);
                        if (!existedPost) {
                            return res
                                .status(400)
                                .json({ err: "Post don't exist" });
                        }
                        if (existedPost.authorId === authData.id) {
                            const { title, body } = req.body;
                            const headerImg = req.file.filename;

                            Post.updateOne(req.params.id, {
                                title,
                                body,
                                headerImg,
                            })
                                .then((newPost) => {
                                    return res.json(newPost);
                                })
                                .catch((err) => console.log(err));
                        } else {
                            return res.status(400).json({ err: "Forbidden" });
                        }
                    }
                }
            });
        }
    });
};

destroy = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const existedPost = Post.findOne(req.params.id);
            if (!existedPost) {
                return res.status(400).json({ err: "Post don't exist" });
            }
            if (existedPost.authorId === authData.id) {
                Post.deleteOne(req.params.id)
                    .then((deleteInfo) => res.json(deleteInfo))
                    .catch((err) => console.log(err));
            } else {
                return res.status(400).json({ err: "Forbidden" });
            }
        }
    });
};

module.exports = {
    index,
    store,
    update,
    destroy,
};
