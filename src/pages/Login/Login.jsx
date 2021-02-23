import React, { useState, useEffect } from "react";
import { ImGooglePlus } from "react-icons/im";
import { HiEye, HiHeart } from "react-icons/hi";
import { GiPopcorn } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import FileBase from "react-file-base64";

import { loginUser, logoutUser, registerUser, loginGoogle } from "../../actions/user.action";
import { getFavorites, getWatched } from "../../actions/film.action";

import ListFilm from "../../components/utils/ListFilm/ListFilm";

import "./Login.scss";

const Login = () => {
  const [cookies, setCookies] = useCookies(["user"]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const favorites = useSelector((state) => state.films.favorites);
  const watched = useSelector((state) => state.films.watched);
  const [active, setActive] = useState("heart");
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [dataReg, setDataReg] = useState({
    email: "",
    displayName: "",
    password: "",
    photoURL: null,
    passwordCheck: "",
  });

  const history = useHistory();
  useEffect(() => {
    if (user) {
      dispatch(getFavorites(user._id));
      dispatch(getWatched(user._id));
    }
  }, [user]);
  const handleSuccess = async (res) => {
    const { name, imageUrl, email, googleId } = res.profileObj;
    const token = res.tokenId;
    dispatch(loginGoogle({ name, imageUrl, googleId, email, token }, setCookies));
    history.push("/");
  };
  const handleFailure = () => {
    alert("Some errors were occur when login");
  };
  const handleClickLogout = async () => {
    await setCookies("user", "", { path: "/" });
    dispatch(logoutUser());
    history.push("/account");
  };
  const handleOnchangeLogin = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleOnchangeRegister = (e) => {
    setDataReg({ ...dataReg, [e.target.name]: e.target.value });
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (userData.email !== "" && userData.password !== "") {
      try {
        const message = await dispatch(loginUser(userData, setCookies));
        if (!message) {
          history.push("/");
        } else {
          alert(message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("must fill in full fields");
    }
    setUserData({ email: "", password: "" });
  };
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (
      dataReg.displayName !== "" &&
      dataReg.email !== "" &&
      dataReg.password !== "" &&
      dataReg.photoURL !== "" &&
      dataReg.passwordCheck !== ""
    ) {
      dispatch(registerUser(dataReg, setCookies));
    } else {
      alert("Please Fill in full fields");
    }
    setDataReg({ email: "", displayName: "", password: "", photoURL: null, passwordCheck: "" });
  };
  if (user._id) {
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
        <ListFilm type="row" films={active === "heart" ? favorites : watched} />
      </section>
    );
  }
  return (
    <section className="login">
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
            <label htmlFor="passwordRegCheck" className="text-input">
              <input
                type="password"
                name="passwordCheck"
                id="passwordRegCheck"
                value={dataReg.passwordCheck}
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
            <label htmlFor="photo-url" className="photo-url">
              <FileBase
                type="file"
                id="photo-url"
                onDone={({ base64 }) => setDataReg({ ...dataReg, photoURL: base64 })}
                multiple={false}
              />
            </label>
            <button type="submit" className="btn-submit-register">
              Đăng Ký
            </button>
          </form>
        )}

        <GoogleLogin
          clientId="467571315756-vigfi3qh89vvgbeqhduotlr2jso13gl5.apps.googleusercontent.com"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
          render={(props) => (
            <button className="login-btn" onClick={props.onClick} disabled={props.disabled}>
              <ImGooglePlus className="icon" /> Đăng Nhập Bằng Google
            </button>
          )}
        />
      </div>
    </section>
  );
};

export default Login;
