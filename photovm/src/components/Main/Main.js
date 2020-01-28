import React from 'react';
import "./Main.css";
import s2 from '../../assets/images/s2.jpg';
import s3 from '../../assets/images/s3.jpg';
import s4 from '../../assets/images/s4.jpeg';
import s5 from '../../assets/images/s5.jpg';


const Main = () => {
    return (
        <React.Fragment>
            <div className="container">
            <header>
                <div>
                <h1>&nbsp;&gt;&nbsp;Internet photo album </h1>
                 <div className="textHeader">photo sharing service</div>
                </div>

                <div className="wraper-slider">
                        <div className="slider">
                            <figure>
                                <a href="#"><img src={s2} alt="" height="700px"/></a>
                                <a href="#"><img src={s3} alt="" height="700px"/></a>
                                <a href="#"><img src={s4} alt="" height="700px"/></a>
                                <a href="#"><img src={s5} alt="" height="700px"/></a>
                            </figure>
                        </div>
                    </div>

            </header>
            </div>
            
        </React.Fragment>
    );
}

export default Main;