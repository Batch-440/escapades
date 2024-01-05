import { useAuth } from "@/provider/authProvider";
import classes from "./Dashboard.module.scss";

const Dashboard = () => {
  const { auth } = useAuth();
  const user = auth.user;

  return (
    <>
      {user && (
        <p className={classes.Dashboard}>{`Hello ${user.first_name}`}</p>
      )}
    </>
  );
};

export default Dashboard;
