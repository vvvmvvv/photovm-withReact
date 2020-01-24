import React, {useEffect} from 'react';
import firebase from '../firebase/config';

import {Photos} from '../context/photosContext';

const Pagination = () => {
    const FIRST_PAGE = 1;
    const PHOTOS_PER_PAGE = 2;

    const {dispatch} = React.useContext(Photos);
    const [page, setPage] = React.useState(FIRST_PAGE);
    const [pageCount, setPageCount] = React.useState(0);
    const [allPhotos, setAllPhotos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const dispatchPhotosArray = (photos) => {
        return dispatch({
            type: 'FETCH_PHOTOS',
            payload: photos
        });
    }

    const getPhotosPage = (page) => {
        console.log(page, !!allPhotos.length);
        if(!!allPhotos.length){
            if(page > pageCount) return;

            const firstPhotoIndexForPage = (page - 1) * PHOTOS_PER_PAGE;
            const arrayForPage = allPhotos.slice(firstPhotoIndexForPage, firstPhotoIndexForPage + PHOTOS_PER_PAGE);
            console.log(firstPhotoIndexForPage, arrayForPage);
            dispatchPhotosArray(arrayForPage);
        }
    }

    const getPhotos = async () => {
        const photos = await firebase.getPhotos();

        setAllPhotos(photos);

        setIsLoading(false);
    }

    const prevPageHandler = () => {
        setPage(page - 1);
    }

    const nextPageHandler = () => {
        setPage(page + 1);
    }

    useEffect(() => {
        getPhotos();
    },[]);

    useEffect(() => {
        getPhotosPage(page);
    }, [page]);

    useEffect(() => {
        if (allPhotos && allPhotos.length) {
            const pageCount = Math.ceil(allPhotos.length / PHOTOS_PER_PAGE);
            setPageCount(pageCount);
        }
    }, [isLoading]);

    useEffect(() => {
        getPhotosPage(FIRST_PAGE);
    }, [pageCount]);

    const isCaratDisabled = (caratType) => {
        if (caratType === 'left' && page === FIRST_PAGE) {
            return true;
        }

        if (caratType === 'right' && page >= pageCount) {
            return true;
        }

        return false;
    }

    return (
        <React.Fragment>
            <div className="pagination">
                <button onClick={prevPageHandler} disabled={isCaratDisabled('left')} className="pagination__carat">{'<'}</button>
                <p>Page {page} of {pageCount}</p>
                <button onClick={nextPageHandler} disabled={isCaratDisabled('right')} className="pagination__carat">{'>'}</button>
            </div>
        </React.Fragment>
    );
}

export default Pagination;