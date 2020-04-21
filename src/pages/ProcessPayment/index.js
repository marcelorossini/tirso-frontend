import React, { useState, useEffect } from 'react';
import './style.css';

// Outras
import api from '../../services/api';
import Wrapper from '../../components/Wrapper'
import { checkErrors, capitalize } from '../../Helpers';

// Assets
import approved from '../../assets/payment/approved.svg'
import error from '../../assets/payment/error.svg'

// Processa pagamento
const ProcessPayment = ({ history, location, match }) => {
    // Loading e erros
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    // Status 
    const status = match.params.type;
    const search = window.location.search;
    // Dados do uso
    const [userData, setUserData] = useState({});
    const [courseTitle, setCourseTitle] = useState('');

    useEffect(() => {
        // Query Params
        const params = new URLSearchParams(search);
        // Verifica se deve salvar 
        // Pega id do MP
        const collection_id = params.get('collection_id');
        // Se houver a coleção
        if (collection_id !== null) {
            // Cria registro
            createOrder(params);
            // Se não houver usuário
        } else if (Object.keys(userData).length === 0) {
            history.push('/');
        }
    }, [search]);

    // Cria pagamento
    const createOrder = async (params) => {
        // Salva no banco
        const object = {
            _id: params.get('order'),
            collection_id: params.get('collection_id'),
            collection_status: params.get('collection_status'),
            external_reference: params.get('external_reference'),
            payment_type: params.get('payment_type'),
            merchant_order_id: params.get('merchant_order_id'),
            preference_id: params.get('preference_id'),
            site_id: params.get('site_id'),
            processing_mode: params.get('processing_mode'),
            merchant_account_id: params.get('merchant_account_id')
        };
        // Cria compra
        const response = await api.post('/order', object);
        // Verifica se há erros
        if (checkErrors(response)) {
            // Marca como carregado
            setIsError(true);
            return;
        }             
        // Pega dados do usuário e do curso
        setUserData(response.data.user);
        setCourseTitle(response.data.course.title);
        // Marca como carregado
        setIsLoaded(true);
        // Vai para oura rota e remove a query string
        history.push(location.pathname);
    }

    return (
        <Wrapper isLoaded={isLoaded} hideContent={true} isError={isError}>
            <div className="payment-status">
                <div>
                    {
                        status === 'aprovado'
                            ?
                            <div className="card">
                                <img src={approved} alt="" />
                                <strong>Olá, {userData.name}!<br/>Obrigado por comprar nosso Curso {capitalize(courseTitle)}!</strong>
                                <p>Os detalhes serão enviados no seu email {userData.email}.</p>
                            </div>
                            :
                            <div className="card">
                                <img src={error} alt="" />
                                <strong>Houve um erro!</strong>
                                <p>Tente realizar a compra novamente!</p>
                            </div>
                    }
                </div>
            </div>
        </Wrapper>
    )
}
export default ProcessPayment;