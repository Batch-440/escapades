import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./Form.module.scss";
import axiosInstance from "@/api/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValues = {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const SignUp = () => {
  const formSchema = yup.object().shape({
    first_name: yup.string(),
    last_name: yup.string(),
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
    <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>
      <label htmlFor="firstName">First Name :</label>
      <input
        id="firstName"
        className={classes.Form__input}
        {...register("first_name")}
      />
      <label htmlFor="lastName">Last Name :</label>
      <input
        id="lastName"
        className={classes.Form__input}
        {...register("last_name")}
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
  );
};

export default SignUp;
