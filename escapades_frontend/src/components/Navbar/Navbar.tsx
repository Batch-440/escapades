import { FC, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import classes from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/provider/authProvider";

interface NavBarLinkProps {
  to: string;
  children: string;
}

const NavbarLink: FC<NavBarLinkProps> = ({ to, children }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? classes.Navbar__links__link__active : ""}>
      <Link to={to}>{children}</Link>
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
        {user && <p>{`Hello ${user?.first_name}`}</p>}
        <NavbarLink to="/login">login</NavbarLink>
        <NavbarLink to="/trip">organize a trip</NavbarLink>
      </ul>
      <div className={classes.Navbar__icons}>
        <FontAwesomeIcon onClick={toggleIsMenuOpen} icon={icon} />
      </div>
    </nav>
  );
};

export default Navbar;
