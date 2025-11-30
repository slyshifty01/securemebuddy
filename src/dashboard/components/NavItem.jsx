import { NavLink } from "react-router-dom";

export const NavItem = ({ to, label }) => {
  return (
    <li className="my-2">
      <NavLink
        to={to}
        className="text-white hover:text-purple-300 transition"
      >
        {label}
      </NavLink>
    </li>
  );
};
