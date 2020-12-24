const express = require("express");
const router = express.Router();
//const multer = require("multer");
//const fs = require("fs");
const { Blog } = require("../models/blogModel");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadImages/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const upload = multer({ storage: storage }); */

//Create Blog
router.post("/create", upload.single("image"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    imageURL: result.secure_url,
    cloudinary_id: result.public_id,
  });
  await blog.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//Get Blog
router.get("/get", async (req, res) => {
  await Blog.find((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//Get Blog by id
router.get("/get/:id", async (req, res) => {
  await Blog.findById(req.params.id).exec((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//Delete Blog by id
router.delete("/delete/:id", async (req, res) => {
  const blog = await Blog.findByIdAndDelete({ _id: req.params.id });
  await cloudinary.uploader.destroy(blog.cloudinary_id);
  return res.send(blog);

  /*  fs.unlink(blog.imagePath, (err) => {
    if (err) console.log(err);
    console.log("file deleted from directory");
  });*/
});

//Update Blog by id
router.put("/update/:id", upload.single("image"), async (req, res) => {
  const blog = await Blog.findByIdAndUpdate({ _id: req.params.id });
  if (req.body.cloudinary_id === "") {
    await cloudinary.uploader.destroy(blog.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);
    (blog.imageURL = result.secure_url),
      (blog.cloudinary_id = result.public_id);
  }
  blog.title = req.body.title;
  blog.content = req.body.content;
  await blog.save();
  return res.send(blog);
});

module.exports = router;
