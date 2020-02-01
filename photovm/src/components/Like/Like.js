import React, {useState, useEffect} from 'react';
import firebase from '../../firebase/config';

import './Like.css'

const Like = ({photo, photoid}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [likesArray, setLikesArray] = useState([]);

    useEffect(() => {
        if (photo) {
            setLikesArray(photo.likes);
            setLikesCount(photo.likes.length);
            
            firebase.getUserState().then(user =>{
                if(user){
                    const {uid: id, email} = user;
                    setCurrentUser({id, email});
                }
            });
        }
    }, []);

    useEffect(() => {
        setLikesCount(likesArray.length);
    }, [likesArray]);

    const likeHandler = (e) => {
        if (isUserLiked()) {
            const updatedArray = likesArray.filter((likedUser) => likedUser !== currentUser.email);
            firebase.updatePhotoLikes(photoid, {likes: updatedArray});
            setLikesArray(updatedArray);
        } else {
            const updatedArray = [...likesArray, currentUser.email];
            firebase.updatePhotoLikes(photoid, {likes: updatedArray});
            setLikesArray(updatedArray);
        }
    };

    const isUserLiked = () => {
        return likesArray.includes(currentUser.email);
    }

    const likeButton = () => {
        if (currentUser) {
            return(
                <React.Fragment>
                    
                    <div className="row-like__click">
                    <label className="like">
                    <input onClick={likeHandler} defaultChecked={isUserLiked()} type="checkbox" className="like__button"/>
                    <span className="like__heart"></span>
                    </label>
                    </div>
            
            </React.Fragment>
            )
        }
    }
    
    return (
        <React.Fragment>
            <div className="row-like">
                <div className="row-like__text">Likes: 
                    <span className="like__count">{likesCount}</span>
                </div>
            {likeButton()}
            </div>
        </React.Fragment>
    )
}

export default Like;