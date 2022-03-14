import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import React, {useEffect} from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import RequireAuth from "./RequireAuth";
import InfoTooltip from "./InfoTooltip";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
    const [isInfoTooltipFail, setIsInfoTooltipFail] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [userEmail, setUserEmail] = React.useState('')

    const navigate = useNavigate();
    const location = useLocation();

    function handleLogin() {
        setLoggedIn(true);

        // localStorage.setItem('jwt', token);
        navigate('/');
    }

    function handleLogout() {
        setLoggedIn(false);
        api.signout().then(() => {navigate('/sign-in')}).catch(err => console.log(err));
        // localStorage.removeItem('jwt');
    }

    function handleEmailChange(newEmail) {
        setUserEmail(newEmail);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
        }).catch(err => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        }).catch(err => console.log(err));
    }

    function handleTokenCheck(path) {
            api.getUserInfo()
                .then((res) => {
                        setUserEmail(res.user.email);
                        setLoggedIn(true);
                        navigate(path);
                    }
                )
                .catch((err) => {
                    console.log(err)
                });
    }

    useEffect(() => {
        handleTokenCheck(location.pathname);
    }, [])

    useEffect(() => {
        if (!loggedIn) {
            return
        }
        api.getCards()
            .then(
                (data) => {
                    console.log(data);
                    setCards(data.data);
                }
            )
            .catch(err => console.log(err))

        api.getUserInfo()
            .then(
                (userInfo) => {
                    setCurrentUser(userInfo.user);
                }
            )
            .catch(err => console.log(err))
    }, [loggedIn])


    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard(null);
    }

    function handleInfoTooltipOpen() {
        setIsInfoTooltipOpen(true);
    }


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(info) {
        api.updateUserInfo(info).then((userInfo) => {
            setCurrentUser(userInfo.data);
            closeAllPopups();
        }).catch(err => console.log(err))
    }

    function handleUpdateAvatar(url) {
        api.updateAvatar(url).then((userInfo) => {
            setCurrentUser(userInfo.data);
            closeAllPopups();
        }).catch(err => console.log(err))
    }

    function handleAddPlace(cardInfo) {
        api.addNewCard(cardInfo).then(
            (newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            }
        ).catch(err => console.log(err))
    }

    function handleSubmitRegister(data) {
        api.signup(data)
            .then((resp) => {
                handleEmailChange(resp.email);
                setIsInfoTooltipFail(false);
                handleInfoTooltipOpen();
            })
            .catch((err) => {
                console.log(err)
                setIsInfoTooltipFail(true)
                handleInfoTooltipOpen();
            })
    }

    function handleSubmitLogin(data) {
        api.signin(data)
            .then(() => {
                // if (resp.token) {
                    handleLogin();
                // }
            })
            .catch((err) => {
                console.log(err);
                setIsInfoTooltipFail(true);
                handleInfoTooltipOpen();
            })
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header email={userEmail} handleLogout={handleLogout}/>
                <Routes>
                    <Route path='/sign-up' element={
                        <Register handleSubmit={handleSubmitRegister}/>
                    }/>
                    <Route path='/sign-in' element={
                        <Login email={userEmail} handleSubmitLogin={handleSubmitLogin}/>
                    }/>
                    <Route path='*' element={
                        <RequireAuth loggedIn={loggedIn}>
                            <Main
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                            <Footer/>
                        </RequireAuth>
                    }/>

                </Routes>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>
                <InfoTooltip isOpen={isInfoTooltipOpen} isFailed={isInfoTooltipFail} onClose={closeAllPopups}/>

                <AddPlacePopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlace}/>
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
