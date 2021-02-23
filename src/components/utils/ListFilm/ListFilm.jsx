import React from "react";
import "./ListFilm.scss";
import Film from "./Film/Film";

const ListFilm = ({ type, films }) => {
  if (films.length === 0) {
    return <></>;
  }
  return (
    <section className={`films-container ${type}`}>
      {films.map((film) => (
        <Film film={film} key={film._id} />
      ))}
    </section>
  );
};

export default ListFilm;
