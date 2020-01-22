import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

import {Photos} from '../context/photosContext';

const AllPhotos = () => {

    const{state} = React.useContext(Photos);
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        console.log('hi');
        if (state.photos) {
            setLoading(true);
        }
    }, [state.photos]);

    return (
        <React.Fragment>
            <h1> Photos gallery</h1>


            <div className='photos'>
                {loading 
                    ? state.photos.map(photo =>{
                        return(
                            <div className='photo' key={photo.id}>
                                <Link to={'photos/' + photo.id}>
                                    <div style={{backgroundImage: 'url(' + photo.data.photography + ')' }}/>
                                </Link> 
                            </div>
                        )
                }) : (<p>Loading...</p>)}
            </div>
            <Pagination></Pagination>
            
        </React.Fragment>
    );
}

export default AllPhotos;