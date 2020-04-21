// React
import React, { useState, useEffect } from 'react';
import './style.css';

// Other
import api from '../../services/api';
import InputMask from 'react-input-mask';
import Wrapper from '../../components/Wrapper'
import { checkErrors } from '../../Helpers';

// Function
export default (props) => {
    // Loading e erros
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [alert, setAlert] = useState('');
    // Dados do curso
    const [courseDetail, setCourseDetail] = useState({});
    useEffect(() => {   
        // Consulta dados do curso
        const getCourseDetail = async () => {
            const course = await api.get(`/course?url=${props.match.params.id}`);
            // Verifica se há erros
            if (checkErrors(course)) {
                setIsError(true);
                return;
            }                                  
            setCourseDetail(course.data[0]);
            // Marca como carregado
            setIsLoaded(true);
        }
        getCourseDetail();
        return () => {
            setCourseDetail({});
        };
    }, [props])

    // Envia formulário
    const handleSendForm = async (e) => {
        // Cancel submit
        e.preventDefault();

        // Pega dados do form
        let formData = new FormData(e.target);
        formData = Object.fromEntries(formData);

        // Verifica se os campos estão vazios        
        for (var key in formData) {
            let input = document.querySelector(`.form-sale > [name="${key}"]`);
            let value = formData[key].trim();
            // Limpa 
            inputError(input, true);
            // Verifica o campo nome
            if (key === 'name') {
                if (value.length < 5) {
                    inputError(input, false, 'Preencha o nome completo!');
                } else if (!value.includes(' ')) {
                    inputError(input, false, 'Nome inválido!');
                }
                // Verifica email
            } else if (key === 'email') {
                if (value.length === 0) {
                    inputError(input, false, 'Preencha o email!');
                } else if (!(/\S+@\S+\.\S+/.test(value))) {
                    inputError(input, false, 'Email inválido!');
                }
                // Verifica telefone
            } else if (key === 'phone') {
                if (value.length === 0) {
                    inputError(input, false, 'Preencha o telefone / celular!');
                } else if (value.length < 13) {
                    inputError(input, false, 'Verifique se o nome foi informado corretamente!');
                }
            }
        }

        // Verifica se há erros
        let countErrors = document.querySelectorAll(`.form-sale .error`);
        if (countErrors.length === 0) {
            // Cadastra usuário
            const response = await api.post('/user', formData);
            // Verifica se há erros
            if (checkErrors(response)) {
                // Marca como erro
                setIsError(true);
                return;
            }                           
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
                // Marca como carregado
                setIsLoaded(true);                
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
        <Wrapper isLoaded={isLoaded} isError={isError} alert={alert}>
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
                            <div className="video-wrapper">
                                <iframe title="video" src={`//www.youtube.com/embed/${courseDetail.video}?autoplay=1`} frameBorder="0" allowFullScreen></iframe>
                            </div>
                        </div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: courseDetail.description }}></div>
                        <form className="form-sale" onSubmit={e => { handleSendForm(e) }}>
                            <input type="text" name="name" placeholder="Nome Completo" onKeyPress={e => {
                                if (!(/^[a-zA-Z\s]*$/).test(e.key))
                                    e.preventDefault();
                            }}></input>
                            <input type="email" name="email" placeholder="Email"></input>
                            <InputMask mask="(99) 999999999" maskPlaceholder=" " type="text" name="phone" placeholder="Telefone / Celular" />
                            <button className="btn-comprar btn">
                                {courseDetail.release ? "COMPRE AGORA" : "ME AVISE QUANDO DISPONÍVEL"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}