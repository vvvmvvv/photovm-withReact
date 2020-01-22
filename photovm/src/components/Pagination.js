import React, {useEffect} from 'react';
import firebase from '../firebase/config';

import {Photos} from '../context/photosContext';

const Pagination = () => {
    const FIRST_PAGE = 1;

    const {dispatch} = React.useContext(Photos);
    const [page, setPage] = React.useState(FIRST_PAGE);
    const [nextPage, setNextPage] = React.useState();
    const [prevPage, setPrevPage] = React.useState();
    const [pageCount, setPageCount] = React.useState(1);

    const dispatchPhotosArray = (photosArray) => {
        return dispatch({
            type: 'FETCH_PHOTOS',
            payload: photosArray
        });
    }

    const setPagesFunction = (next, prev) => {
        setNextPage(() => next);
        setPrevPage(() => prev);
    }

    const getPhotosPage = async () => {
        const {nextPage, prevPage, photosArray} = await firebase.getPhotosPage();
      
        setPagesFunction(nextPage, prevPage);

        dispatchPhotosArray(photosArray);
    }

    const getPhotosCount = async () => {
        const PHOTOS_PER_PAGE = 8;
        const photosCount = await firebase.getPhotosCount();
        console.log(photosCount);
        setPageCount(Math.ceil(photosCount / PHOTOS_PER_PAGE));
    }

    const prevPageHandler = async () => {
        if (page === FIRST_PAGE) {
            return;
        }

        setPage(page - 1);

        const photosArray = await prevPage();

        dispatchPhotosArray(photosArray);
    }

    const nextPageHandler = async () => {
        if (page >= pageCount) {
            return;
        }

        setPage(page + 1);

        const photosArray = await nextPage();

        dispatchPhotosArray(photosArray);
    }

    useEffect(() => {
        getPhotosPage();
        getPhotosCount();
    },[]);

    return (
        <React.Fragment>
            <div className="pagination">
                <button onClick={prevPageHandler} className="pagination__carat">{'<'}</button>
                <p>Page {page} of 10</p>
                <button onClick={nextPageHandler} className="pagination__carat">{'>'}</button>
            </div>
        </React.Fragment>
    );
}

export default Pagination;