import React, {useContext, useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import firebase from '../../firebase/config';
import {Photos} from '../../context/photosContext';

const Gallery = () => {
    const {state} = useContext(Photos);
    const [photosCount, setPhotosCount] = useState(0);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('date');
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('allPhotos');
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            const photosCount = await firebase.getPhotosLength();
            const user = await firebase.getUserState();

            if(user){
                setCurrentUser(user);
            }

            setPhotosCount(photosCount);
            setIsLoading(false);
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

    const searchHandler = (value) => {
        setSearch(value);
    }

    const sortHandler = (value) => {
        setSort(value);
    }

    const filterHandler = (value) => {
        setFilter(value);
    }

    const isFilterDisplayed = () => {
        if (currentUser) {
            return (
                <React.Fragment>
                    <br/>
                    <br/>
                    <span>Filter by: </span>
                    <select defaultValue={filter} onChange={(e) => filterHandler(e.target.value)}>
                        <option value="allPhotos">All Photos</option>
                        <option value="myPhotos">My Photos</option>
                    </select>
                </React.Fragment>
            )
        }
    }

    const isGalleryFilled = () => {
        if (isLoading) return (
            <div className="processing">
                <p>Photos loading...</p>
                <div className="loader"></div>
            </div>
        );

        if (photosCount) {
            return (
                <React.Fragment>
                    <div className="container">
                    <h1> Photos gallery</h1>
                    <hr/>
                    <label htmlFor="site-search">Search by photos: </label>
                    <input type="search" value={search} onChange={(e) => searchHandler(e.target.value)} id="photos-search" name="search"/>
                    <hr/>
                    <span>Sorting by: </span>
                    <select defaultValue={sort} onChange={(e) => sortHandler(e.target.value)}>
                        <option value="date">Date</option>
                        <option value="title">Title</option>
                    </select>
                    {isFilterDisplayed()}
                    <hr/>
                    <Pagination search={search} sort={sort} filter={filter} render={galleryRender}></Pagination>
                    </div>
                </React.Fragment>
            );
        } else if (!photosCount) {
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

