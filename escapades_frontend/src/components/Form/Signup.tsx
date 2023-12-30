import { useAuth } from "@/provider/authProvider";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
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
    getValues,
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
        <label htmlFor="firstName">First Name :</label>
        <input
          id="firstName"
          className={classes.Form__input}
          onClick={() => console.log(getValues())}
          {...register("first_name")}
        />
        <label htmlFor="lastName">Last Name :</label>
        <input
          id="lastName"
          className={classes.Form__input}
          {...register("last_name")}
        />

        <label htmlFor="DateOfBirth">Date of birth :</label>
        <Controller
          control={control}
          name="date_of_birth"
          render={({ field: { onChange, value } }) => (
            <>
              {errors.date_of_birth && (
                <p className={classes.Form__error} role="alert">
                  {errors.date_of_birth.message}
                </p>
              )}
              <UTCDatePicker
                id="DateOfBirth"
                placeholderText="Select date"
                className={classes.Form__input}
                wrapperClassName={classes.Form__datePickerWrapper}
                onChange={onChange}
                selected={value}
              />
            </>
          )}
        />
        <label htmlFor="Country">Country :</label>
        <Controller
          control={control}
          name={"country_code"}
          render={({ field: { onChange } }) => (
            <CountrySelector
              className={classes.Form__countryPicker}
              id="Country"
              onChange={onChange}
            />
          )}
        />

        <label htmlFor="email">email :</label>
        {errors.email && (
          <p className={classes.Form__error} role="alert">
            {errors.email.message}
          </p>
        )}
        <input
          id="email"
          className={classes.Form__input}
          {...register("email")}
        />

        <label htmlFor="password">Password :</label>
        {errors.password && (
          <p className={classes.Form__error} role="alert">
            {errors.password.message}
          </p>
        )}
        <input
          id="password"
          className={classes.Form__input}
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password")}
        />
        <label htmlFor="passwordConfirmation">Password Confirmation :</label>
        {errors.password_confirmation && (
          <p className={classes.Form__error} role="alert">
            {errors.password_confirmation.message}
          </p>
        )}
        <input
          id="passwordConfirmation"
          className={classes.Form__input}
          {...register("password_confirmation")}
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
