import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from '../../firebase/config';
import { Auth } from '../../context/authContext';

import "./Login.css"


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [routeRedirect, setRouteRedirect] = useState(false);
    const [error, setError] = useState('');

    const {dispatch} = React.useContext(Auth);

    const login = async(e) => {
        e.preventDefault();
        let response = await firebase.login(email, password);
        if(response.hasOwnProperty('message')){
            setError(response.message);
        }else{
            const {uid: id, email} = response.user;
            const user = {
                id,
                email
            };

            setRouteRedirect(true);

            return dispatch({
                type: 'LOGIN',
                payload: user
            });
        }

    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to='/' />
    }

    return (
        <React.Fragment>
            <div className="container">
            <form className="login-form" onSubmit={login}>
                <h3 className="login-form__header"><i className="fas fa-sign-in-alt"></i> Login</h3>

                <label htmlFor='email'><i className="fas fa-envelope-square"> Email:</i> </label>
                <input required type='email' name='email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password'><i className="fas fa-lock"> Password:</i> </label>
                <input required type='password' name='password' onChange={ (e) => setPassword(e.target.value) } />
                <hr/>
                <button className="login-form__btn" type='submit'>Login</button>
                {error ? <span>{error}</span> : null}
            </form>
            </div>
        </React.Fragment>
    )
}

export default Login;