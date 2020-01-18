import React, { useEffect, useState, useRef } from 'react';
import {Redirect} from 'react-router';
import firebase from '../firebase/config';


const Photo = (props) => {

    const [timer, setTimer] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userState, setUserState] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [photo, setPhoto] = useState('');


    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const fileRef = useRef(null);

    const [photoid, setPhotoId] = useState(props.match.params.id);
    const [routeRedirect, setRedirect] = useState(false);

    const getPhoto = async(postid) => {
        const _photo = await firebase.getPhoto(photoid).catch(err => {
            console.log(err);
            return err;
        });

        setPhoto(_photo);

    }

    useEffect(() => {
        setTimer(true);
        setPhotoId(props.match.params.id);
        getPhoto(props.match.params.id);

        firebase.getUserState().then(user => {
            if(user){
                setUserState(user);
            }
        });


        setTimeout(() => setTimer(false), 1000);

    }, [props.match.params.id]);

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to='/' />
    }

    let currentPhoto;
    let editButton;
    let deleteButton;

    const updateCurrentPhoto = (e) => {
        e.preventDefault();
        setIsBusy(true);

        const _photo = {
            title: titleRef.current.value,
            description: descriptionRef.current.value
        }

        if(fileRef.current.files.length > 0){
            _photo['photography'] = fileRef.current.files[0];
            _photo['oldphotography'] = photo.fileref;
        }

        firebase.updatePhoto(photoid, _photo).then(() => {
            console.log("Photo Updated");
            setIsBusy(false);
            setRedirect(true);
        }).catch(err => {
            console.log(err);
        });

    }

    const toggleEditMode = () => {
        setEditMode(!editMode);

    }

    const deleteCurrentPhoto = () => {
        firebase.deletePhoto(photoid, photo.fileref)
        .then(() => {
            setRedirect(true);
        }).catch(err => {
            console.log(err);
        })
    }

    let updateForm;
    if(editMode){
        deleteButton = <button className="delete" onClick={(e) => deleteCurrentPhoto()}>Delete Photo</button>

        if(isBusy){
            updateForm = (
                    <div className="processing">
                        <p>Request is being processed</p>
                        <div className="loader">Loading...</div>
                    </div>
            )
        }else{
            updateForm = (
                <React.Fragment>
                <form className='editForm' onSubmit={updateCurrentPhoto}>
                        <p>&nbsp;&gt;&nbsp;Update the current photo&nbsp;&lt;&nbsp;</p>

                            <label htmlFor="title">Photo title:</label>
                            <input type="text" name="title" ref={titleRef}  defaultValue={photo.title} />

                            <label htmlFor="description">Photo description:</label>
                            <textarea name="description" ref={descriptionRef}  defaultValue={photo.description}></textarea>
                            
                            <label htmlFor="photography">Change photography:</label>
                            <input type="file" ref={fileRef}/>
                            <hr/>
                            <input type="submit" value="Update photo"/>
                </form>
            
                {deleteButton}
                </React.Fragment>
            )
        }
    }

    if(timer){
        currentPhoto = (
            <div className="processing">
                        <p>Request is being processed</p>
                        <div className="loader">Loading...</div>
                    </div>
        )
    }else{

        if(userState){
            editButton = <button className="edit" onClick={(e) => toggleEditMode()}>Edit Photo </button>;
        }

        currentPhoto = (
            <div className="single">
                <img src={photo.photography} alt="photography"/>
                <h2>{photo.title}</h2>
                <div>{photo.description}</div>
                {editButton}
                {updateForm}
            </div>
        )
    }

    return(
        <React.Fragment>  
            {currentPhoto}
        </React.Fragment>
    );
}

export default Photo;