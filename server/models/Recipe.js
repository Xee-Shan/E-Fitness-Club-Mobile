const mongoose = require("mongoose");

const recipeSchema = {
  name: String,
  tyredients: String,
  descpe: String,
  description: String,
  method: String,
  imageName: String,
  imagePath: String,
};

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports.Recipe = Recipe;
