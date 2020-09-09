const jwt = require("jsonwebtoken");

const Comment = require("../models/Comment");

index = (req, res) => {
    Comment.find()
        .then((comments) => res.status(200).json(comments))
        .catch((err) => res.status(500).json({ msg: "Server Error" }));
};

store = (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(401).json({ msg: "Unauthorized" });
        } else {
            const { body, postId, parrentId } = req.body;
            const authorName = authData.username;
            const authorAvatar = authData.avatar;
            const authorId = authData.id;

            const comment = new Comment({
                body,
                postId,
                parrentId,
                authorName,
                authorAvatar,
                authorId,
            });
            comment
                .save()
                .then((savedComment) => res.status(201).json(savedComment))
                .catch((err) => res.status(500).json({ msg: "Server Error" }));
        }
    });
};

module.exports = {
    index,
    store,
};
