import React from 'react';

import {Switch, Route} from 'react-router-dom';


//components 
import Main from './components/Main/Main';
import Signin from './components/Signin/Signin';
import Login from './components/Login/Login';
import Create from './components/Create/Create';
import Photo from './components/Photo/Photo';
import Gallery from './components/Gallery/Gallery';
import About from './components/About/About';

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/create' component={Create} />
        <Route exact path='/photos' component={Gallery} />
        <Route exact path='/photos/:id' component={Photo} />
        <Route exact path='/about' component={About} />
    </Switch>
);

export default Routes;