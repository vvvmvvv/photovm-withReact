import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import firebase from '../firebase/config';
import {Photos} from '../context/photosContext';

const Gallery = () => {
    const {state} = React.useContext(Photos);
    const [photosCount, setPhotosCount] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        firebase.getPhotosCount()
            .then((photosCount) => {
                setPhotosCount(photosCount);
                setIsLoading(false);
            });
    }, []);

    const photos = () => {
        if (photosCount) {
            return (
                <React.Fragment>
                    <div className='photos'>
                        {state.photos.map(photo => {
                            return(
                                <div className='photo' key={photo.id}>
                                    <Link to={'photos/' + photo.id}>
                                        <div style={{backgroundImage: 'url(' + photo.data.photography + ')' }}/>
                                    </Link> 
                                </div>
                            )
                        })}
                    </div>
                    <Pagination></Pagination>
                </React.Fragment>
            );
        } else {
            return (<div>No photos!</div>)
        }
    } 

    return (
        <React.Fragment>
            <h1> Photos gallery</h1>

            {isLoading ? (<p>Loading...</p>) : photos()}
            
        </React.Fragment>
    );
}

export default Gallery;