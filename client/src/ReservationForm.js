import { useState } from "react";
import "./ReservationCalendar.css";
import axios from "axios";

function ReservationForm(props) {
  const [formData, formDataChange] = useState({
    name: "",
    seats: 2,
    address: "",
    allergies: "",
    date: props.date,
    time: "20:00",
  });
  const [bookingConfirmed, bookingConfirmedChange] = useState(false);

  function formChange(e) {
    const value = e.target.value;
    const fieldName = e.target.name;
    formDataChange({ ...formData, [fieldName]: value });
  }

  function handleSubmit(e) {
    axios
      .post("/addReservation", formData)
      .then(function () {
        props.confirmNewBooking();
        bookingConfirmedChange(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    e.preventDefault();
  }

  return (
    <div className="reservation-form-container">
      {!bookingConfirmed ? (
        <form className="reservation-form" onSubmit={handleSubmit}>
          <label className="reservation-label">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={formChange}
              required
            />
          </label>
          <label className="reservation-label">
            Seats:
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={formChange}
              required
            />
          </label>
          <label className="reservation-label">
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={formChange}
              required
            />
          </label>
          <label className="reservation-label">
            Allergies:
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={formChange}
            />
          </label>
          <label className="reservation-label">
            Date:
            <input type="date" name="date" value={props.date} readOnly />
          </label>
          <label className="reservation-label">
            Time:
            <input
              type="time"
              name="time"
              min="16:30"
              max="20:30"
              value={formData.time}
              onChange={formChange}
              required
            />
          </label>
          <input
            className="calendar-book-btn"
            type="submit"
            value="Submit Booking"
          />
        </form>
      ) : (
        <h1>Booking Confirmed!</h1>
      )}
    </div>
  );
}

export default ReservationForm;
