import { Controller, useFormContext } from "react-hook-form";
import UTCDatePicker from "../utils/UTCDatePicker";
import classes from "../Form.module.scss";

interface FormDatePickerProps {
  label: string;
  id: string;
  error?: string;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  id,
  error,
}) => {
  const { control } = useFormContext();
  return (
    <>
      <label htmlFor={id}>{label} :</label>
      <Controller
        control={control}
        name={id}
        render={({ field: { onChange, value } }) => (
          <>
            {error && (
              <p className={classes.Form__error} role="alert">
                {error}
              </p>
            )}
            <UTCDatePicker
              id={id}
              placeholderText={`Select ${label.toLowerCase()}`}
              className={classes.Form__input}
              wrapperClassName={classes.Form__datePickerWrapper}
              onChange={onChange}
              selected={value as Date}
            />
          </>
        )}
      />
    </>
  );
};

export default FormDatePicker;
