import { FC } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function convertUTCToLocalDate(date: Date | null) {
  if (!date) {
    return date;
  }
  date = new Date(date);
  date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return date;
}

function convertLocalToUTCDate(date: Date | null) {
  if (!date) {
    return date;
  }
  date = new Date(date);
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return date;
}

const UTCDatePicker: FC<ReactDatePickerProps> = ({
  startDate,
  endDate,
  selected,
  onChange,
  ...props
}) => {
  return (
    <DatePicker
      startDate={startDate && convertUTCToLocalDate(startDate)}
      endDate={endDate && convertUTCToLocalDate(endDate)}
      selected={selected && convertUTCToLocalDate(selected)}
      onChange={(date, _e) => onChange(convertLocalToUTCDate(date), _e)}
      {...props}
    />
  );
};

export default UTCDatePicker;
