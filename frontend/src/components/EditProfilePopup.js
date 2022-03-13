import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext);


    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {

        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='profile-edit' title='Редактировать профиль' handleSubmit={handleSubmit} isOpen={isOpen}
                       onClose={onClose} buttonText='Сохранить'>
            <input className="popup__input popup__input_type_name" id="name-input" maxLength="40" minLength="2"
                   name="name" placeholder="Имя и фамилия" value={name || '' } onChange={handleChangeName} required
                   type="text"/>
            <span className="popup__input-error name-input-error"/>
            <input className="popup__input popup__input_type_about" id="about-input" maxLength="200"
                   minLength="2" name="about" placeholder="Род деятельности" value={description || '' }
                   onChange={handleChangeDescription} required type="text"/>
            <span className="popup__input-error about-input-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup
