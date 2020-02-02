import React from 'react';
import { Link} from 'react-router-dom';

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
                            <div class="about__right-top">
                            <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus saepe aut fugit, nisi quod ex repellat eum maiores ea sunt voluptatum animi!
                                Eum minima corporis facilis quo! Consectetur, adipisci magnam pariatur delectus atque molestias. Numquam architecto sunt ipsum atque placeat dignissimos
                                soluta molestiae cupiditate repellat sapiente quaerat libero, illo ab cumque. Molestias quibusdam nihil explicabo harum aut adipisci sed, facilis blanditiis
                                perspiciatis illo, tempore recusandae nulla nam vitae rem est obcaecati soluta iusto modi numquam magni.
                            </p>
                            </div>
                             <div class="about__right-bottom">
                                    <div class="bottom-header">
                                        <h3>Contact us</h3>
                                        <span>*We wait for you !</span>
                                    </div>
                                    <div class="bottom-icons">
                                        <Link className="facebook" to="https://www.facebook.com/vladimir.mikulin.92" ><i class="fab fa-facebook"></i></Link>
                                        <Link className="twitter"to="https://twitter.com/?lang=ru"><i class="fab fa-twitter"></i></Link>
                                        <Link className="linkedin" to="https://www.linkedin.com/in/vladimir-mikulin-54a670188/"><i class="fab fa-linkedin"></i></Link>
                                        <Link className="github" to="https://github.com/vvvmvvv"><i class="fab fa-github"></i></Link>
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