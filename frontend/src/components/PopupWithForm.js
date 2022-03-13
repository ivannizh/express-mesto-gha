function PopupWithForm({name, title, isOpen, onClose, children, buttonText, handleSubmit}) {
    return (
        <div className={`popup popup_type_${name}} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button aria-label="закрыть" className="popup__close" type="button" onClick={onClose}/>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={name} onSubmit={handleSubmit}>
                    {children}
                    <button className="popup__button" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm
