import React from 'react';
import "./Main.css";
import s2 from '../../assets/images/s2.jpg';
import s3 from '../../assets/images/s3.jpg';
import s4 from '../../assets/images/s4.jpeg';
import s5 from '../../assets/images/s5.jpg';
import line from '../../assets/images/main-line.png';

const Main = () => {
    return (
        <React.Fragment>
            <div className="container">
            <header>

            <div className="main__info">
                        <div className="main__info-header">
                            <h1><i className="fas fa-angle-left"></i> PhotoVM <i className="fas fa-angle-right"></i></h1>
                            
                        </div>
                        <div className="main__info-line">
                            <img className="line-image"src={line} alt=""/>
                        </div>
                        <div className="main__info-description">
                            <h3><i className="fas fa-caret-right"></i> Internet photo album, photo sharing service <i
                                    className="fas fa-caret-left"></i></h3>
                        </div>
                    </div>

                <div className="wraper-slider">
                        <div className="slider">
                            <figure>
                                <img src={s2} alt="" height="500px"/>
                                <img src={s3} alt="" height="500px"/>
                                <img src={s4} alt="" height="500px"/>
                                <img src={s5} alt="" height="500px"/>
                            </figure>
                        </div>
                    </div>

            </header>
            </div>
            
        </React.Fragment>
    );
}

export default Main;