var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var addReservationRouter = require("./routes/addReservation");
var getReservationsRouter = require("./routes/getReservations");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/addReservation", addReservationRouter);
app.use("/getReservations", getReservationsRouter);

const mongodb_user = process.env.MONGODB_USER;
const mongodb_pass = process.env.MONGODB_PASS;

mongoose.connect(
  `mongodb+srv://${mongodb_user}:${mongodb_pass}@cluster0.lzcrn.mongodb.net/personal-chef?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to mongodb!");
});

module.exports = app;
