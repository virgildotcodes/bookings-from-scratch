const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: String,
  seats: Number,
  address: String,
  allergies: String,
  date: Date,
  time: String,
});

module.exports = mongoose.model("Reservation", reservationSchema);
