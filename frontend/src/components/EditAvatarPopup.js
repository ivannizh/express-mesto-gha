import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const newUrlRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar(newUrlRef.current.value);
    }

    return (
        <PopupWithForm name='edit-avatar' title='Редактировать аватар' isOpen={isOpen} handleSubmit={handleSubmit}
                       onClose={onClose} buttonText='Обновить'>
            <input className="popup__input popup__input_type_avatar-url" id="avatar-url-input" name="avatarUrl"
                   placeholder="Ссылка на новую аватарку" required type="url" ref={newUrlRef}/>
            <span className="popup__input-error avatar-url-input-error"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
