import React from 'react';
import './style.css';

import logo from '../../assets/logo.png';

export default () => {
    return (
        <footer>
            <img src={logo} alt="" />
            <div className="info">
                <b>Tirso Cursos e Treinamentos</b><br />
                <i className="fas fa-map-marker-alt"></i> Rua Marechal Deodoro, 947, Jaú/SP<br />
                <i className="fas fa-phone-alt"></i> (14) 3418-0141 / <a href="https://api.whatsapp.com/send?phone=5514981023111"><i className="fab fa-whatsapp"></i> (14) 98102-3111</a>
            </div>
            <div className="social">
                <a href="https://api.whatsapp.com/send?phone=5514981023111">
                    <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://www.facebook.com/tirsocursosetreinamentos/">
                    <i className="fab fa-facebook-square"></i>
                </a>
                <a href="https://www.instagram.com/tirsocursosetreinamentos/">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCMU66R0sAxETAHM4pyT3RYw">
                    <i className="fab fa-youtube"></i>
                </a>
            </div>
        </footer>
    )
}