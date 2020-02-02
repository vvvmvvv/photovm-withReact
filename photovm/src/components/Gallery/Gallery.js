import React, {useContext, useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import firebase from '../../firebase/config';
import {Photos} from '../../context/photosContext';

import "./Gallery.css"

const Gallery = () => {

    const {state} = useContext(Photos);
    const [photosCount, setPhotosCount] = useState(0);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('date');
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('allPhotos');
    const [currentUser, setCurrentUser] = useState(null);
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        firebase.getUserState().then(user =>{
            if(user){
                setUserState(user);
            }
        });
    });

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
                        <div className="photo-content" key={photo.id}>
                        <div className='photo' >
                            <Link to={'photos/' + photo.id}>
                                <p className="photo-title">{photo.data.title}</p>
                                <div style={{backgroundImage: 'url(' + photo.data.photography + ')' }}/>
                            </Link> 
                        </div>
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
                    <div className="functions__filter">
                    <span><i className="fas fa-filter"></i> Filter by: </span>
                    <select defaultValue={filter} onChange={(e) => filterHandler(e.target.value)}>
                        <option value="allPhotos">All photos</option>
                        <option value="myPhotos">My photos</option>
                        <option value="notMyPhotos">Not my photos</option>
                    </select>
                    </div>
                </React.Fragment>
                )
        }
    }

    const addButton = () => {
        if(userState != null){
            return (
                    <div className="add-block">
                         <Link to='/create'><button className="add-block__btn"><i className="far fa-folder-open"></i> Add Photo</button></Link> 
                    </div>
                )
            }
        }

    const isGalleryFilled = () => {
        if (isLoading) return (
            <div className="processing">
                <p>Photos gallery loading...</p>
                <div className="loader"></div>
            </div> 
            );

        if (photosCount) {
            return (
                <React.Fragment>
                    <div className="container">
                            <div className="main-wrapper">
                            <div className="galleryPage">
                                    <div className="galleryPage__header">
                                    <h1><i className="far fa-images"></i> Photos gallery</h1>
                                    </div>
                            </div>

                             <div className="functions">
                                 <div className="functions-top">
                                        <div className="functions__sorting">
                                            <span><i className="fas fa-sort-amount-down-alt"></i> Sorting by: </span>
                                            <select defaultValue={sort} onChange={(e) => sortHandler(e.target.value)}>
                                                <option value="date">Date</option>
                                                <option value="title">Title</option>
                                            </select>
                                            </div>

                                        {isFilterDisplayed()}
                                        
                                </div>
                            <div className="functions__search">
                                        <label><i className="fas fa-search"></i> Search by photos: </label>
                                        <input className="functions__search-input" type="search" value={search} onChange={(e) => searchHandler(e.target.value)} id="photos-search" name="search"/>
                                    </div>
                            </div>
                            {addButton()}
            <Pagination search={search} sort={sort} filter={filter} render={galleryRender}></Pagination>
                    </div>
                    </div>
                </React.Fragment>
            );
        } else if (!photosCount) {
            return (
                <React.Fragment>
                <p className="no-gallery">No photos! You can add photo, use button above!</p>
                {addButton()}
                </React.Fragment>
            );
        } 
    }

    return (
        isGalleryFilled()
    );
}

export default Gallery;

