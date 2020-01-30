import React from 'react';
import "./About.css";


const About = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="about">
                        <div className="about__header">
                            <h1><i className="fas fa-angle-left"></i> About <i className="fas fa-angle-right"></i></h1>
                        </div>
                    <div className="contacts">
                        Lipkovskogo 16B
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    );
}

export default About;