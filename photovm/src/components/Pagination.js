import React, {useEffect} from 'react';
import firebase from '../firebase/config';
import * as qs from 'query-string';
import {Photos} from '../context/photosContext';
import { useHistory, useLocation } from 'react-router-dom';

const Pagination = () => {
    const FIRST_PAGE = 1;
    const PHOTOS_PER_PAGE = 2;

    const history = useHistory();
    const location = useLocation();
    const {dispatch} = React.useContext(Photos);
    const [page, setPage] = React.useState(() => {
        const {page: pageFromUrl} = qs.parse(location.search);
        return +pageFromUrl || FIRST_PAGE;
    });
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
        if(!!allPhotos.length){
            if(page > pageCount) {
                
            }

            const firstPhotoIndexForPage = (page - 1) * PHOTOS_PER_PAGE;
            const arrayForPage = allPhotos.slice(firstPhotoIndexForPage, firstPhotoIndexForPage + PHOTOS_PER_PAGE);

            dispatchPhotosArray(arrayForPage);
        }
    }

    const getPhotos = async () => {
        const photos = await firebase.getPhotos();

        setAllPhotos(photos)

        const pageCount = Math.ceil(photos.length / PHOTOS_PER_PAGE);
        setPageCount(pageCount);

        setIsLoading(false);
    }

    const prevPageHandler = () => {
        setPage(prevPage => prevPage - 1);
    }

    const nextPageHandler = () => {
        setPage(prevPage => prevPage + 1);
    }

    useEffect(() => {
        getPhotos();
    },[]);

    useEffect(() => {
        if (isLoading) return;

        history.push(`/photos?page=${page}`);
        getPhotosPage(page);
    }, [page]);

    useEffect(() => {
        getPhotosPage(page);
    }, [isLoading]);

    const isCaratDisabled = (caratType) => {
        if (caratType === 'left' && page <= FIRST_PAGE) {
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