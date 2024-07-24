import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "../styles/datePicker.css";
import { useState } from "react";
function DatePicker({ date, onDateChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <SingleDatePicker
        date={date}
        onDateChange={(date) => {
          onDateChange(date);
        }}
        focused={focused}
        onFocusChange={({ focused }) => setFocused(focused)}
        id="uniwue"
        numberOfMonths={1}
      />
    </>
  );
}
export default DatePicker;
