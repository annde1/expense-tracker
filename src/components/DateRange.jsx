import { DateRangePicker } from "react-dates";
import { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

function DateRange({ onDateRangeChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    onDateRangeChange(startDate, endDate);
  };

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="start_date_id"
      endDate={endDate}
      endDateId="end_date_id"
      onDatesChange={handleDatesChange}
      focusedInput={focusedInput}
      onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      numberOfMonths={1}
      isOutsideRange={() => false}
    />
  );
}

export default DateRange;
