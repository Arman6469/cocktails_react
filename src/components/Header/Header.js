import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../icons/logo.png";
import Magazine from "./Magazine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
  const SignOut = () => {
    localStorage.clear();
  };
  console.log(localStorage.token);
  

  return (
    <nav>
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="logo" className="logo_icon" />
        </NavLink>
      </div>
      <ul>
        <NavLink to="/cocktails">
          <li>Cocktails</li>
        </NavLink>
        <NavLink to="/signup">
          <li>Sign up</li>
        </NavLink>
        {localStorage.token ? <Magazine props={props} /> : null}
        {localStorage.token ? (
          <NavLink to="/">
            <li onClick={SignOut}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </li>
          </NavLink>
        ) : null}
      </ul>
      <div className="search_input">
        <div className="ui icon input search">
          <input type="text" placeholder="Search..." />
          <i className="search icon"></i>
        </div>
      </div>
    </nav>
  );
}
