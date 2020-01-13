import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {AuthProvider} from './context/authContext';
import {BrowserRouter} from 'react-router-dom';





ReactDOM.render(
    <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>  
    </BrowserRouter>
  ,
  document.getElementById('root')
);
