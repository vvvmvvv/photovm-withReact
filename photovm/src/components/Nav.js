import React, {userState, useEffect} from 'react';
import { Link, withRouter} from 'react-router-dom';

import {Auth } from '../context/authContext';


const Nav = () => {
    return(
        <nav>
            <ul>
                <li><Link to='/'> PhotoVM </Link></li>
            </ul>

            <ul>
                <li><Link to='/create'> Add new Photo </Link></li>
            </ul>
        </nav>

    )
}
export default Nav;