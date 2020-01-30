import React, { useState } from 'react';
import firebase from '../../firebase/config';
import { Auth } from '../../context/authContext';
import {Redirect} from 'react-router-dom';

import "./Signin.css"

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [routeRedirect, setRouteRedirect] = useState(false);
    const {dispatch} = React.useContext(Auth);

    const signin = async(e) => {
        e.preventDefault();
        
        let response = await firebase.signin(email, password);
        if(response.hasOwnProperty('message')){
            console.log(response.message);
        }else{
            console.log(response.user);
            setRouteRedirect(true);
            return dispatch({
                type: 'SIGNIN',
                payload:response
            });
        }
     
    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to='/' />
    }

    return (
        <React.Fragment>
            <form class="signin-form"onSubmit={signin}>
                <p className="signin-form__header">Signin</p>

                <label htmlFor='email'>Email: </label>
                <input type='email' name='email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' onChange={ (e) => setPassword(e.target.value) } />
                <hr/>
                <button className="signin-form__btn" type='submit'>Create account</button>

            </form>
        </React.Fragment>

    )
}
export default Signin;