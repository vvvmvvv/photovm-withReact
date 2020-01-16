import React from 'react';
import {photos} from '../reducers/photosReducer';


export const Photos = React.createContext();
const initialState = {
    photos: []

}
export const PhotosProvider = (props) => {
    const [state, dispatch] = React.useReducer(photos, initialState);
    const value = {state, dispatch};

    return <Photos.Provider value={value}>
            {props.children}
    </Photos.Provider>
}