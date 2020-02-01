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
                        <li className="user-email"><i className="far fa-user"></i> {userEmail}</li>
                        <li className="logout" onClick={logout}><i className="fas fa-sign-out-alt"></i> LogOut</li>
                    </React.Fragment>)
    }else{
        buttons = (
        <React.Fragment>   
            <li><Link to='/login'> <button className="login"><i className="fas fa-sign-in-alt"></i> Login</button></Link></li>
            <li><Link to='/signin'><button className="signin"><i className="fas fa-user-plus"></i> Signin</button></Link></li>
        </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <nav>
                <div className="container">
                    <input type="checkbox" id="check"/>
                    <label htmlFor="check" className="checkbtn">
                        <i className="fas fa-bars"></i>
                    </label>
                        <Link to='/'>
                                <img src={logo} alt="logo" height="45px" className="logo" width="55px"/>
                        </Link>
                    <ul className="menu__items-list">
                            <li><Link className="a"to='/'><i className="fas fa-home"></i> Home </Link></li>
                            <li><Link className="a"to='/photos'><i className="far fa-images"></i> Gallery </Link></li>
                            <li><Link className="a"to='/about'><i className="far fa-question-circle"></i> About </Link></li>
                            <span className="menu__btn">
                            {buttons}
                            </span>
                    </ul>
                </div>
            </nav>
        </React.Fragment>        
    )
}

export default withRouter(Nav);