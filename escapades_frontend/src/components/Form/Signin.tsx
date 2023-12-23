import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./Form.module.scss";
import axiosInstance from "@/api/axios";

type FormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { setAuth } = useAuth();
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axiosInstance
      .post("/login", {
        user: {
          ...data,
        },
      })
      .then((response) => {
        setAuth({
          user: response.data.data,
          token: response.headers.authorization,
        });
        navigate("/", { replace: true });
      })
      .catch((error) => {
        window.alert(error.response.data.status.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.Form}>
      <label htmlFor="email">email :</label>
      <input
        id="email"
        className={classes.input}
        {...register("email")}
      ></input>

      <label htmlFor="password">Password :</label>
      <input
        id="password"
        className={classes.input}
        {...register("password")}
      ></input>
      <input type="submit" value="submit" className={classes.submitButton} />
    </form>
  );
};

export default SignIn;
