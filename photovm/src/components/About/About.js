import React from 'react';
import "./About.css";


const About = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="main-wrapper">
                            <div className="header-center">
                            <h1><i className="far fa-question-circle"></i> About</h1>
                            </div>
                        <div className="about">
                        <div className="map">
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.566607106507!2d30.453958815867544!3d50.44917279533769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce82b9bc8a47%3A0x47514e5d91216bf3!2sKiev%20Polytechnic%20Institute!5e0!3m2!1sru!2sua!4v1580474212781!5m2!1sru!2sua" width="500" height="400" frameBorder="0" allowFullScreen=""></iframe> */}
                        </div>
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