import React from 'react';

import Routes from './routes'
import Nav from './components/Nav/Nav'


const App = () => {
    return (
      <div className="App">
          <Nav/>
          <main>
            <Routes/>
          </main>
      </div>
    );
}

export default App;
