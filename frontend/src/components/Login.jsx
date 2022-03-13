import {useEffect, useState} from "react";

export default function Login({email, handleSubmitLogin}) {
    const initFormState = {'email': '', 'password': ''}
    const [formInputs, setFormInputs] = useState(initFormState)

    const onChange = (e) => {
        setFormInputs((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            }
        })
    }

    useEffect(() => {
        if (email !== '') {
            setFormInputs((prevState) => ({
                ...prevState,
                email
            }))
        }
    }, [email]);

    const onSubmit = (e) => {
        e.preventDefault();

        handleSubmitLogin(formInputs);
    }
    return (
        <form className='auth-form__form' onSubmit={onSubmit}>
            <div>
                <h2 className='auth-form__caption'>Вход</h2>
                <input className="auth-form__input" id="user-email-input" name="email" placeholder="Email" required
                       type="email" onChange={onChange} value={formInputs.email}/>
                <input className="auth-form__input" id="user-password-input" name="password" placeholder="Пароль"
                       required onChange={onChange} type='password' value={formInputs.password}/>
            </div>
            <div>
                <button className='auth-form__button' type='submit'>Войти</button>
            </div>
        </form>
    )
}
