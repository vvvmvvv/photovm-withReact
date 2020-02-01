import React, { useEffect, useState, useRef } from 'react';
import {Redirect} from 'react-router';
import firebase from '../../firebase/config';
import Like from '../Like/Like';

import "./Photo.css"


const Photo = (props) => {
    const [notFound, setNotFound] = useState(false);
    const [timer, setTimer] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userState, setUserState] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [photo, setPhoto] = useState('');
    const [loading, setLoading] = useState("");

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const fileRef = useRef(null);

    const [photoid, setPhotoId] = useState("");
    const [routeRedirect, setRedirect] = useState('');

    const getPhoto = async(photoid) => {
        try {
            const _photo = await firebase.getPhoto(photoid);

            if (_photo) {
                setPhoto(_photo);
                setTimer(false);
            }
        } catch(err) {
            setNotFound(true);
        }
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
    }, [props.match.params.id]);


    

    const redirect = routeRedirect;
    if (redirect === 'delete'){
        return <Redirect to="/photos" />
    }

    let currentPhoto;
    let editButton;
    let deleteButton;

    const updateCurrentPhoto = async(e) => {
        e.preventDefault();
        setIsBusy(true);

        let d;
        const _photo = {
            title: titleRef.current.value,
            description: descriptionRef.current.value
        }

        if(fileRef.current.files.length > 0){
            _photo['photography'] = fileRef.current.files[0];
            _photo['oldphotography'] = photo.fileref;


        const storageRef = firebase.storage.ref();
        const storageChild = storageRef.child(_photo.photography.name);
        const photoPhotography = storageChild.put(_photo.photography);

        await new Promise(resolve => {
            photoPhotography.on("state_changed", (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setLoading(Math.trunc(progress));

            },(error) =>{
                // error
                console.log(error);
            }, async() => {
                //completed
                const downloadUrl = await storageChild.getDownloadURL();
                d = downloadUrl;
                resolve();
            });

        });
      }   
      firebase.updatePhoto(d, photoid, _photo).then(() => {
        getPhoto(photoid);
        toggleEditMode();
        setIsBusy(false);
    }).catch(err => {
        setIsBusy(false);
        console.log(err);
    });

    }       

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const deleteCurrentPhoto = () => {
        firebase.deletePhoto(photoid, photo.fileref)
        .then(() => {
            setRedirect('delete');
        }).catch(err => {
            console.log(err);
        })
    }

    let updateForm;
    if(editMode){
        deleteButton = <button className="delete" onClick={(e) => deleteCurrentPhoto()}><i className="far fa-trash-alt"></i> Delete Photo</button>

        if(isBusy){
            updateForm = (
                    <div className="processing">
                        <p>Request is being processed <span className="process">{loading}%</span></p>
                        <div className="loader">Loading...</div>
                    </div>
            )
        }else{
            updateForm = (
                <React.Fragment>
                <form className="editForm" onSubmit={updateCurrentPhoto} encType="multipart/form-data" method="post">

                            <label htmlFor="title">Photo title:</label>
                            <input type="text" name="title" ref={titleRef}  defaultValue={photo.title} />

                            <label htmlFor="description">Photo description:</label>
                            <textarea name="description" ref={descriptionRef}  defaultValue={photo.description}></textarea>
                            
                            <label htmlFor="photography">Change photography:</label>
                            <input accept="image/*" type="file" ref={fileRef}/>
                            <hr/>
                            <button className="edit-btn" type="submit"><i className="fas fa-edit"></i>Update photo</button>
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

        if(userState.email === photo.author){
            editButton = <button className="edit" onClick={(e) => toggleEditMode()}><i className="fas fa-edit"></i> Edit Photo </button>;
        }

        currentPhoto = (
            <div className="container">
                <div className="main-wrapper">
                    <div className="single">
                        <h2 className="single-title"><i className="fas fa-image"></i> {photo.title}</h2>
                        <img src={photo.photography} alt="photography"/>
                        <div className="single-all">
                            <div className="single__info">
                                    <div className="single__info-description"><span className="description">Description: <br/></span> {photo.description}</div>
                                    <div className="single__info-author"><span className="author"><i className="fas fa-user"></i> Author:</span> {photo.author}</div>
                            </div>
                            <div className="single-like">
                        <Like photo={photo} photoid={photoid}></Like>
                            </div>
                        </div>
                        {editButton}
                        {updateForm}
                    </div>
                </div>
            </div>
        )
    }

    return(
        <React.Fragment>
            {notFound ? <Redirect to="/error404" /> : null}
            {currentPhoto}
        </React.Fragment>
    );
}

export default Photo;