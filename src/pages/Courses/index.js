// React
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./style.css";

// Outras
import { Link } from "react-router-dom";
import api from "../../services/api";
import Wrapper from "../../components/Wrapper";
import { checkErrors } from "../../Helpers";

export default (props) => {
  // Loading e erros
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  // Cursos
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getCourseList = async () => {
      // Preenche cursos
      const courseList = await api.get("/course");
      // Verifica se há erros
      if (checkErrors(courseList)) {
        // Marca como carregado
        setIsError(true);
        return;
      }
      setCourses(courseList.data);
      // Marca como carregado
      setIsLoaded(true);
    };
    getCourseList();
    return () => {
      setCourses([]);
    };
  }, [props]);

  return (
    <>
      {props.isPage ? (
        <Helmet>
          <title>Cursos - Tirso Cursos e Treinamentos</title>
        </Helmet>
      ) : null}
      <Wrapper isLoaded={isLoaded} isError={isError}>
        <div className="courses">
          <h1>CURSOS</h1>
          <ul className="course-list">
            {courses.map((course) => (
              <li key={course._id}>
                <div className="top">
                  <img src={require(`../../${course.cover}`)} alt="" />
                  <div className="title">
                    <div>
                      <h1>{course.title}</h1>
                    </div>
                    <span></span>
                  </div>
                </div>
                <div className="info">
                  <p>{course.subtitle}</p>
                </div>
                <button className="btn">
                  <Link to={`/cursos/${course.url}`}>
                    {course.release ? "COMPRAR" : "EM BREVE"}
                  </Link>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </>
  );
};
