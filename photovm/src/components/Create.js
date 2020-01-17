import React, {useState, useEffect} from 'react';
import { Redirect, withRouter} from 'react-router';
import firebase from '../firebase/config'

const Create = (props) =>{
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photography, setPhotography] = useState('');
    const [isBusy, setIsBusy] = useState(false);
    const [routeRedirect, setRedirect] = useState(false);
    
    const addPhoto = async(e) => {
        e.preventDefault();
        setIsBusy(true);

        let photo = {
            title,
            description,
            photography: photography[0]
        }
        
        await firebase.createPhoto(photo).then(() => {
            console.log("photo created successfully");
            setIsBusy(false);
            setRedirect(true);
        }).catch(err => {
            console.log(err);
            setIsBusy(false);
        })
    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to='/' />
    }

    let createForm;
    if(isBusy){
        createForm = (
                    <div className="processing">
                        <p>Request in procces</p>
                        <div className="loader">Loading...</div>
                    </div>
        )
    }else{
        createForm = (
            <form onSubmit={addPhoto}>
                <p>&nbsp;&gt;&nbsp;Add a new photo&nbsp;&lt;&nbsp;</p>

                <label htmlFor="title">Photo title:</label>
                <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>

                <label htmlFor="description">Photo description:</label>
                <textarea name="description"  onChange={(e) => setDescription(e.target.value)}> </textarea>

                <label htmlFor="photography">Choose photo:</label>
                <input type="file" onChange={(e) => setPhotography(e.target.files)}/>
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
export default Create;