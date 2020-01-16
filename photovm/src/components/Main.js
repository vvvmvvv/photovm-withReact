import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase/config';

import {Photos} from '../context/photosContext';

const Main = () => {

    const{state, dispatch} = React.useContext(Photos);

    const getPhotos = async() => {
        //let _photos = [];
        const photosArray = await firebase.getPhotos().catch(err => {
            console.log(err);
            return err;
        });

        /*
        photosArray.forEach(doc => {
            _photos.push({id:doc.id, data:doc.data});
            
        });
        */

        return dispatch({
            type: 'FETCH_PHOTOS',
            payload: photosArray
        });
    }


    useEffect(() => {
        getPhotos();
    },[])

    return (
        <React.Fragment>
            <header>
                <div>
                <h1> -Internet photo album, photo sharing service- </h1>
                </div>

            </header>

            <div className='photos'>
                {state.photos.map(photo =>{
                    return(
                        <div className='photo' key={photo.id}>
                            <Link to={'photo/' + photo.id}>
                                <div style={{backgroundImage: 'url(' + photo.data.photography + ')' }}/>
                            </Link>
                            </div>
                    )
                })}
            </div>
            
        </React.Fragment>
    );
}

export default Main;