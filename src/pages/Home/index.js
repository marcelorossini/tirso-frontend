import React from "react";
import { Helmet } from "react-helmet";
import "./style.css";

import Slider from "../../components/Slider";

import Courses from "../../pages/Courses";
import About from "../../pages/About";

export default () => {
  return (
    <>
      <Helmet>
        <title>Tirso Cursos e Treinamentos</title>
      </Helmet>
      <div className="home">
        <Slider />
        <section className="courses-wrapper">
          <Courses />
        </section>
        <section className="about-wrapper">
          <About />
        </section>
      </div>
    </>
  );
};
