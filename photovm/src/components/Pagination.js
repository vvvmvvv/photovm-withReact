import React, {useState, useEffect, useContext} from 'react';
import firebase from '../firebase/config';
import * as qs from 'query-string';
import {Photos} from '../context/photosContext';
import { useHistory, useLocation } from 'react-router-dom';

const Pagination = ({search, render, sort, filter}) => {
    const FIRST_PAGE = 1;
    const PHOTOS_PER_PAGE = 2;

    const history = useHistory();
    const location = useLocation();
    const {dispatch} = useContext(Photos);
    const [page, setPage] = useState(() => {
        const {page: pageFromUrl} = qs.parse(location.search);
        return +pageFromUrl || FIRST_PAGE;
    });
    const [pageCount, setPageCount] = useState(0);
    const [allPhotos, setAllPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredPhotosInitialized, setFilteredPhotosInitialized] = useState(false);
    const [user, setUser] = useState(null);

    const dispatchPhotosArray = (photos) => {
        return dispatch({
            type: 'FETCH_PHOTOS',
            payload: photos
        });
    }

    const getPhotosPage = (page) => {
        if(!!filteredPhotos.length){
            if(page > pageCount) {
                setPage(pageCount);
                return;
            }
            if(page < FIRST_PAGE){
                setPage(FIRST_PAGE);
                return;
            }

            const firstPhotoIndexForPage = (page - 1) * PHOTOS_PER_PAGE;
            const arrayForPage = filteredPhotos.slice(firstPhotoIndexForPage, firstPhotoIndexForPage + PHOTOS_PER_PAGE);

            dispatchPhotosArray(arrayForPage);
        } else {
            dispatchPhotosArray([]);
        }
    }

    const filterPhotos = () => {
        let newArray = [...allPhotos];

        if (filter === 'myPhotos') {
            newArray = [...newArray].filter(({data: photo}) => {
                return photo.author === user.email
            });
        }

        if (sort === 'date') {
            newArray = [...newArray].sort((a, b) => b.data.date - a.data.date);
        }

        if (sort === 'title') {
            newArray = [...newArray].sort((a, b) => {
                const [aTitle, bTitle] = [a.data.title.toLowerCase(), b.data.title.toLowerCase()];

                if (aTitle > bTitle) return 1;
                if (bTitle > aTitle) return -1;
                return 0;
            });
        }
        
        if (search !== '') {
            newArray = [...newArray].filter(({data: photo}) => {
                return photo.title.toLowerCase().includes(search.toLowerCase().trim());
            });
        }
        
        setFilteredPhotos(newArray);
        setPagesCount(newArray.length);
        setFilteredPhotosInitialized(true);
    }

    const getPhotos = async () => {
        const photos = await firebase.getPhotos();
        
        setAllPhotos(photos);
        setFilteredPhotos(photos);
        setPagesCount(photos.length);
        setIsLoading(false);
    }

    const setPagesCount = (arrayLength) => {
        const pageCount = Math.ceil(arrayLength / PHOTOS_PER_PAGE);
        setPageCount(pageCount);
    }

    const prevPageHandler = () => {
        setPage(prevPage => prevPage - 1);
    }

    const nextPageHandler = () => {
        setPage(prevPage => prevPage + 1);
    }
    const firstPageHandler = () => {
        setPage(FIRST_PAGE);
    }

    const lastPageHandler = () => {
        setPage(pageCount);
    }

    useEffect(() => {
        firebase.getUserState().then((user) => {
            if (user) {
                setUser(user);
            }
        })
        getPhotos();
    },[]);

    useEffect(() => {
        if (isLoading) return;

        history.push(`/photos?page=${page}`);
        getPhotosPage(page);
    }, [page]);

    useEffect(() => {
        if (!isLoading) {
            setPagesCount(filteredPhotos.length);
            getPhotosPage(page);
        }
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading) {
            setFilteredPhotosInitialized(false);
            filterPhotos();
        }
    }, [search, filter, sort]);

    useEffect(() => {
        if (filteredPhotosInitialized) {
            getPhotosPage(FIRST_PAGE);
            setPage(FIRST_PAGE);
        }
    }, [filteredPhotos]);

    const isCaratHidden = (caratType) => {
        if (caratType === 'left' && page <= FIRST_PAGE) {
            return true;
        }

        if (caratType === 'right' && page >= pageCount) {
            return true;
        }

        return false;
    }
    let gallery;
    if(isLoading){
        gallery = (
            <div className="processing">
                <p>Photos loading...</p>
                <div className="loader"></div>
            </div>
        );
    } else if (!filteredPhotos.length) {
        gallery = <p>No photos!</p>;
    } else {
        gallery = (
            <React.Fragment>
                {render()}
                <div className="pagination">
                    <button onClick={firstPageHandler} className={"pagination__carat " + (isCaratHidden('left') ? 'pagination__carat_hidden' : '')}>&laquo;</button>
                    <button onClick={prevPageHandler} className={"pagination__carat " + (isCaratHidden('left') ? 'pagination__carat_hidden' : '')}>&lt;</button>
                    <p>Page {page} of {pageCount}</p>
                    <button onClick={nextPageHandler} className={"pagination__carat " + (isCaratHidden('right') ? 'pagination__carat_hidden' : '')}>&gt;</button>
                    <button onClick={lastPageHandler} className={"pagination__carat " + (isCaratHidden('right') ? 'pagination__carat_hidden' : '')}>&raquo;</button>
                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {gallery}
        </React.Fragment>
    );
}

export default Pagination;