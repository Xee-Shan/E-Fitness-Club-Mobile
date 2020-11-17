const mongoose = require("mongoose");

const dietPlanSchema = {
  day: String,
  userType: String,
  dietType: String,
  diet: String
//   method: String,
//   imageName: String,
//   imagePath: String,
};

const DietPlan = mongoose.model("DietPlan", dietPlanSchema);

module.exports.DietPlan = DietPlan;
