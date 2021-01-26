import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ImFilm } from "react-icons/im";
import { FaBars } from "react-icons/fa";

import "./Header.scss";
import Nav from "./Nav/Nav";

const Header = () => {
  const history = useHistory();
  const [showNav, setShowNav] = useState(false);
  return (
    <header>
      <div className="logo" onClick={() => history.push("/")}>
        <ImFilm className="icon-logo" />
        <span className="bold">PHIM </span> PRO
      </div>
      <FaBars className="icon" onClick={() => setShowNav(true)} />
      <Nav showNav={showNav} setShowNav={setShowNav} />
    </header>
  );
};

export default Header;
