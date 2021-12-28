//express
const express = require("express");
const app = express();

//jwt, cookie, others
require("dotenv").config({ path: "./.env" });
const cookieParser = require("cookie-parser");

//cors
const cors = require("cors");
app.use(cookieParser());
app.use(
  cors({
    credentials: true, // important, front end should get the cookie
    origin: ["http://localhost:3000"], // 3000 is for react
  })
);
app.use(express.json());

//mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mern_project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//models
const User = require("./models/user.model");

//routes
const routes = require("./routes/routes");
const table = require("./routes/table");
app.use("/api", routes);
app.use("/table", table);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  // perform a database connection when server starts
  // dbo.connectToServer(function (err) {
  //   if (err) console.error(err);
  // });
  console.log(`Server is running on port: ${port}`);
});
