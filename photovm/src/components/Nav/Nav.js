import React, {useState, useEffect} from 'react';
import { Link, withRouter} from 'react-router-dom';

import firebase from '../../firebase/config'
import {Auth} from '../../context/authContext';

import "./Nav.css"
import logo from '../../assets/images/logotype.png';


const Nav = (props) => {
    const [userState, setUserState] = useState(null);
    const [userEmail, setUserEmail] = useState("");


    const {state, dispatch} = React.useContext(Auth);

    useEffect(() => {
        firebase.getUserState().then(user =>{
            if(user){
                setUserState(user);
                setUserEmail(user.email);
            }
        });
    });

    const logout = () =>{
        firebase.logout();
        setUserState(null);
        props.history.replace('/login');
        return dispatch({
            type: 'LOGOUT',
            payload: {}
        });
    }

    let buttons;
    if(userState != null || state.user.hasOwnProperty('user')){
        buttons = ( <React.Fragment>
                        <span><i className="far fa-user"></i> {userEmail}</span>
                        <button className="logout" onClick={logout}><i className="fas fa-sign-out-alt"></i> LogOut</button>
                    </React.Fragment>)
    }else{
        buttons = (
        <React.Fragment>   
            <Link to='/login'> <button className="login"><i className="fas fa-sign-in-alt"></i> Login</button></Link>
            <Link to='/signin'><button className="signin"><i className="fas fa-user-plus"></i> Signin</button></Link>
        </React.Fragment>
        )
    }


    return(
                
                 <nav className="nav">
                        <div className="container">
                            <div className="menu">
                                <div className="logo">
                                <Link to='/'>
                                    <img src={logo} alt="logo" height="50px" width="70px"/>
                                </Link>
                                </div>
                                <div className="menu__items">
                                        <ul className="menu__items-list">
                                            <li><Link to='/'><i className="fas fa-home"></i> Home </Link></li>
                                            <li><Link to='/photos'><i className="far fa-images"></i> Gallery </Link></li>
                                            <li><Link to='/about'><i className="far fa-question-circle"></i> About </Link></li>
                                        </ul>
                                </div>
                                <div className="menu__btn">
                                        {buttons}
                                </div>

                            </div>
                        
                        </div>

                 </nav>

    
        

    )
}
export default withRouter(Nav);