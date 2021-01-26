import React, { useState } from "react";
import { ImGooglePlus, ImFilm } from "react-icons/im";
import { HiEye, HiHeart } from "react-icons/hi";
import db, { provider, auth } from "../../firebase";
import { useGlobal } from "../../context";
import ListFilm from "../../components/utils/ListFilm/ListFilm";

import "./Login.scss";

const Login = () => {
  const { setUser, user, films } = useGlobal();
  const [active, setActive] = useState("heart");
  const handleClickLogin = () => {
    try {
      auth.signInWithPopup(provider).then(async (result) => {
        const { uid, photoURL, displayName } = result.user;
        const userDoc = db.collection("users").doc(`${uid}`);
        const existing = await userDoc.get();
        if (!existing.exists) {
          userDoc.set({ uid, photoURL, displayName, fav: [], watched: [] });
          setUser({ uid, photoURL, displayName, fav: [], watched: [] });
        } else {
          setUser(existing.data());
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickLogout = () => {
    auth.signOut();
    setUser(null);
  };
  if (user && films) {
    return (
      <section className="account">
        <button className="logout-btn" onClick={handleClickLogout}>
          Đăng Xuất
        </button>
        <div className="btn-group">
          <button className={`add-fav ${active === "heart" ? "active" : ""}`} onClick={() => setActive("heart")}>
            <HiHeart /> Yêu Thích
          </button>
          <button className={`watch ${active === "eye" ? "active" : ""}`} onClick={() => setActive("eye")}>
            <HiEye /> Đã Xem
          </button>
        </div>
        <ListFilm
          type="row"
          films={
            active === "heart"
              ? films.filter((film) => user.fav.find((item) => item === film.createAt))
              : films.filter((film) => user.watched.find((item) => item === film.createAt))
          }
        />
      </section>
    );
  }
  return (
    <section className="login">
      <div className="login">
        <div className="logo">
          <ImFilm className="icon-logo" />
          <span className="bold">PHIM </span> PRO
        </div>
        <p className="title">Đăng nhập để trải nghiệm tốt hơn</p>
        <button className="login-btn" onClick={handleClickLogin}>
          <ImGooglePlus className="icon" /> Đăng Nhập Bằng Google
        </button>
      </div>
    </section>
  );
};

export default Login;
