const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { imgUpload } = require("../config/multer");

index = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.json({ err: "Forbidden" });
        } else {
            res.json(authData);
        }
    });
};

register = (req, res) => {
    try {
        const { email, username, password1, password2 } = req.body;
        let avatar;

        User.findOne({ email })
            .then((doc) => {
                if (doc)
                    return res.json({
                        err: "Sorry, that email is already taken",
                    });
                if (password1 === password2) {
                    imgUpload(req, res, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (req.file == undefined) {
                                avatar = "";
                            } else {
                                avatar = req.file.filename;

                                const newUser = new User({
                                    email,
                                    username,
                                    avatar,
                                    password: password1,
                                });
                                bcrypt.genSalt(10, (err, salt) => {
                                    bcrypt.hash(
                                        newUser.password,
                                        salt,
                                        (err, hash) => {
                                            if (err) throw err;
                                            newUser.password = hash;
                                            newUser
                                                .save()
                                                .then((data) => {
                                                    jwt.sign(
                                                        { user: data },
                                                        "secretkey",
                                                        {
                                                            expiresIn:
                                                                "1000000s",
                                                        },
                                                        (err, token) => {
                                                            res.json({
                                                                token,
                                                                user: data,
                                                            });
                                                        }
                                                    );
                                                })
                                                .catch((err) =>
                                                    console.log(err)
                                                );
                                        }
                                    );
                                });
                            }
                        }
                    });
                } else {
                    return res
                        .status(400)
                        .json({ err: "Your passwords don't match" });
                }
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: "Bad request" });
    }
};

// Login
login = function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return res.json({
                err: "Password and email don`t match",
            });
        }

        if (!user) {
            return res.json({
                err: "Password and email don`t match",
            });
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.json({
                    err: "Password and email don`t match",
                });
            }

            jwt.sign(
                { user },
                "secretkey",
                { expiresIn: "1000000s" },
                (err, token) => {
                    res.json({
                        token,
                        user,
                    });
                }
            );
        });
    })(req, res, next);
};

// Logout
logout = (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            req.logout();
            return res.json({ err: "You are logout" });
        }
    });
};

module.exports = {
    index,
    register,
    login,
    logout,
};
