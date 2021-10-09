import { React, useRef } from 'react'
import { useAuthContext } from './AuthProvider'
import { useHistory } from 'react-router-dom';

export default function Login() {

    const username = useRef();
    const password = useRef();

    const { login } = useAuthContext();
    const history = useHistory();

    function loginHandler(e) {
        login(username.current.value, password.current.value)
            .then((resp) => history.push('/dashboard'))
            .catch((error) => console.log('Login Error'));
    }

    return (
        <div>
            <h3>Logowanie</h3>
            <input ref={username} type='text'/>
            <br/>
            <input ref={password} type='password'/>
            <br/>
            <button type="button" onClick={loginHandler}>login</button>
        </div>
    )
}
