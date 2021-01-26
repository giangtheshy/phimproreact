import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./scss/index.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Film from "./pages/Film/Film";
import Manager from "./pages/Manager/Manager";
import OddFilm from "./pages/OddFilm/OddFilm";
import SeriesFilm from "./pages/SeriesFilm/SeriesFilm";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useGlobal } from "./context";
const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <section className="app__content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/oddfilm" component={OddFilm} />
            <Route path="/seriesfilm" component={SeriesFilm} />
            <Route path="/account" component={Login} />
            <Route path="/manager" component={Manager} />
            <Route path="/film/:id" component={Film} />
          </Switch>
        </section>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
