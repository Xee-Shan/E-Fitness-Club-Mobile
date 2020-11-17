const express = require("express");
const { Product } = require("../models/productModel");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const auth=require("../middleware/auth");
const admin=require("../middleware/admin");

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
router.post("/create", upload.single("image"), auth,admin,async (req, res) => {
  console.log(req.file);
  const product = new Product({
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
    category: req.body.category,
    imageName: req.file.originalname,
    imagePath: req.file.path,
  });
  await product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//get product
router.get("/get",auth, async (req, res) => {

   await Product.find((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
  
});
//get by Id
router.get("/get/:id", async (req, res) => {
    await Product.findById(req.params.id).exec((err,doc)=>{
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//delete product
router.delete("/delete/:id",auth,admin, async (req, res) => {
  const product = await Product.findByIdAndDelete({ _id: req.params.id });
  fs.unlink(product.imagePath, (err) => {
    if (err) console.log(err);
    console.log("file deleted from directory");
  });
});

//update product
router.put("/update/:id",auth,admin, async (req, res) => {
  
  const product = await Product.findByIdAndUpdate({ _id: req.params.id });
  product.name = req.body.name;
  product.brand = req.body.brand;
  product.category = req.body.category;
  product.price = req.body.price;
  product.quantity = req.body.quantity;
  product.description = req.body.description;

  await product.save();
});


module.exports = router;
