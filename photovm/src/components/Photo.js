import React, { useEffect, useState, useRef } from 'react';
import {Redirect} from 'react-router';
import firebase from '../firebase/config';
import Like from './Like';


const Photo = (props) => {

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
    const [routeRedirect, setRedirect] = useState(false);

    const getPhoto = async(photoid) => {
        const _photo = await firebase.getPhoto(photoid).catch(err => {
            console.log(err);
            return err;
        });

        setPhoto(_photo);
        setTimer(false);
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
    if(redirect){
        return <Redirect to='/' />
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
        console.log("photo updated");
        setIsBusy(false);
        setRedirect(true);
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
                        <p>Request is being processed <span className="process">{loading}%</span></p>
                        <div className="loader">Loading...</div>
                    </div>
            )
        }else{
            updateForm = (
                <React.Fragment>
                <form className="editForm" onSubmit={updateCurrentPhoto}>
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

        if(userState.uid === photo.author){
            editButton = <button className="edit" onClick={(e) => toggleEditMode()}>Edit Photo </button>;
        }

        currentPhoto = (
            <div className="single">
                <img src={photo.photography} alt="photography"/>
                <h2>{photo.title}</h2>
                <div>{photo.description}</div>
                <Like photo={photo} photoid={photoid}></Like>
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