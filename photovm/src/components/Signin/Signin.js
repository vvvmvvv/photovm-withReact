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
            <form className="signin-form"onSubmit={signin}>
                <h3 className="signin-form__header"><i className="fas fa-user-plus"></i> Signin</h3>

                <label htmlFor='email'><i className="fas fa-envelope-square"> Email:</i></label>
                <input required type='email' name='email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password'><i className="fas fa-lock"> Password:</i> </label>
                <input required type='password' name='password' onChange={ (e) => setPassword(e.target.value) } />
                <hr/>
                <button className="signin-form__btn" type='submit'>Create account</button>

            </form>
        </React.Fragment>

    )
}
export default Signin;