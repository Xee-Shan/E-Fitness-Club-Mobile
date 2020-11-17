const mongoose = require("mongoose");

const productSchema = {
  name: String,
  brand: String,
  price: Number,
  quantity: Number,
  description: String,
  category: String,
  imageName: String,
  imagePath: String,
};

const Product = mongoose.model("Product", productSchema);

module.exports.Product = Product;
