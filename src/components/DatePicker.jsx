import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "../styles/datePicker.css";
import { useState } from "react";
import moment from "moment/moment";
function DatePicker({ date, onDateChange }) {
  const [focused, setFocused] = useState(false);
  const isOutsideRange = (day) => false;
  return (
    <>
      <SingleDatePicker
        date={date ? moment(date) : null}
        onDateChange={(date) => {
          onDateChange(date);
        }}
        focused={focused}
        onFocusChange={({ focused }) => setFocused(focused)}
        id="uniwue"
        numberOfMonths={1}
        isOutsideRange={isOutsideRange}
      />
    </>
  );
}
export default DatePicker;
