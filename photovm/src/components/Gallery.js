import React, {useContext, useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import firebase from '../firebase/config';
import {Photos} from '../context/photosContext';

const Gallery = () => {
    const {state} = useContext(Photos);
    const [photosCount, setPhotosCount] = useState(0); 
    
    useEffect(() => {
        async function fetchData() {
            const photosCount = await firebase.getPhotosLength();
            setPhotosCount(photosCount);
        };
        fetchData();
    }, []);

    const galleryRender = () => {
        return (
            <div className='photos'>
                {state.photos.map(photo => {
                    return(
                        <div className='photo' key={photo.id}>
                            <Link to={'photos/' + photo.id}>
                                <p>{photo.data.title}</p>
                                <div style={{backgroundImage: 'url(' + photo.data.photography + ')' }}/>
                            </Link> 
                        </div>
                    )
                })}
            </div>
        );
    }

    const isGalleryFilled = () => {
        if (photosCount) {
            return (
                <React.Fragment>
                    <h1> Photos gallery</h1>
                    <Pagination render={galleryRender}></Pagination>
                </React.Fragment>
            );
        } else {
            return (
                <p>No photos!</p>
            );
        } 
    }

    return (
        isGalleryFilled()
    );
}

export default Gallery;

