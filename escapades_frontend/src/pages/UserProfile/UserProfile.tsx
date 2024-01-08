import { useAuth } from "@/provider/authProvider";
import classes from "./UserProfile.module.scss";
import moment from "moment";
import countryList from "react-select-country-list";

const UserProfile = () => {
  const { auth } = useAuth();
  const user = auth.user;

  const getUserAge = (date_of_birth: Date | string) =>
    moment().diff(date_of_birth, "years");

  const getCountry = (country_code: string) =>
    countryList().getLabel(country_code);

  return (
    <div className={classes.UserProfile}>
      {user && (
        <>
          <img className={classes.UserProfile__avatar} src={user.avatar_url} />
          <p>{user.first_name}</p>
          <p>{`${getUserAge(user.date_of_birth)} years old`}</p>
          <p>{`Country: ${getCountry(user.country_code)}`}</p>
        </>
      )}
    </div>
  );
};

export default UserProfile;
