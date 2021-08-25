import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { differenceInCalendarDays, parseJSON } from "date-fns";
import axios from "axios";
import "./ReservationCalendar.css";
import ReservationForm from "./ReservationForm";

const currentDate = new Date();
var dateIn3Months = new Date();
dateIn3Months.setMonth(dateIn3Months.getMonth() + 3);
var disabledDates = [currentDate];

function isSameDay(a, b) {
  const parsedA = parseJSON(a);
  const parsedB = parseJSON(b);
  return differenceInCalendarDays(parsedA, parsedB) === 0;
}

function tileDisabled({ date, view }) {
  // Disable tiles in month view only
  if (view === "month") {
    // Check if a date React-Calendar wants to check is on the list of disabled dates
    return disabledDates.find(
      (dDate) => isSameDay(dDate, date) || date.getDay() === 6
    );
  }
}

function ReservationCalendar() {
  const [dateSelected, dateSelectedChange] = useState(new Date());
  const [dateClicked, dateClickedChange] = useState(false);
  const [bookingsLoaded, bookingsLoadedChange] = useState(false);
  const [bookClicked, bookClickedChange] = useState(false);
  const [formattedDateProp, formattedDatePropChange] = useState();
  const [newBooking, newBookingChange] = useState(true);

  useEffect(() => {
    if (newBooking) {
      axios.get("/getReservations").then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          disabledDates.push(res.data[i].date);
        }
        bookingsLoadedChange(true);
      });
      newBookingChange(false);
    }
  }, [newBooking]);

  useEffect(() => {}, [bookingsLoaded]);

  function clickDay(date) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    dateClickedChange(true);
    formattedDatePropChange(`${year}-${month}-${day}`);
  }

  function clickBook() {
    bookClickedChange(true);
  }

  function confirmNewBooking() {
    newBookingChange(true);
  }

  if (bookingsLoaded) {
    return (
      <div>
        <Calendar
          onChange={dateSelectedChange}
          value={dateSelected}
          tileDisabled={tileDisabled}
          minDate={new Date()}
          maxDate={dateIn3Months}
          onClickDay={clickDay}
        />
        {dateClicked ? (
          !bookClicked ? (
            <button className="calendar-book-btn" onClick={clickBook}>
              Book
            </button>
          ) : (
            ""
          )
        ) : (
          <p>Select a Date</p>
        )}
        {bookClicked ? (
          <ReservationForm
            date={formattedDateProp}
            confirmNewBooking={confirmNewBooking}
          />
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default ReservationCalendar;
