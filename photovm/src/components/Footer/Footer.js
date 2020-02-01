import React from 'react';
import { Link, withRouter} from 'react-router-dom';

import "./Footer.css"


const Footer = () => {

    return(
        <React.Fragment>
            <footer>
                <div className="container">
                <div className="row">
                    <p className=""><i className="far fa-copyright"></i> Copyright 2020 <Link
                            to="https://www.instagram.com/vladeyumirom111/?hl=ru"><i className="fab fa-instagram"></i>
                            Vladimir Mikulin</Link> All
                        Rights Reserved</p>
                </div>
                </div>
            </footer>
        </React.Fragment>        
    )
}

export default withRouter(Footer);