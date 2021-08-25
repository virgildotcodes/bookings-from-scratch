var express = require("express");
var router = express.Router();
const Reservation = require("../models/Reservation");

router.get("/", async (req, res) => {
  const reservations = await Reservation.find();
  res.json(reservations);
});

module.exports = router;
