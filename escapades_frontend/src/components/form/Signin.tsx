import { useAuth } from "../../provider/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./Form.module.scss";
import axiosInstance from "@/api/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("wrong email format"),
    password: yup.string().required("Password is required"),
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
      const response = await axiosInstance.post("/login", {
        user: {
          ...data,
        },
      });
      setAuth({
        user: response.data.status.data.user,
        token: response.headers.authorization,
      });
      navigate("/", { replace: true });
    } catch (error) {
      const err = error as {
        response: { data: "string" };
      };
      window.alert(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>
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
        {...register("password")}
      />
      <input
        type="submit"
        value="submit"
        className={classes.Form__submit}
        disabled={!isValid}
      />
      <Link to="/register" className={classes.Form__link}>
        You don't have an account ? Please register
      </Link>
    </form>
  );
};

export default SignIn;
