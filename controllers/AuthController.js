const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { imgUpload } = require("../server");

index = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      return res.status(401).json({ isError: true, err: "Unauthorized" });
    } else {
      return res.status(200).json(authData);
    }
  });
};

register = (req, res) => {
  imgUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ isError: true, err });
    } else {
      const { email, username, password1, password2 } = req.body;
      let avatar;
      User.findOne({ email })
        .then((existedUser) => {
          if (existedUser) {
            return res.status(400).json({
              isError: true,
              err: "Sorry, that email is already taken",
            });
          }

          if (password1 === password2) {
            if (req.file == undefined) {
              avatar = "";
            } else {
              avatar = req.file.filename;
            }
            let newUser = new User({
              email,
              username,
              avatar,
            });
            bcrypt.genSalt(10, (err, salt) => {
              if (err) {
                return res.status(500).json({ isError: true, err });
              }
              bcrypt.hash(password1, salt, (err, hash) => {
                if (err) {
                  return res.status(500).json({ isError: true, err });
                }
                newUser.password = hash;
                newUser
                  .save()
                  .then((savedUser) => {
                    jwt.sign(
                      { user: savedUser },
                      process.env.JWT_KEY,
                      {
                        expiresIn: "1000000s",
                      },
                      (err, token) => {
                        if (err) {
                          return res.status(500).json({ isError: true, err });
                        }
                        return res.status(201).json({
                          token,
                          user: savedUser,
                        });
                      }
                    );
                  })
                  .catch((err) => res.status(500).json({ isError: true, err }));
              });
            });
          } else {
            return res.status(400).json({
              isError: true,
              err: "Your passwords don't match",
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({ isError: true, err });
        });
    }
  });
};

login = function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(500).json({ isError: true, err });
    }

    if (!user) {
      return res.status(400).json({
        isError: true,
        err: "Password and email don`t match",
      });
    }

    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({
          isError: true,
          err: "Password and email don`t match",
        });
      }

      jwt.sign(
        { user },
        process.env.JWT_KEY,
        { expiresIn: "1000000s" },
        (err, token) => {
          if (err) {
            return res.status(500).json({ isError: true, err });
          }
          return res.status(200).json({
            token,
            user,
          });
        }
      );
    });
  })(req, res, next);
};

logout = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      return res.sendStatus(401).json({ isError: true, err });
    } else {
      req.logout();
      return res.status(200).json({ msg: "You are logout" });
    }
  });
};

module.exports = {
  index,
  register,
  login,
  logout,
};
