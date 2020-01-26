import React, {useState, useEffect} from 'react';
import firebase from '../firebase/config';

const Like = ({photo, photoid}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [likesArray, setLikesArray] = useState([]);

    useEffect(() => {        
        firebase.getUserState().then(user =>{
            if(user){
                const {uid: id, email} = user;
                setCurrentUser({id, email});
            }
        });

        if (photo) {
            setLikesArray(photo.likes);
            setLikesCount(photo.likes.length);
        }
    }, []);

    useEffect(() => {
        setLikesCount(likesArray.length);
    }, [likesArray]);

    const likeHandler = async () => {
        const isUserLiked = likesArray.includes(currentUser.id);
        if (isUserLiked) {
            const updatedArray = likesArray.filter((likedUser) => likedUser !== currentUser.id);
            await firebase.updatePhotoLikes(photoid, {likes: updatedArray});
            setLikesArray(updatedArray);
        } else {
            const updatedArray = [...likesArray, currentUser.id];
            await firebase.updatePhotoLikes(photoid, {likes: updatedArray});
            setLikesArray(updatedArray);
        }
    };

    const likeButton = () => {
        if (currentUser) {
            return <button onClick={likeHandler}>&hearts;</button>;
        }
    }
    
    return (
        <React.Fragment>
            <span>Likes: {likesCount}</span>
            {likeButton()}
        </React.Fragment>
    )
}

export default Like;