const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { Training } = require("../models/trainingModel");

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

//Create Training Program
router.post("/create", upload.single("image"), async (req, res) => {
  const training = new Training({
    programId: req.body.programId,
    title: req.body.title,
    targetArea: req.body.targetArea,
    equipment: req.body.equipment,
    description: req.body.description,
    imageName: req.file.originalname,
    imagePath: req.file.path,
  });
  await training.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//Get Traning Program
router.get("/get", async (req, res) => {
  const training = await Training.find((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//Get Training Program by id
router.get("/get/:id", async (req, res) => {
  await Training.findById(req.params.id).exec((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//Delete Training Program
router.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  const training = await Training.findByIdAndDelete({ _id: req.params.id });
  fs.unlink(training.imagePath, (err) => {
    if (err) console.log(err);
    console.log("file deleted from directory");
  });
});

//Update Training Program
router.put("/update/:id", async (req, res) => {
  const training = await Training.findByIdAndUpdate({ _id: req.params.id });
  training.programId = req.body.programId;
  training.title = req.body.title;
  training.targetArea = req.body.targetArea;
  training.equipment = req.body.equipment;
  training.description = req.body.description;
  await training.save();
  return res.send(training);
});

//Add Program Details
router.post("/add/detail/:id", async (req, res) => {
  const training = await Training.findById(req.params.id);
  let detail = [];
  req.body.map((data) => {
    detail.push(data);
  });
  training.exercise = detail;
  await training.save((err) => {
    if (err) res.status(400).send(err);
  });
});

//Get Program Details
router.get("/get/detail", async (req, res) => {
  const training = await Training.find((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//Update Program Schedule
router.put("/edit/schedule/:id/:index", async (req, res) => {
  const training = await Training.findByIdAndUpdate({ _id: req.params.id });
  training.exercise[req.params.index] = req.body;
  training.markModified("exercise");
  await training.save();
});

//Add Workout List
router.post("/add/workout/detail/:id", async (req, res) => {
  const training = await Training.findById(req.params.id);
  let detail = [];
  req.body.map((data) => {
    detail.push(data);
  });
  training.workoutList = detail;
  await training.save((err) => {
    if (err) res.status(400).send(err);
  });
});

//Get Workout List
router.get("/get/workout/detail", async (req, res) => {
  const training = await Training.find((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//Update Program Workout
router.put("/edit/workout/:id/:index", async (req, res) => {
  const training = await Training.findByIdAndUpdate({ _id: req.params.id });
  training.workoutList[req.params.index] = req.body;
  training.markModified("workoutList");
  await training.save();
});

module.exports = router;
