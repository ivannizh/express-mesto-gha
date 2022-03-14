import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({_id, link, name, likes, owner, onCardClick, onCardLike,onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = (owner === currentUser._id);
    const cardLikeClasses = `card__like ${likes.some((like) => like === currentUser._id) && 'card__like_active'}`


    function onClick() {
        onCardClick({
            url:link,
            name: name,
        });
    }

    function handleLikeClick() {
        onCardLike({
            '_id': _id,
            'likes': likes
        })
    }
    function handleDeleteClick() {
        onCardDelete({
            '_id': _id
        })
    }

    return (
        <div className="card" >
            <img alt={name} className="card__img" src={link} onClick={onClick}/>
            {isOwn && <button aria-label="удалить" className="card__delete card__delete_active" onClick={handleDeleteClick} type="button"/>}
            <div className="card__caption">
                <h2 className="card__title">{name}</h2>
                <div className="card__like-group">
                    <button aria-label="оценить" className={cardLikeClasses} onClick={handleLikeClick} type="button"/>
                    <p className="card__like-counts">{likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;
