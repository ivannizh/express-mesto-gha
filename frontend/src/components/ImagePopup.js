function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image ${card && 'popup_opened'}`}>
            <div className="popup__image-container">
                <button aria-label="закрыть" className="popup__close" type="button"
                        onClick={onClose}/>
                <img className="popup__image" src={card?.url} alt={card?.name}/>
                <p className="popup__image-caption">{card?.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;
