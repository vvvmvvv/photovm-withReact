import React, {useContext}  from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import {Photos} from '../context/photosContext';

const Gallery = () => {
    const {state} = useContext(Photos);
    
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

    return (
        <React.Fragment>
            <h1> Photos gallery</h1>
            <Pagination render={galleryRender}></Pagination>
            
        </React.Fragment>
    );
}

export default Gallery;

