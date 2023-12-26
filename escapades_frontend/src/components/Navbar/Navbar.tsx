import { FC, useState } from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import classes from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/provider/authProvider";
import axiosInstance from "@/api/axios";

interface NavBarLinkProps {
  to: string;
  children: string;
}

const NavbarLink: FC<NavBarLinkProps> = ({ to, children }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    if (window.confirm("Do you want to log out ?")) {
      try {
        await axiosInstance.delete("/logout");
        setAuth({
          user: null,
          token: null,
        });
        navigate("/", { replace: true });
      } catch (error) {
        const err = error as {
          response: { data: "string" };
        };
        window.alert(err.response.data);
      }
    }
  };

  return (
    <li
      className={`${classes.Navbar__links__link} ${
        isActive ? classes.Navbar__links__link__active : ""
      }`}
    >
      {children === "logout" ? (
        <p onClick={onLogout}>Logout</p>
      ) : (
        <Link to={to}>{children}</Link>
      )}
    </li>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth } = useAuth();
  const icon = isMenuOpen ? faXmark : faBars;
  const toggleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const user = auth.user;
  const firstLinkAction = user ? "logout" : "login";

  return (
    <nav className={classes.Navbar}>
      <Link to="/" className={classes.Navbar__title}>
        Escapades
      </Link>
      <ul
        onClick={toggleIsMenuOpen}
        className={`${classes.Navbar__links} ${
          isMenuOpen ? classes.Navbar__links__open : ""
        }`}
      >
        {user && (
          <p
            className={classes.Navbar__userName}
          >{`Hello ${user?.first_name}`}</p>
        )}
        <NavbarLink to={`/${firstLinkAction}`}>{firstLinkAction}</NavbarLink>
        <NavbarLink to="/trip">organize a trip</NavbarLink>
      </ul>
      <div className={classes.Navbar__icons}>
        <FontAwesomeIcon onClick={toggleIsMenuOpen} icon={icon} />
      </div>
    </nav>
  );
};

export default Navbar;
