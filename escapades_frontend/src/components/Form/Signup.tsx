import { useAuth } from "@/provider/authProvider";
import { useNavigate } from "react-router-dom";
import {
  SubmitHandler,
  useForm,
  Controller,
  UseFormRegister,
  Control,
} from "react-hook-form";
import classes from "./Form.module.scss";
import axiosInstance from "@/api/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UTCDatePicker from "../UTCDatePicker";
import CountrySelector from "../CountrySelector";

type FormValues = {
  first_name?: string;
  last_name?: string;
  date_of_birth: Date;
  country_code: string;
  email: string;
  password: string;
  password_confirmation: string;
};
interface FormInputProps {
  label: string;
  id: keyof FormValues;
  type?: string;
  error?: string;
  register: UseFormRegister<FormValues>;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type = "text",
  error,
  register,
}) => (
  <>
    <label htmlFor={id}>{label} :</label>
    {error && (
      <p className={classes.Form__error} role="alert">
        {error}
      </p>
    )}
    <input
      id={id}
      className={classes.Form__input}
      type={type}
      {...register(id)}
    />
  </>
);

interface FormDatePickerProps {
  label: string;
  id: keyof FormValues;
  error?: string;
  control: Control<FormValues>;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  id,
  error,
  control,
}) => (
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

const FormCountrySelector: React.FC<FormDatePickerProps> = ({
  label,
  id,
  error,
  control,
}) => (
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

const SignUp = () => {
  const formSchema = yup.object().shape({
    first_name: yup.string(),
    last_name: yup.string(),
    date_of_birth: yup.date().required(),
    country_code: yup.string().required(),
    email: yup
      .string()
      .required("email is required")
      .email("wrong email format"),
    password: yup.string().required("Password is required"),
    password_confirmation: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axiosInstance.post("/signup", {
        user: {
          ...data,
        },
      });
      setAuth({
        user: response.data.data,
        token: response.headers.authorization,
      });
      navigate("/", { replace: true });
    } catch (error) {
      const err = error as {
        response: { data: { status: { message: "string" } } };
      };
      window.alert(err.response.data.status.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>
        <FormInput label="First Name" id="first_name" register={register} />
        <FormInput label="Last Name" id="last_name" register={register} />

        <FormDatePicker
          label="Date of Birth"
          id="date_of_birth"
          error={errors.date_of_birth?.message}
          control={control}
        />

        <FormCountrySelector
          label="Country"
          id="country_code"
          error={errors.country_code?.message}
          control={control}
        />

        <FormInput
          label="Email"
          id="email"
          error={errors.email?.message}
          register={register}
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          error={errors.password?.message}
          register={register}
        />
        <FormInput
          label="Password Confirmation"
          id="password_confirmation"
          type="password"
          error={errors.password_confirmation?.message}
          register={register}
        />

        <input
          type="submit"
          value="submit"
          className={classes.Form__submit}
          disabled={!isValid}
        />
      </form>
    </>
  );
};

export default SignUp;
