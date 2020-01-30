import React, { Component } from 'react';

import Routes from './routes'
import Nav from './components/Nav/Nav'
import logo from './assets/images/logo.png';


function App() {

  const navLinks = [
		{
			text: 'Home',
			path: '/',
			icon: 'ion-ios-home'
		},
		{
			text: 'Contact',
			path: '/contact',
			icon: 'ion-ios-megaphone'
		},
		{
			text: 'About',
			path: '/about',
			icon: 'ion-ios-business'
		},
		{
			text: 'Blog',
			path: '/blog',
			icon: 'ion-ios-bonfire'
		},
		{
			text: 'Portfolio',
			path: '/portfolio',
			icon: 'ion-ios-briefcase'
		}
	]

    return (
      <div className="App">
          <Nav navLinks={ navLinks }
				      logo={ logo }
              background="#fff"
              hoverBackground="#ddd"
              linkColor="#777"/>
          <main>
            <Routes/>
          </main>
      </div>
    );
  


}

export default App;
