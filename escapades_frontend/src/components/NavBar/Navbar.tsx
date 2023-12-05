import "./Navbar.scss"
import { FC } from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";

type NavBarLinkProps = {
  to: string;
  children: string;
}

const NavbarLink: FC<NavBarLinkProps> = ({to, children}) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={ isActive ? "active" : ""}>
      <Link to={to}>
        {children}
      </Link>
    </li>
  )
}

const Navbar = () => {
  return(
    <nav className="nav">
      <Link to="/" className="site-title">Escapades</Link>
      <ul>
          <NavbarLink to="/register">register</NavbarLink>
          <NavbarLink to="/trip">organize a trip</NavbarLink>
      </ul>
    </nav>
  )
}

export default Navbar;