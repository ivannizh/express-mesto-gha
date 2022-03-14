import {Link} from "react-router-dom";
import {useState} from "react";

export default function Register({handleSubmit}) {
    const initFormState = {'email': '', 'password': '',}
    const [formInputs, setFormInputs] = useState(initFormState)

    const onChange = (e) => {
        setFormInputs((prevState) => {
            return {
                ...prevState, [e.target.name]: e.target.value,
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formInputs);
    }

    return (<>
        <form className='auth-form__form' onSubmit={onSubmit}>
            <div>
                <h2 className='auth-form__caption'>Регистрация</h2>
                <input className="auth-form__input" id="user-email-input" name="email" placeholder="Email" required
                       type="email" onChange={onChange} autoComplete='email' value={formInputs.email}/>
                <input className="auth-form__input" id="user-password-input" name="password" placeholder="Пароль"
                       required type="password" onChange={onChange} autoComplete='new-password' value={formInputs.password}/>
            </div>
            <div>
                <button className='auth-form__button' type='submit'>Зарегистрироваться</button>

            </div>
        </form>
        <p className='auth-form__login-line'>Уже зарегистрированы?&nbsp;
            <Link className='auth-form__login-line' to='/sign-in'>Войти</Link></p>
    </>)
}

