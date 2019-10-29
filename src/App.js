import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import Header from './Components/Header/Header';
import routes from './routes';


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header/>
        {routes}
      </HashRouter>
    </div>
  );
}

export default App;
