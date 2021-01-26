import React, { useState } from "react";
import "./Home.scss";
import RightContent from "../../components/Home/RightContent/RightContent";
import LeftContent from "../../components/Home/LeftContent/LeftContent";
import Search from "../../components/Search/Search";

const Home = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <Search setValue={setValue} value={value} />
      <div className="home">
        <RightContent value={value} setValue={setValue} />
        <LeftContent />
      </div>
    </>
  );
};

export default Home;
