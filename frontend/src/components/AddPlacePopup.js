import PopupWithForm from "./PopupWithForm";
import React, {useEffect} from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: url,
        });
    }

    useEffect(
        () => {
            setUrl('');
            setName('');
        }
    , [isOpen])
    return (
        <PopupWithForm name='new-place' title='Новое место' isOpen={isOpen}
                       onClose={onClose} buttonText='Создать' handleSubmit={handleAddPlaceSubmit}>
            <input className="popup__input popup__input_type_place-name" id="place-name-input" name="place_name"
                   maxLength="30" minLength="2" placeholder="Название" onChange={(e) => setName(e.target.value)} required value={name} type="text"/>
            <span className="popup__input-error place-name-input-error"/>
            <input className="popup__input popup__input_type_place-url" id="place-url-input" name="place_url"
                   placeholder="Ссылка на картинку" required onChange={(e) => setUrl(e.target.value)} value={url} type='url'/>
            <span className="popup__input-error place-url-input-error"/>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
