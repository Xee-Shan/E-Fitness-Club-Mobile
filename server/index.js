const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("Mongodb connection established");
  }
);

app.use("/users", require("./routes/userRouter"));
app.use("/products", require("./routes/productRouter"));
app.use("/trainings", require("./routes/trainingRouter"));
app.use("/blogs", require("./routes/blogRouter"));
app.use("/orders", require("./routes/orderRouter"));
