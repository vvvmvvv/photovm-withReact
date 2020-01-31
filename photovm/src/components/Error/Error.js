import React from "react";
import "./Error.css"

import err_photo from '../../assets/images/404error.png'

const Error = () =>{
    return(
        <React.Fragment>
        <div className="container">
            <div className="main-wrapper">
                <img src={err_photo} alt="error" className="error-image"/>
                <p className="error-text">This page doesn`t exist!</p>
            </div>
        </div>
        </React.Fragment>

    );
}
export default Error;