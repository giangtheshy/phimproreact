import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsTagFill } from "react-icons/bs";
import { HiHeart, HiEye } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";

import { getSingleFilm, setIsEdit, removeFilm } from "../../actions/film.action";
import { addFavorite, addWatched, removeFavorite } from "../../actions/user.action";
import "./Film.scss";
import Stars from "../../components/utils/Stars/Stars";
import ListFilm from "../../components/utils/ListFilm/ListFilm";
import ModalFilm from "../../components/Modal/ModalFilm";

const Film = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const role = useSelector((state) => state.users.role);
  const film = useSelector((state) => state.films.film);
  const films = useSelector((state) => state.films.films);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    dispatch(getSingleFilm(id));
    window.scrollTo({ top: 0, left: 0 });
  }, [id]);

  const handleFav = () => {
    if (user?.favorites?.find((item) => item === film.createdAt)) {
      dispatch(removeFavorite(user._id, film.createdAt));
    } else {
      dispatch(addFavorite(user._id, film.createdAt));
    }
  };
  const handleWatch = () => {
    if (!user?.watched?.find((item) => item === film.createdAt)) {
      setModal(!modal);
      dispatch(addWatched(user._id, film.createdAt));
    } else if (!user) {
      history.push("/account");
      alert("Phải Đăng Nhập Để Xem !");
    } else if (user) {
      setModal(!modal);
    }
  };
  const handleEdit = () => {
    dispatch(setIsEdit(id));
    history.push("/manager");
  };
  const handleRemove = () => {
    dispatch(removeFilm(id));
    history.push("/");
  };
  if (!film) return <></>;
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
              className={`add-fav ${user?.favorites?.find((item) => item === film.createdAt) ? "disable" : ""}`}
              onClick={handleFav}
            >
              <HiHeart /> {user?.favorites?.find((item) => item === film.createdAt) ? "Hủy Thích" : "Yêu Thích"}
            </button>

            <button className="watch" onClick={handleWatch}>
              <HiEye /> {film.upComing === "false" ? "Xem Phim" : "Trailer"}
            </button>

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
              <span className="orange-text"> {film.upComing === "true" ? "Chưa ra mắt" : "Hoàn tất"}</span>
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
      <ListFilm type="row" films={films.filter((item) => item.isMultiEp === film.isMultiEp && item._id !== film._id)} />
    </section>
  );
};

export default Film;
