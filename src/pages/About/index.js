import React from 'react';
import './style.css';

import tirso from '../../assets/about/tirso.jpg'

export default () => {
    return (
        <div className="about">     
            <div> 
                <div className="text">
                    <h1>TIRSO CURSOS E TREINAMENTOS</h1>
                    <br/>
                    <strong>A Empresa</strong>
                    <p>
                        Temos o objetivo de proporcionar aos alunos um treinamento virtual em um ambiente real de oficina, para que possa executar os serviços de forma pratica, fácil e segura tanto ao técnico, quanto ao cliente.<br/>
                        Com o aquecimento da economia, há mais vendas de motos novas, com a "crise" a maior vendas de motos usadas, em todas as opções é necessário uma demanda de profissionais nessa área de mecânica de motos.
                    </p>
                    <br/>
                    <strong>O Profissional</strong>
                    <p>Nosso objetivo é capacitar as pessoas que gostam de mecânica de motocicleta e formar profissionais nessa área para atuar no mercado de trabalho.</p>                
                </div>             
                <div className="profile">
                    <img src={tirso} alt="" />
                </div>                                           
            </div>
        </div>
    )
}