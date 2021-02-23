import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Nav.scss";

const Nav = ({ showNav, setShowNav }) => {
  const history = useHistory();
  const location = useLocation().pathname;
  const user = useSelector((state) => state.users.user);
  const role = useSelector((state) => state.users.role);

  useEffect(() => {
    const handleEvent = (e) => {
      if (e.target.classList.contains("bold") || e.target.classList.contains("ul")) {
        setShowNav(false);
      }
    };
    window.addEventListener("click", handleEvent);
    return () => window.removeEventListener("click", handleEvent);
  }, []);
  return (
    <nav className={`nav ${showNav ? "show" : ""}`}>
      <ul className="ul">
        <li className={`bold ${location === "/oddfilm" ? "active" : ""}`} onClick={() => history.push("/oddfilm")}>
          Phim Lẻ
        </li>
        <li
          className={`bold ${location === "/seriesfilm" ? "active" : ""}`}
          onClick={() => history.push("/seriesfilm")}
        >
          Phim Bộ
        </li>
        {role === "admin" && (
          <li className={`bold ${location === "/manager" ? "active" : ""}`} onClick={() => history.push("/manager")}>
            Quản Lý Phim
          </li>
        )}
        <li className={`bold ${location === "/account" ? "active" : ""}`} onClick={() => history.push("/account")}>
          {user?._id ? (
            <div className="account bold">
              <img
                src={
                  user.photoURL ||
                  "https://lh3.googleusercontent.com/TuW_5qbJjB2LNHCs5ZfernjesNw936Bda_2mdRC4ruDtZVIxl5TST8ykOHbkcBBEcg=s250"
                }
                alt="avatar"
                className="avatar bold"
              />
              <p className="bold">{user.displayName}</p>
            </div>
          ) : (
            "Tài Khoản"
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
