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
                        Temos o objetivo de proporcionar aos alunos um treinamento virtual em um ambiente real de oficina, para que possa executar os serviços de forma prática, fácil e segura tanto ao técnico, quanto ao cliente.<br/>
                        Com o aquecimento da economia, há mais vendas de motos novas, com a "crise" a maior vendas de motos usadas, em todas as opções é necessário uma demanda de profissionais nessa área de mecânica de motos.
                    </p>
                    <br/>
                    <strong>O Profissional</strong>
                    <p>A mais de 18 anos no ramo de motocicleta, a mais de 12 anos com empresa própria de peças e oficina para motos de todas as marcas, mais de 6 anos em concessionária e a mais de 5 anos trabalhando com escola de mecânica de motos, formando profissionais capacitados para o trabalho.
Nossa maior satisfação é a transferência de conhecimento que acumulamos ao longo desses anos de trabalho e o melhor além do conhecimento técnico a prática, que podemos estar passando para os nossos alunos.</p>
                </div>             
                <div className="profile">
                    <img src={tirso} alt="" />
                </div>                                           
            </div>
        </div>
    )
}