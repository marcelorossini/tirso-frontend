// React
import React, { useState, useEffect } from 'react';
import './style.css';

// Other
import api from '../../services/api';
import InputMask from 'react-input-mask';
import Wrapper from '../../components/Wrapper'
import { checkErrors } from '../../Helpers';

// Function
export default ({ history, match }) => {
    // Loading e erros
    const [isLoaded, setIsLoaded] = useState(false);
    const [hideContent, setHideContent] = useState(true);
    const [isError, setIsError] = useState(false);
    const [alert, setAlert] = useState('');
    
    // Dados do curso
    const [courseDetail, setCourseDetail] = useState({});
    useEffect(() => {   
        // Consulta dados do curso
        const getCourseDetail = async () => {
            const course = await api.get(`/course?url=${match.params.id}`);
            // Verifica se há erros
            if (checkErrors(course)) {
                setIsError(true);
                return;
            } 
            // Se não houver retorn volta para o inicio
            if (course.data.length === 0)
                history.push('/');
            setCourseDetail(course.data[0]);
            // Marca como carregado
            setIsLoaded(true);
        }
        getCourseDetail();
        return () => {
            setCourseDetail({});
        };
    }, [match])

    // Envia formulário
    const handleSendForm = async () => {
        // Pega dados do form
        const form = document.querySelector('.form-sale');
      
        // Verifica o campo nome
        const name = form.querySelector('[name=name]');
        inputError(name, true);
        if (name.value.length < 5) {
            inputError(name, false, 'Preencha o nome completo!');
        } else if (!name.value.includes(' ')) {
            inputError(name, false, 'Nome inválido!');
        }       
        // Verifica email
        const email = form.querySelector('[name=email]');
        inputError(email, true);
        if (email.value.length === 0) {
            inputError(email, false, 'Preencha o email!');
        } else if (!(/\S+@\S+\.\S+/.test(email.value))) {
            inputError(email, false, 'Email inválido!');
        }
        // Verifica telefone
        const phone = form.querySelector('[name=phone]');
        inputError(phone, true);
        if (phone.value.length === 0) {
            inputError(phone, false, 'Preencha o telefone / celular!');
        } else if (phone.value.length < 13) {
            inputError(phone, false, 'Verifique se o nome foi informado corretamente!');
        }

        // Verifica se há erros
        let countErrors = document.querySelectorAll(`.form-sale .error`);
        if (countErrors.length === 0) {
            // Cadastra usuário
            const response = await api.post('/user', {
                name: name.value,
                email: email.value,
                phone: phone.value
            });
            // Verifica se há erros
            if (checkErrors(response)) {
                // Marca como erro
                setIsError(true);
                return;
            }         
            // Não esconde o conteudo 
            setHideContent(false);                  
            const { _id: user } = response.data;
            // Se não houver erros
            if (courseDetail.release) {
                // Marca como carregando
                setIsLoaded(false);
                const response = await api.post('/order/checkout', { user, course: courseDetail._id });
                // Verifica se há erros
                if (checkErrors(response)) {
                    // Marca como carregado
                    setIsLoaded(true);
                    // Marca como erro
                    setIsError(true);
                    return;
                }
                // Mercado pago
                console.log(response.data);
                window.location.href = response.data.url;
            } else {
                // Marca como carregando
                setIsLoaded(false);
                const response = await api.post('/waiting/list', { user, course: courseDetail._id });
                // Verifica se há erros
                if (checkErrors(response)) {
                    // Marca como carregado
                    setIsLoaded(true);
                    // Marca como erro
                    setIsError(true);
                    return;
                }      
                // Marca como carregado
                setIsLoaded(true);
                setAlert('Você será avisado quando o curso estiver disponível!');                                                      
            }
        }
    }

    // Exibe o erro no form
    const inputError = (element, clear = false, message) => {
        // Form
        let form = document.querySelector(`.form-sale`);
        let elementName = element.name;

        // Remove erro
        element.classList.remove('error');
        // Remove labels de erros anteriores
        let oldLabel = form.querySelector(`[input="${elementName}"]`);
        if (oldLabel != null)
            oldLabel.remove();

        if (clear === true)
            return;

        // Add erro
        element.classList.add('error');

        // Cria label
        var label = document.createElement('label');
        label.innerHTML = message;
        label.classList.add('error')
        label.setAttribute('input', elementName)

        // Insere
        form.insertBefore(label, element);
    }

    // Se carregado
    return (
        <Wrapper isLoaded={isLoaded} hideContent={hideContent} isError={isError} alert={alert}>
            <div className="course-detail">
                <div>
                    <div className="card">
                        <div className="title">
                            <h1>CURSO {courseDetail.title}</h1>
                        </div>
                        <div className="subtitle">
                            {courseDetail.subtitle}
                        </div>
                        <div className="video">
                            { (courseDetail.video || '') !== ''
                            ?
                                <div className="video-wrapper">
                                    <iframe title="video" src={`//www.youtube.com/embed/${courseDetail.video}?autoplay=1`} frameBorder="0" allowFullScreen></iframe>
                                </div>                            
                            :
                                null
                            }                            
                        </div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: courseDetail.description }}></div>
                        <form className="form-sale" onSubmit={e => {e.preventDefault()}}>
                            <input type="text" name="name" placeholder="Nome Completo" onKeyPress={e => {
                                if (!(/^[a-zA-Z\s]*$/).test(e.key))
                                    e.preventDefault();
                            }}></input>
                            <input type="email" name="email" placeholder="Email"></input>
                            <InputMask mask="(99) 999999999" maskPlaceholder=" " type="text" name="phone" placeholder="Telefone / Celular" />
                            <button className="btn-comprar btn" type="button" onClick={() => handleSendForm()}>
                                {courseDetail.release ? "COMPRE AGORA" : "ME AVISE QUANDO DISPONÍVEL"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}