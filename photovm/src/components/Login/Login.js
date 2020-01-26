import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from '../../firebase/config';
import { Auth } from '../../context/authContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [routeRedirect, setRouteRedirect] = useState(false);

    const {dispatch} = React.useContext(Auth);

    const login = async(e) => {
        e.preventDefault();
        let response = await firebase.login(email, password);
        if(response.hasOwnProperty('message')){
            console.log(response.message);
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
            <form onSubmit={login}>
                <p>&nbsp;&gt;&nbsp;Login&nbsp;&lt;&nbsp;</p>

                <label htmlFor='email'>Email: </label>
                <input type='email' name='email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' onChange={ (e) => setPassword(e.target.value) } />
                <hr/>
                <input type='submit' value="Login"/>

            </form>
        </React.Fragment>
    )
}

export default Login;