import React,{useState,useEffect} from 'react';
import './style.css';


export default (props) => {
    // Se for error
    const [isError,setIsError] = useState(false);
    useEffect(() => {   
        // Se verdadeiro exibe o alerta por 10 segundos
        let timer;
        if(props.isError || false) {
            setIsError(true);
            timer = setTimeout(() => { 
                setIsError(false);
            }, 10000);
        }
        return () => {
            clearTimeout(timer);
        }
    }, [props])

    return (
        <div className="main-wrapper">
            {props.children}
            { !props.isLoaded
            ?
                <div className="loading">            
                    <div>
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                </div>                                
            :                
                null
            }
            { isError
            ?
                <div className="error">Desculpe, houve um erro, tente novamente!</div>
            :
                null
            }            
        </div>
    )
}