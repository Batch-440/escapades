import { FC, useState } from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import classes from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/provider/authProvider";
import axiosInstance from "@/api/axios";
import Modal from "@/components/Modal";
import Avatar from "@/components/avatar/Avatar";

interface NavBarLinkProps {
  to: string;
  children: string;
  setIsConfirmLogoutOpen?: (a: boolean) => void;
}

const NavbarLink: FC<NavBarLinkProps> = ({
  to,
  children,
  setIsConfirmLogoutOpen,
}) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li
      className={`${classes.Navbar__logged_links__link} ${
        isActive ? classes.Navbar__logged_links__link__active : ""
      }`}
    >
      {children === "logout" && setIsConfirmLogoutOpen ? (
        <p onClick={() => setIsConfirmLogoutOpen(true)}>Logout</p>
      ) : (
        <Link to={to}>{children}</Link>
      )}
    </li>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const burgerMenuIcon = isMenuOpen ? faXmark : faBars;
  const toggleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const user = auth.user;
  const isUserLoggedIn = !!user;

  const onLogout = async () => {
    try {
      await axiosInstance.delete("/logout");
      setAuth({
        user: null,
        token: null,
      });
      setIsConfirmLogoutOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      const err = error as {
        response: { data: "string" };
      };
      window.alert(err.response.data);
    }
  };

  return (
    <nav className={classes.Navbar}>
      <Link to="/" className={classes.Navbar__title}>
        Escapades
      </Link>
      {isUserLoggedIn && (
        <>
          <ul
            onClick={toggleIsMenuOpen}
            className={`${classes.Navbar__logged_links} ${
              isMenuOpen ? classes.Navbar__logged_links__open : ""
            }`}
          >
            <NavbarLink to="/dashboard">organize a trip</NavbarLink>
            <NavbarLink to="/profile">see my profile</NavbarLink>
            <NavbarLink
              to={`/logout`}
              setIsConfirmLogoutOpen={setIsConfirmLogoutOpen}
            >
              logout
            </NavbarLink>
          </ul>
          <div className={classes.Navbar__icons}>
            <FontAwesomeIcon onClick={toggleIsMenuOpen} icon={burgerMenuIcon} />
          </div>
          <Avatar url={user.avatar_url} onClick={toggleIsMenuOpen}></Avatar>
          {isConfirmLogoutOpen && (
            <Modal
              isOpen={isConfirmLogoutOpen}
              setIsOpen={setIsConfirmLogoutOpen}
              onConfirm={onLogout}
              title={"Logout"}
              description="Do you really want to log out ?"
            />
          )}
        </>
      )}
      {!isUserLoggedIn && (
        <ul className={classes.Navbar__unlogged_links}>
          <NavbarLink to={`/login`}>login</NavbarLink>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
