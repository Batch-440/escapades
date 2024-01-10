import { Controller, useFormContext } from "react-hook-form";
import { debounce } from "lodash";
import classes from "../Form.module.scss";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type = "text",
  error,
}) => {
  const { control } = useFormContext();

  const debouncedOnChange = debounce((onChange) => {
    onChange();
  }, 500);

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
            onChange={(e) => {
              debouncedOnChange(() => onChange(e));
            }}
            type={type}
          />
        )}
      />
    </>
  );
};

export default FormInput;
