import React, {useState,useEffect} from 'react';
import './style.css';

import api from '../../services/api';

import approved from '../../assets/payment/approved.svg'
import error from '../../assets/payment/error.svg'

const PaymentStatus = ({ history, location, match }) => {
    const [status,setStatus] = useState('');
    const [name,setName] = useState('');
    const [userEmail,setUserEmail] = useState('');

    useEffect(() => {
        // Query Params
        const params = new URLSearchParams(window.location.search);
        // Guarda status
        setStatus(match.params.id);
        // Cria registro
        createOrder(params);
    },[userEmail]);

    const createOrder  = async (params) => {
        // Pega id do MP
        const collection_id = params.get('collection_id');
       
        // Verifica se deve salvar
        if ( collection_id !== null ) {
            // Salva no banco
            const object = {
                user: params.get('user'),
                course: params.get('course'),
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
            const response = await api.post('/order',object);  
            
            const userData = await api.get(`/user?_id=${object.user}`);  
            setName(userData.data[0].name);
            setUserEmail(userData.data[0].email);

            history.push(location.pathname);                      
        } 
    }    
    
    return (
        <div className="payment-status">
            <div>
                { status !== ''
                ?
                (
                    status === 'aprovado' 
                    ?
                        <div className="card">  
                            <img src={approved}/>
                            <strong>Obrigado por comprar o curso, {name}!</strong>
                            <p>Os detalhes serão enviados no email {userEmail}.</p>                      
                        </div>
                    :
                        <div className="card">    
                            <img src={error}/>
                            <strong>Houve um erro!</strong>
                            <p>Tente realizar a compra novamente!</p>                          
                        </div>                
                    
                )                
                :
                    null
                }
            </div>
        </div>
    )
}
export default PaymentStatus;