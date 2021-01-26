import React from "react";
import "./LeftContent.scss";
import ListFilm from "../../utils/ListFilm/ListFilm";
import { useGlobal } from "../../../context";
const LeftContent = () => {
  const { films } = useGlobal();
  if (!films) return <></>;
  return (
    <section className="left-container">
      <div className="left-container__top">
        <h3 className="title-left">PHIM BỘ HOT</h3>
        <ListFilm type="column" films={films.filter((film) => film.isMultiEp.toString() === "true")} />
      </div>
      <div className="left-container__bottom">
        <h3 className="title-left">PHIM LẺ HOT</h3>
        <ListFilm type="column" films={films.filter((film) => film.isMultiEp.toString() === "false")} />
      </div>
    </section>
  );
};

export default LeftContent;
