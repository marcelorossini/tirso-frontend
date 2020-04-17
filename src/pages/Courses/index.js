// React
import React, { useState, useEffect } from 'react';
import './style.css';

// Outras
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Loading from '../../components/Loading'


export default () => {
    // Loading
    const [isLoaded, setIsLoaded] = useState(false);
    // Cursos
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const getCourseList = async () => {
            // Preenche cursos
            const courseList = await api.get('/course');
            setCourses(courseList.data);
            // Marca como carregado
            setIsLoaded(true);
        }
        getCourseList();
    }, [])

    // Se carregado
    if (isLoaded) {
        return (
            <div className="courses">
                <h1>CURSOS</h1>
                <ul className="course-list">
                    {courses.map(course => (
                        <li key={course._id}>
                            <div className="top">
                                <img src={require(`../../${course.cover}`)} alt="" />
                                <div className="title">
                                    <div><h1>{course.title}</h1></div>
                                    <span></span>
                                </div>
                            </div>
                            <div className="info">
                                <p>{course.subtitle}</p>
                            </div>
                            <button className="btn"><Link to={`/cursos/${course.url}`}>{course.release ? 'COMPRAR' : 'EM BREVE'}</Link></button>
                        </li>
                    ))}
                </ul>
            </div>
        )
        // Loading
    } else {
        return (
            <Loading />
        )
    }
}