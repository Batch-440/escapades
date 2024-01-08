import { useAuth } from "@/provider/authProvider";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import classes from "./Form.module.scss";
import axiosInstance from "@/api/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "./controlledFields/FormInput";
import FormDatePicker from "./controlledFields/FormDatePicker";
import FormCountrySelector from "./controlledFields/FormCountrySelector";
import FormFileInput from "./controlledFields/FormFileInput";

type FormValues = {
  first_name?: string;
  last_name?: string;
  date_of_birth: Date;
  country_code: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar: FileList;
};

const SignUp = () => {
  const formSchema: yup.ObjectSchema<FormValues> = yup.object().shape({
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
    avatar: yup.mixed<FileList>().required(),
  });

  const { setAuth } = useAuth();
  const methods = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/signup",
        {
          user: {
            ...data,
          },
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={classes.Form}>
        <FormInput label="First Name" id="first_name" />
        <FormInput label="Last Name" id="last_name" />
        <FormDatePicker
          label="Date of Birth"
          id="date_of_birth"
          error={methods.formState.errors.date_of_birth?.message}
        />
        <FormCountrySelector
          label="Country"
          id="country_code"
          error={methods.formState.errors.country_code?.message}
        />
        <FormInput
          label="Email"
          id="email"
          error={methods.formState.errors.email?.message}
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          error={methods.formState.errors.password?.message}
        />
        <FormInput
          label="Password Confirmation"
          id="password_confirmation"
          type="password"
          error={methods.formState.errors.password_confirmation?.message}
        />

        <FormFileInput
          label="Avatar"
          id="avatar"
          error={methods.formState.errors.avatar?.message}
        />

        <input
          type="submit"
          value="submit"
          className={classes.Form__submit}
          disabled={!methods.formState.isValid}
        />
      </form>
    </FormProvider>
  );
};

export default SignUp;
