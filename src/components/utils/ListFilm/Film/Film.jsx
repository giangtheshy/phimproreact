import React from "react";
import "./Film.scss";
import { BsTagFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { HiEye } from "react-icons/hi";
import { useSelector } from "react-redux";
import Stars from "../../../utils/Stars/Stars";
const Film = ({ film }) => {
  const history = useHistory();
  const user = useSelector((state) => state.users.user);
  return (
    <article className="film-center" onClick={() => history.push(`/film/${film._id}`)}>
      <div className="img">
        <span className="evaluate">{film.evaluate}</span>
        <img src={film.image} alt={film.title} />
        {user?.watched?.some((item) => item === film.createAt) && (
          <span className="watched">
            <HiEye />
            Đã Xem
          </span>
        )}
      </div>
      <div className="film-center__details">
        <Stars stars={film.stars * 1} />
        <h3 className="title">{film.title}</h3>
        <p>
          <BsTagFill className="icon-tag" />
          {film.category}
        </p>
      </div>
    </article>
  );
};

export default Film;
