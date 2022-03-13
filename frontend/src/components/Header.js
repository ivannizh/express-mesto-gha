import logo from "../images/logo.png";
import {Link, Route, Routes} from "react-router-dom";

import React from "react";

function Header({email, handleLogout}) {
    return (
        <header className="header">
            <img alt="Лого место" className="header__logo" src={logo}/>
            <div style={{display: 'inline', position: 'absolute', right: 0}}>
                <Routes>
                    <Route path='/sign-up' element={
                        <Link className='header__login-info' to='/sign-in'>Войти</Link>
                    }/>
                    <Route path='/sign-in' element={
                        <Link className='header__login-info' to='/sign-up'>Регистрация</Link>
                    }/>
                    <Route path='*' element={
                        <>
                            <p className='header__login-info'>{email}</p>
                            <Link className='header__exit' to='/sign-in'  onClick={handleLogout}>Выйти</Link>
                        </>
                    }/>
                </Routes>
            </div>
        </header>
    )
}

export default Header
