import React, { useState } from 'react';
import firebase from '../firebase/config';
import { Auth } from '../context/authContext';

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {state, dispatch} = React.useContext(Auth);

    const signin = async(e) => {
        e.preventDefault();
        
        let response = await firebase.signin(email, password);
        if(response.hasOwnProperty('message')){
            console.log(response.message);
        }else{
            console.log(response.user);
            return dispatch({
                type: 'SIGNIN',
                payload:response
            });
        }
     
    }

    return (
        <React.Fragment>
            <form onSubmit={signin}>
                <p>Create an Account:</p>

                <label htmlFor='email'>Email: </label>
                <input type='email' name='email' onChange= {(e) => setEmail(e.target.value)} />

                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' onChange= { (e) => setPassword(e.target.value) } />

                <input type='submit' value="Create account"/>

            </form>
        </React.Fragment>

    )
}
export default Signin;