import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {AuthProvider} from './context/authContext';
import {BrowserRouter} from 'react-router-dom';
import {PhotosProvider} from './context/photosContext'
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable';

ReactDOM.render(
    <BrowserRouter>
          <AuthProvider>
            <PhotosProvider>
              <App />
            </PhotosProvider>
          </AuthProvider>  
    </BrowserRouter>
  ,
  document.getElementById('root')
);
