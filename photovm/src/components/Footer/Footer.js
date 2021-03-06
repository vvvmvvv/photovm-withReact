import React from 'react';
import {withRouter} from 'react-router-dom';

import "./Footer.css"


const Footer = () => {

    return(
        <React.Fragment>
            <footer>
                <div className="container">
                <div className="row">
                    <p className="footer-text"><i className="far fa-copyright"></i> Copyright 2020 
                    <a href="https://www.instagram.com/vladeyumirom111/?hl=ru">
                        <i className="fab fa-instagram"></i> Vladimir Mikulin
                    </a>
                   <span className="footer-text-third"> All Rights Reserved</span></p>
                </div>
                </div>
            </footer>
        </React.Fragment>        
    )
}

export default withRouter(Footer);