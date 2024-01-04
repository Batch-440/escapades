import { Controller, useFormContext } from "react-hook-form";
import classes from "../Form.module.scss";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  error?: string;
}

const FormFileInput: React.FC<FormInputProps> = ({ label, id, error }) => {
  const { control } = useFormContext();

  return (
    <>
      <label htmlFor={id}>{label} :</label>
      {error && (
        <p className={classes.Form__error} role="alert">
          {error}
        </p>
      )}

      <Controller
        control={control}
        name={id}
        render={({ field: { onChange } }) => (
          <input
            className={classes.Form__input}
            id={id}
            type="file"
            onChange={(event) => {
              event && event.target.files && onChange(event.target.files[0]);
            }}
          />
        )}
      />
    </>
  );
};

export default FormFileInput;
