import React, { useState } from "react";
import { ImGooglePlus } from "react-icons/im";
import { HiEye, HiHeart } from "react-icons/hi";
import { GiPopcorn } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import db, { provider, auth } from "../../firebase";
import { useGlobal } from "../../context";
import ListFilm from "../../components/utils/ListFilm/ListFilm";
import loadingimg from "../../loading.gif";

import "./Login.scss";

const Login = () => {
  const { setUser, user, films } = useGlobal();
  const [active, setActive] = useState("heart");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [dataReg, setDataReg] = useState({ email: "", password: "", displayName: "" });

  const history = useHistory();

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
        history.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickLogout = () => {
    auth.signOut();
    setUser(null);
    history.push("/");
  };
  const handleOnchangeLogin = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleOnchangeRegister = (e) => {
    setDataReg({ ...dataReg, [e.target.name]: e.target.value });
  };
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      auth
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then((userCredential) => {})
        .catch((error) => alert(error.message));
      setUserData({ email: "", password: "" });
      history.push("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      auth
        .createUserWithEmailAndPassword(dataReg.email, dataReg.password)
        .then(async (userCredential) => {
          const curUser = auth.currentUser;
          await curUser.updateProfile({ displayName: dataReg.displayName }).then(() => console.log("success"));
          const { uid, photoURL } = userCredential.user;
          const userDoc = db.collection("users").doc(`${uid}`);
          userDoc.set({ uid, photoURL, displayName: userCredential.user.displayName, fav: [], watched: [] });
        })
        .catch((error) => alert(error.message));
      setDataReg({ email: "", password: "", displayName: "" });
      history.push("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
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
      {loading && (
        <div className="loading">
          <img src={loadingimg} alt="loading" className="loading-img" />
        </div>
      )}
      <div className="login">
        <div className="logo">
          <GiPopcorn className="icon-logo" />
          <span className="bold orange-text">TEA </span> MOVIES
        </div>
        <p className="title">Đăng nhập để trải nghiệm tốt hơn</p>
        <div className="btn-group">
          {!isLogin && (
            <button className="btn-login" onClick={() => setIsLogin(true)}>
              Đăng Nhập
            </button>
          )}
          {isLogin && (
            <button className="btn-register" onClick={() => setIsLogin(false)}>
              Đăng Ký
            </button>
          )}
        </div>
        {isLogin ? (
          <form onSubmit={handleSubmitLogin}>
            <label htmlFor="email" className="text-input">
              <input
                type="text"
                name="email"
                id="email"
                value={userData.email}
                onChange={handleOnchangeLogin}
                placeholder="Email"
              />
            </label>
            <label htmlFor="password" className="text-input">
              <input
                type="password"
                name="password"
                id="password"
                value={userData.password}
                onChange={handleOnchangeLogin}
                placeholder="Password"
              />
            </label>
            <button type="submit" className="btn-submit">
              Đăng Nhập
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitRegister}>
            <label htmlFor="emailReg" className="text-input">
              <input
                type="text"
                name="email"
                id="emailReg"
                value={dataReg.email}
                onChange={handleOnchangeRegister}
                placeholder="Email"
              />
            </label>
            <label htmlFor="passwordReg" className="text-input">
              <input
                type="password"
                name="password"
                id="passwordReg"
                value={dataReg.password}
                onChange={handleOnchangeRegister}
                placeholder="Password"
              />
            </label>
            <label htmlFor="displayName" className="text-input">
              <input
                type="text"
                name="displayName"
                id="displayName"
                value={dataReg.displayName}
                onChange={handleOnchangeRegister}
                placeholder="Họ Tên"
              />
            </label>
            <button type="submit" className="btn-submit-register">
              Đăng Ký
            </button>
          </form>
        )}

        <button className="login-btn" onClick={handleClickLogin}>
          <ImGooglePlus className="icon" /> Đăng Nhập Bằng Google
        </button>
      </div>
    </section>
  );
};

export default Login;
