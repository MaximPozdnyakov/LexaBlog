const jwt = require("jsonwebtoken");

const Comment = require("../models/Comment");

index = (req, res) => {
    Comment.find()
        .then((comments) => res.json(comments))
        .catch((err) => console.log(err));
};

store = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { body } = req.body;
            const authorName = authData.username;
            const authorAvatar = authData.avatar;
            const authorId = authData.id;

            const comment = new Comment({
                body,
                authorName,
                authorAvatar,
                authorId,
            });
            return res.json(comment);
        }
    });
};

module.exports = {
    index,
    store,
};
