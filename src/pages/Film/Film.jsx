import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useParams, useHistory } from "react-router-dom";
import { BsTagFill } from "react-icons/bs";
import { HiHeart, HiEye } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";

import db from "../../firebase";
import "./Film.scss";
import Stars from "../../components/utils/Stars/Stars";
import ListFilm from "../../components/utils/ListFilm/ListFilm";
import ModalFilm from "../../components/Modal/ModalFilm";
import { useGlobal } from "../../context";

const Film = () => {
  const [modal, setModal] = useState(false);
  const [film, setFilm] = useState({});
  const { films, setUser, user, role, setIsEdit } = useGlobal();
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    if (films) {
      setFilm(films.find((film) => film.createAt === id));
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [films, id]);
  const handleFav = () => {
    if (user && user.fav.find((item) => item === id)) {
      setUser((prev) => ({ ...prev, fav: prev.fav.filter((item) => item !== id) }));
      db.collection("users")
        .doc(`${user.uid}`)
        .update({ fav: user.fav.filter((item) => item !== id) });
    } else if (user) {
      setUser((prev) => ({ ...prev, fav: [...prev.fav, id] }));
      db.collection("users")
        .doc(`${user.uid}`)
        .update({ fav: firebase.firestore.FieldValue.arrayUnion(id) });
    }
  };
  const handleWatch = () => {
    if (user && !user.watched.find((item) => item === id)) {
      setModal(!modal);
      setUser((prev) => ({ ...prev, watched: [...prev.watched, id] }));
      db.collection("users")
        .doc(`${user.uid}`)
        .update({ watched: firebase.firestore.FieldValue.arrayUnion(id) });
    } else if (!user) {
      history.push("/account");
      alert("Phải Đăng Nhập Để Xem !");
    } else if (user) {
      setModal(!modal);
    }
  };
  const handleEdit = () => {
    setIsEdit(id);
    history.push("/manager");
  };
  const handleRemove = () => {
    db.collection("films")
      .doc(`${id}`)
      .delete()
      .then(() => {
        alert("Xóa Phim Thành Công!");
      })
      .catch((err) => console.log(err));
    history.push("/");
  };
  if (!film || !films) return <></>;
  return (
    <section className="film">
      {modal && <ModalFilm setModal={setModal} url={film.url} />}
      <div className="film__introduce">
        <div className="film__introduce-left">
          <img src={film.image} alt={film.title} />
        </div>
        <div className="film__introduce-right">
          <h3 className="title">{film.title}</h3>
          <div className="evaluate">
            <Stars stars={film.stars * 1} />
            <p>
              <BsTagFill className="icon-tag" />
              {film.category}
            </p>
          </div>
          <div className="btn-group">
            <button
              className={`add-fav ${user && user.fav.find((item) => item === id) ? "disable" : ""}`}
              onClick={handleFav}
            >
              <HiHeart /> {user && user.fav.find((item) => item === id) ? "Hủy Thích" : "Yêu Thích"}
            </button>
            {film.upcoming === "false" && (
              <button className="watch" onClick={handleWatch}>
                <HiEye /> Xem Phim
              </button>
            )}
            {role === "admin" && (
              <>
                <button className="watch" onClick={handleEdit}>
                  <BiEdit /> Cập Nhật
                </button>
                <button className="add-fav" onClick={handleRemove}>
                  <FaTrash /> Xóa Phim
                </button>
              </>
            )}
          </div>
          <div className="details-option">
            <p>
              <span className="bold">Trạng thái:</span>
              <span className="orange-text"> {film.upcoming === "true" ? "Chưa ra mắt" : "Hoàn tất"}</span>
            </p>
            <p>
              <span className="bold">Đạo diễn:</span> <span className="orange-text">{film.directors},</span>
            </p>
            <p>
              <span className="bold">Quốc gia:</span> <span className="orange-text">{film.country},</span>
            </p>
            <p>
              <span className="bold">Năm:</span> <span className="orange-text">2020</span>
            </p>
            <p>
              <span className="bold">Thời lượng:</span>{" "}
              <span className="orange-text">{film.isMultiEp === "true" ? "45" : "90"} phút/tập</span>
            </p>
            <p>
              <span className="bold">Số tập:</span> <span className="orange-text">{film.episode} tập</span>
            </p>
            <p>
              <span className="bold">Chất lượng:</span> <span className="orange-text">Bản đẹp</span>
            </p>
            <p>
              <span className="bold">Độ phân giải:</span> <span className="orange-text">HD 720p</span>
            </p>
            <p>
              <span className="bold">Ngôn ngữ:</span> <span className="orange-text">Phụ đề Việt</span>
            </p>
            <p>
              <span className="bold">Thể loại:</span> <span className="orange-text">{film.category}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="film__detail">{film.description}</div>
      <ListFilm type="row" films={films.filter((item) => item.isMultiEp === film.isMultiEp)} />
    </section>
  );
};

export default Film;
