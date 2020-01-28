import React, {useState, useEffect} from 'react';
import { Link, withRouter} from 'react-router-dom';
import "./Nav.css"

import firebase from '../../firebase/config'
import {Auth} from '../../context/authContext';


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
                        <button><Link to='/create'> Add new Photo </Link></button>
                        <a>{userEmail}</a>
                        <button className="logout" onClick={logout}>LogOut</button>
                    </React.Fragment>)
    }else{
        buttons = (
        <React.Fragment>
            <button><Link to='/signin'>SignIn</Link></button>    
            <button><Link to='/login'>LogIn</Link></button>
        </React.Fragment>
        )
    }


    return(
                
                 <nav className="nav">
                        <div className="container">
                            <div class="menu">
                                <div class="logo">
                                    <button><Link to='/'> PHOTOVM </Link></button>
                                </div>
                                <div class="menu__items">
                                        <ul class="menu__items-list">
                                            <li><Link to='/'> Home </Link></li>
                                            <li><Link to='/photos'> Gallery </Link></li>
                                            <li><Link to='/about'> About </Link></li>
                                        </ul>
                                </div>
                                <div class="menu__btn">
                                        {buttons}
                                </div>
                            </div>
                        
                        </div>

                 </nav>

        // <nav className="nav">

        //     <ul>
        //         <li><Link to='/'> PhotoVM </Link></li>
        //     </ul>

        //     <ul>
        //         <li><Link to='/about'> About </Link></li>
        //         <li><Link to='/photos'> Gallery </Link></li>
        //         {buttons}
        //     </ul>
        // </nav>
        

    )
}
export default withRouter(Nav);