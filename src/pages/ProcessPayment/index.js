import React, { useState, useEffect } from 'react';
import './style.css';

// Outras
import api from '../../services/api';
import LoadingAndErrorWrapper from '../../components/LoadingAndErrorWrapper'
import { checkErrors } from '../../Helpers';

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
        const user = params.get('user');
        const course = params.get('course');
        // Salva no banco
        const object = {
            user,
            course,
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
        // Pega dados do usuário
        const userData = await api.get(`/user?_id=${user}`);
        // Verifica se há erros
        if (checkErrors(userData)) {
            // Marca como carregado
            setIsError(true);
            return;
        }             
        setUserData(userData.data[0]);
        // Envia email
        const sendMail = await api.post('/mail/send',{
            user,
            course
        });
        // Verifica se há erros
        if (checkErrors(sendMail)) {
            // Marca como carregado
            setIsError(true);
            return;
        }    
        // Marca como carregado
        setIsLoaded(true);
        // Vai para oura rota e remove a query string
        history.push(location.pathname);
    }

    return (
        <LoadingAndErrorWrapper isLoaded={isLoaded} isError={isError}>
            <div className="payment-status">
                <div>
                    {
                        status === 'aprovado'
                            ?
                            <div className="card">
                                <img src={approved} alt="" />
                                <strong>Obrigado por comprar o curso, {userData.name}!</strong>
                                <p>Os detalhes serão enviados no email {userData.email}.</p>
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
        </LoadingAndErrorWrapper>
    )
}
export default ProcessPayment;