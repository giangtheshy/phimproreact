import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./OddFilm.scss";
import ListFilm from "../../components/utils/ListFilm/ListFilm";
import Search from "../../components/Search/Search";
const OddFilm = () => {
  const films = useSelector((state) => state.films.films);
  const [value, setValue] = useState("");
  if (films.length === 0) return <></>;
  return (
    <>
      <Search setValue={setValue} value={value} />
      <section className="odd-film">
        <h3 className="odd-film__title">Phim Lẻ</h3>
        <ListFilm
          type="row"
          films={films
            .filter((film) => film.isMultiEp.toString() === "false")
            .filter((film) => film.title.toLowerCase().includes(value.toLowerCase()))}
        />
      </section>
    </>
  );
};

export default OddFilm;
