import React, {useState} from 'react';
import { withRouter, Link } from 'react-router-dom';
import './style.css';

import logo from '../../assets/logo.png';

const Header = ({ history }) => { 
    const [menuOpen,setMenuOpen] = useState(false);
    
    // Abre/Fecha menu
    const toggleMenu = (bClose = null) => {
        const menu = document.querySelector('header>nav');
        if (bClose === false) 
            menu.classList.remove('menu-open');        
        else    
            menu.classList.toggle('menu-open');

        setMenuOpen(menu.classList.contains('menu-open'));
    }

    return (
        <header className={history.location.pathname !== '/' ? 'with-background' : ''}>
            <Link to="/"><img src={logo} alt="logo"/></Link>      
            <button onClick={() => toggleMenu()}><i className="fas fa-bars"></i></button>
            <nav>
                <ul>
                    <li>
                        <Link to="/" onClick={() => toggleMenu(false)}>HOME</Link>                                            
                    </li>               
                    <li>
                        <Link to="/cursos" onClick={() => toggleMenu(false)}>CURSOS</Link>
                    </li>                                   
                    <li>
                        <Link to="/about" onClick={() => toggleMenu(false)}>SOBRE</Link>
                    </li>
                    {/*
                    <li>
                        <Link to="/" onClick={() => toggleMenu(false)}>ÁREA DO ALUNO <i className="fas fa-user"></i></Link>     
                    </li>
                    */}
                </ul>
            </nav>            
            <strong className="text">{ !menuOpen ? "FIQUE ENTRE O MELHORES, APRENDENDO DE FORMA PRATICA E SAIA NA FRENTE" : ""}</strong>
        </header>
    )
}
export default withRouter(Header);