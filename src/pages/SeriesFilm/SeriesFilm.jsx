import React, { useState } from "react";
import "./SeriesFilm.scss";
import ListFilm from "../../components/utils/ListFilm/ListFilm";
import Search from "../../components/Search/Search";
import { useGlobal } from "../../context";

const SeriesFilm = () => {
  const { films } = useGlobal();
  const [value, setValue] = useState("");
  if (!films) return <></>;

  return (
    <>
      <Search setValue={setValue} value={value} />
      <section className="series-film">
        <h3 className="series-film__title">Phim Bộ</h3>
        <ListFilm
          type="row"
          films={films
            .filter((film) => film.isMultiEp.toString() === "true")
            .filter((film) => film.title.toLowerCase().includes(value.toLowerCase()))}
        />
      </section>
    </>
  );
};

export default SeriesFilm;
