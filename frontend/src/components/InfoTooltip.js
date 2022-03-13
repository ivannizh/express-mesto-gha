import React from "react";
import {useNavigate} from "react-router-dom";

function InfoTooltip({isOpen, onClose, isFailed}) {
    const navigate = useNavigate();

    const style = {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 900,
        fontsize: '24px',
        lineHeight: '29px',
        textAlign: 'center',
        color: '#000000'
    }

    const imgStyle = {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        marginBottom: '34px'
    }

    function onCloseHandler() {
        onClose();
        if (!isFailed) {
            navigate('/login');
        }
    }

    const imgUrl = isFailed ? require('../images/FailedPopup.png') : require('../images/SuccessPopup.png');
    const text = isFailed ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!';

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button aria-label="закрыть" className="popup__close" type="button" onClick={onCloseHandler}/>
                <img src={imgUrl} style={imgStyle} alt='success_img'/>
                <h2 className="popup__title" style={style}>{text}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip
