const jwt = require("jsonwebtoken");

const Like = require("../models/Like");

index = (req, res) => {
    Like.find()
        .then((likes) => res.status(200).json(likes))
        .catch((err) => res.status(500).json({ msg: "Server Error" }));
};

store = (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            return res.sendStatus(401).json({ msg: "Unauthorized" });
        } else {
            Like.findOne({ authorId: authData.id })
                .then((existedLike) => {
                    if (existedLike) {
                        return res
                            .status(403)
                            .json({ msg: "You already rated that comment" });
                    }
                    const { attitude, commentId } = req.body;
                    const like = new Like({
                        attitude,
                        commentId,
                        authorId: authData.id,
                    });
                    like.save()
                        .then((savedLike) => res.status(201).json(savedLike))
                        .catch((err) =>
                            res.status(500).json({ msg: "Server Error" })
                        );
                })
                .catch((err) => res.status(500).json({ msg: "Server Error" }));
        }
    });
};

update = (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(401).json({ msg: "Unauthorized" });
        } else {
            Like.findOne(req.params.id)
                .then((existedLike) => {
                    if (!existedLike) {
                        return res
                            .status(400)
                            .json({ err: "Like don't exist" });
                    }
                    if (existedLike.authorId === authData.id) {
                        const { attitude } = req.body;

                        Like.updateOne(req.params.id, {
                            attitude,
                        })
                            .then((updatedLike) => {
                                return res.status(201).json(updatedLike);
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
    });
};

destroy = (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(401).json({ msg: "Unauthorized" });
        } else {
            Like.findOne(req.params.id)
                .then((existedLike) => {
                    if (!existedLike) {
                        return res
                            .status(400)
                            .json({ err: "Like don't exist" });
                    }
                    if (existedLike.authorId === authData.id) {
                        Like.deleteOne(req.params.id)
                            .then((deleteInfo) =>
                                res.status(200).json(deleteInfo)
                            )
                            .catch((err) =>
                                res.status(500).json({ msg: "Server Error" })
                            );
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
