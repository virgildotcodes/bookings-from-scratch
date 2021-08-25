var express = require("express");
var router = express.Router();
const Reservation = require("../models/Reservation");

/* GET home page. */
router.post("/", async (req, res, next) => {
  const newReservation = new Reservation({
    name: req.body.name,
    seats: req.body.seats,
    address: req.body.address,
    allergies: req.body.allergies,
    date: req.body.date,
    time: req.body.time,
  });

  await newReservation.save(function (err) {
    if (err) console.log(err);
  });
  res.send("Reservation added!");
  console.log("Reservation added!");
});

module.exports = router;
