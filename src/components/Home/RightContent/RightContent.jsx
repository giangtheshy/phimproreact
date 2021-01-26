import React, { useState } from "react";
import "./RightContent.scss";
import ListFilm from "../../utils/ListFilm/ListFilm";
import { useGlobal } from "../../../context";

const RightContent = ({ value, setValue }) => {
  const [active, setActive] = useState("all");
  const { films } = useGlobal();

  const handleClick = (e) => {
    setValue("");
    setActive(e.target.dataset.id);
  };
  if (!films) {
    return <></>;
  }
  return (
    <section className="right-container">
      <div className="right-container__header">
        <h3 className="right-container__header-title">Phim Bộ Mới</h3>
        <div className="options-btn">
          <button className={active === "all" ? "active" : ""} data-id="all" onClick={handleClick}>
            Tất cả Phim
          </button>
          <button className={active === "upcoming" ? "active" : ""} data-id="upcoming" onClick={handleClick}>
            Sắp Chiếu
          </button>
          <button className={active === "new" ? "active" : ""} data-id="new" onClick={handleClick}>
            Phim Mới
          </button>
        </div>
      </div>
      <ListFilm
        type="row"
        films={films
          .filter((film) =>
            active === "all"
              ? film
              : active === "upcoming"
              ? film.upcoming === "true" && film
              : new Date().getTime() - film.createAt < 1000 * 60 * 60 * 24 * 7 && film
          )
          .filter((film) => film.title.toLowerCase().includes(value.toLowerCase()))}
      />
    </section>
  );
};

export default RightContent;
