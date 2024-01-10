import { useAuth } from "../../provider/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import classes from "./Form.module.scss";
import axiosInstance from "@/api/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "./controlledFields/FormInput";

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
  const methods = useForm<FormValues>({
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={classes.Form}>
        <FormInput
          id="email"
          label="Email"
          error={methods.formState.errors.email?.message}
        />
        <FormInput
          id="password"
          label="password"
          type="password"
          error={methods.formState.errors.password?.message}
        />

        <input
          type="submit"
          value="submit"
          className={classes.Form__submit}
          disabled={!methods.formState.isValid}
        />
        <Link to="/register" className={classes.Form__link}>
          You don't have an account ? Please register
        </Link>
      </form>
    </FormProvider>
  );
};

export default SignIn;
