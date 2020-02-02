import React from 'react';

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
                    <hr/>
                    <div className="about">
                        <GoogleMap />
                        <div className="about__right">
                            <div className="about__right-top">
                            <p> PhotoVM - is company name powered by Vladimir Mikulin, amet consectetur adipisicing elit. Doloribus saepe aut fugit, nisi quod ex repellat eum maiores ea sunt voluptatum animi!
                                Eum minima corporis facilis quo! Consectetur, adipisci magnam pariatur delectus atque molestias. Numquam architecto sunt ipsum atque placeat dignissimos
                                soluta molestiae cupiditate repellat sapiente quaerat libero, illo ab cumque. Molestias quibusdam nihil explicabo harum aut adipisci sed, facilis blanditiis
                                perspiciatis illo, tempore recusandae nulla nam vitae rem est obcaecati soluta iusto modi numquam magni.
                            </p>
                            </div>
                             <div className="about__right-bottom">
                                    <div className="bottom-header">
                                        <h3><i class="fas fa-share"></i> Contact us</h3>
                                        <span>*We’re working hard to build a supportive, welcoming place for users</span>
                                    </div>
                                    <div className="bottom-icons">
                                        <a className="facebook" href="https://www.facebook.com/vladimir.mikulin.92"><i className="fab fa-facebook"></i></a>
                                        <a className="twitter"href="https://twitter.com/?lang=ru"><i className="fab fa-twitter"></i></a>
                                        <a className="linkedin" href="https://www.linkedin.com/in/vladimir-mikulin-54a670188/"><i className="fab fa-linkedin"></i></a>
                                        <a className="github" href="https://github.com/vvvmvvv"><i className="fab fa-github"></i></a>
                                    </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default About;