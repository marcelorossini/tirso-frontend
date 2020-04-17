// React
import React, { useState, useEffect } from 'react';
import './style.css';

// Outros
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default () => {
    // Cursos
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const getCourseList = async () => {
            // Cursos
            const courseList = await api.get('/course');
            setCourses(courseList.data);
        }
        getCourseList();
    }, []);

    // Animação
    let wait = 10;
    useEffect(() => {
        let oTimer;
        // Se os cursos já foram carregados
        if (courses.length > 0) {
            // Inicia animação
            animationHome();
            // Timer a cada 1 segundo
            oTimer = setInterval(() => {
                // Tira 1 segundo
                wait--;
                // Se o tempo zerou, muda o slide
                if (wait === 0) {
                    animationHome('>');
                    wait = 10;
                }
            }, 1000);
        }
        return () => {
            clearInterval(oTimer);
        };
    }, [courses]);

    let prevItem;
    let atualItem = 0;
    const animationHome = (sPrevNext) => {
        // Slider
        let sliderItems = [...document.querySelectorAll('.slider > .images > li')];
        // Remove de todos 
        sliderItems.map((li, n) => {
            li.classList.remove('prev-item');
            li.classList.remove('active-item');
            return li;
        });
        // Ajusta contador
        prevItem = sPrevNext === '' ? (sliderItems.length - 1) : atualItem;
        if (sPrevNext === '>') {
            atualItem = atualItem === (sliderItems.length - 1) ? 0 : atualItem + 1;
        } else if (sPrevNext === '<') {
            atualItem = atualItem === 0 ? (sliderItems.length - 1) : atualItem - 1;
        }
        // Se for o ultimo não precisa
        sliderItems[prevItem].classList.add('prev-item');
        sliderItems[atualItem].classList.add('active-item');
    }

    // Slide anterior
    const handlePrev = () => {
        wait = 10;
        animationHome('<');
    }

    // Proximo slide
    const handleNext = () => {
        wait = 10;
        animationHome('>');
    }

    return (
        <div className="slider">
            <div className="prev-image" onClick={() => handlePrev()}>
                <i className="fas fa-caret-left"></i>
            </div>
            <ul className="images">
                {courses.map(course => (
                    <li key={course._id}>
                        <div className="info">
                            <strong>{course.title}</strong>
                            <p>{course.subtitle}</p>
                            <button className="btn"><Link to={`/cursos/${course.url}`}>SAIBA MAIS</Link></button>
                        </div>
                        <img src={require(`../../${course.cover}`)} alt="" />
                    </li>
                ))}
            </ul>
            <div className="next-image" onClick={() => handleNext()}>
                <i className="fas fa-caret-right"></i>
            </div>
        </div>
    )
}