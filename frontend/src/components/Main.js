import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="main page__container">
            <section className="profile">
                <img alt="Аватар профиля" className="profile__avatar" src={currentUser.avatar}/>
                <button aria-label="Обновить автарку" className="profile__avatar-edit" type="button"
                        onClick={onEditAvatar}/>
                <div className="profile__info">
                    <div className="profile__edit">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button aria-label="редактировать" className="profile__edit-button" type="button"
                                onClick={onEditProfile}/>
                    </div>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button aria-label="добавить" className="profile__add-new-place" type="button" onClick={onAddPlace}/>
            </section>
            <section className="cards">
                {
                    cards.map(({_id, ...cardInfo}) => {
                            return (
                                <Card
                                    key={_id}
                                    _id={_id}
                                    onCardLike={onCardLike}
                                    onCardDelete={onCardDelete}
                                    onCardClick={onCardClick}
                                    {...cardInfo}
                                />
                            )
                        }
                    )
                }
            </section>
        </main>
    )
}

export default Main
