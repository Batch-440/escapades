import { Controller, useFormContext } from "react-hook-form";
import CountrySelector from "../utils/CountrySelector";
import classes from "../Form.module.scss";

interface FormCountrySelectorProps {
  label: string;
  id: string;
  error?: string;
}

const FormCountrySelector: React.FC<FormCountrySelectorProps> = ({
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
        render={({ field: { onChange } }) => (
          <CountrySelector
            className={classes.Form__countryPicker}
            id={id}
            onChange={onChange}
          />
        )}
      />
      {error && (
        <p className={classes.Form__error} role="alert">
          {error}
        </p>
      )}
    </>
  );
};

export default FormCountrySelector;
