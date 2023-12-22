import SignUp from "@/components/Form/Signup";
import classes from "./Register.module.scss";

const Register = () => {
  return (
    <div className={classes.Register}>
      <SignUp />
    </div>
  );
};

export default Register;
