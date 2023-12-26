import SignIn from "@/components/Form/Signin";
import classes from "./Login.module.scss";

const Login = () => {
  return (
    <div className={classes.Login}>
      <h1 className={classes.Login__title}>Login</h1>
      <SignIn />
    </div>
  );
};

export default Login;
