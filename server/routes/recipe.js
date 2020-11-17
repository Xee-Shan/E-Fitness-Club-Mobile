const express = require("express");
const { Recipe } = require("../models/Recipe");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
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

const upload = multer({ storage: storage });

//create product
router.post("/create", upload.single("image"), async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    type: req.body.type,
    ingredients: req.body.ingredients,
    method: req.body.method,
    description: req.body.description,
    imageName: req.file.originalname,
    imagePath: req.file.path,
  });
  await recipe.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//get product
router.get("/get", async (req, res) => {
  const recipe = await Recipe.find((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//delete product
router.delete("/delete/:id", async (req, res) => {
  const recipe = await Recipe.findByIdAndDelete({ _id: req.params.id });
  fs.unlink(recipe.imagePath, (err) => {
    if (err) console.log(err);
    console.log("file deleted from directory");
  });
});

//update product
router.put("/update/:id", async (req, res) => {
  const recipe = await Recipe.findByIdAndUpdate({ _id: req.params.id });
  recipe.name = req.body.name;
  recipe.type = req.body.type;
  recipe.ingredients = req.body.ingredients;
  recipe.method = req.body.method;
  recipe.description = req.body.description;

  await recipe.save();
});

module.exports = router;
