import React, {useState, useEffect} from 'react';
import { Redirect, withRouter} from 'react-router';
import firebase from '../firebase/config'

const Create = (props) =>{
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photography, setPhotography] = useState('');
    const [isBusy, setIsBusy] = useState(false);
    const [routeRedirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState('');

    const addPhoto = async(e) => {
        e.preventDefault();
        setIsBusy(true);

        let d;
        let photo = {
            title,
            description,
            photography: photography[0]
        }

        const storageRef = firebase.storage.ref();
        const storageChild = storageRef.child(photo.photography.name);
        const photoPhotography = storageChild.put(photo.photography);


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

        firebase.createPhoto(d, photo).then((photo) => {
            setIsBusy(false);
            setRedirect(true);
        }).catch(err => {
            console.log(err);
            setIsBusy(false);
            
        });
    }

    useEffect(() => {
        firebase.getUserState().then(user => {
            if(!user){
                props.history.replace('/login');
            }
        })
    });

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to='/photos' />
    }

    let createForm;
    if(isBusy){
        createForm = (
                    <div className="processing">
                        <p>Request in procces <span className="process">{loading}%</span></p>
                        <div className="loader">Loading...</div>
                    </div>
        )
    }else{
        createForm = (
            <form onSubmit={addPhoto}>
                <p>&nbsp;&gt;&nbsp;Add a new photo&nbsp;&lt;&nbsp;</p>

                <label htmlFor="title">Photo title:</label>
                <input type="text" name="title" value={title} required onChange={(e) => setTitle(e.target.value)}/>

                <label htmlFor="description">Photo description:</label>
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}> </textarea>

                <label htmlFor="photography">Choose photo:</label>
                <input type="file" required onChange={(e) => setPhotography(e.target.files)}/>
                <hr/>
                <input type="submit" value="Add photo"/>

            </form>
        )
    }
    return (
        <React.Fragment>
            {createForm}
        </React.Fragment>
    )
}
export default withRouter(Create);