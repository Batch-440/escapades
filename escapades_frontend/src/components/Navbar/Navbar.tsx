import { FC } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import classes from "./Navbar.module.scss";

type NavBarLinkProps = {
  to: string;
  children: string;
};

const NavbarLink: FC<NavBarLinkProps> = ({ to, children }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? classes.active : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
};

const Navbar = () => {
  return (
    <nav className={classes.Navbar}>
      <Link to="/" className={classes.Navbar__title}>
        Escapades
      </Link>
      <ul className={classes.Navbar__link}>
        <NavbarLink to="/register">register</NavbarLink>
        <NavbarLink to="/trip">organize a trip</NavbarLink>
      </ul>
    </nav>
  );
};

export default Navbar;
