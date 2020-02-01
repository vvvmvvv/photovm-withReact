import React, {useState, useEffect} from 'react';
import "./About.css";

import GoogleMap from './GoogleMap';

const About = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="main-wrapper">
                    <div className="header-center">
                        <h1><i className="far fa-question-circle"></i> About</h1>
                    </div>
                    <div className="about">
                        <GoogleMap />
                        <div className="contacts">
                            Lipkovskogo 16-B
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default About;