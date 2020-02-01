import React from 'react';

import Routes from './routes'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'


const App = () => {
    return (
      <div className="App">
          <Nav/>
          <main>
            <Routes/>
          </main>
          <Footer/>
      </div>
    );
}

export default App;
