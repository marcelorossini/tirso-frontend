import React, {useState,useEffect} from 'react';
import './style.css';

import { withRouter, Link } from 'react-router-dom';
import api from '../../services/api';

export default () => {
    const [courses,setCourses] = useState([]);
    useEffect(() => {
        const getCourseList = async () => {
            const courseList = await api.get('/course');
            setCourses(courseList.data);
        }
        getCourseList();
    }, [])
    
    return (
        <div className="courses">
            <h1>CURSOS</h1>
            <ul className="course-list">
            {courses.map(course => (
                <li key={course._id}>
                    <div className="top">
                        <img src={require(`../../${course.cover}`)} />
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
}