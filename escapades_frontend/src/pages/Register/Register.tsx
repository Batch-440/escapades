import SignUp from "@/components/form/Signup";
import classes from "./Register.module.scss";

const Register = () => {
  return (
    <div className={classes.Register}>
      <h1 className={classes.Register__title}>Register</h1>
      <SignUp />
    </div>
  );
};

export default Register;
