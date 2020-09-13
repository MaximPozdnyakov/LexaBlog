const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const cookieSession = require("cookie-session");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config({ path: "./config/env/config.env" });

const app = express();

app.use(cors());

// Init gfs
let gfs;

// Passport Config
require("./config/passport")(passport);

// Session
app.use(
  cookieSession({
    name: "session",
    secret: "secret",
  })
);

// Session Age
app.use(function (req, res, next) {
  req.sessionOptions.maxAge = 30 * 24 * 60 * 60 * 1000;
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

// Create mongo connection
const conn = mongoose.createConnection(process.env.mongoURI, {
  useNewUrlParser: true,
});

// Connect to mongo
conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("MongoDB connected");
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

// Init Upload
const imgUpload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("img");

// Check File Type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Your file should be an image");
  }
}

module.exports = {
  imgUpload,
};

// Apply routes
const auth = require("./routes/auth");
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const likes = require("./routes/likes");

// Use routes
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/comments", comments);
app.use("/api/likes", likes);

// @route GET /image/:filename
// @desc Display Image
app.get("/api/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});

const port = process.env.PORT || 8000;

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
