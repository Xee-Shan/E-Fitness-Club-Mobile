const {User}=require("../models/userModel");

const admin = async (req, res, next) => {
  const user=await User.findById(req.user);
  if (user.role != "admin")
    return res.status(403).send("You are not authorized.");
  next();
};

module.exports = admin;
