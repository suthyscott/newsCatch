import React from 'react';
import './App.css';
import {HashRouter, BrowserRouter} from 'react-router-dom';
import Header from './Components/Header/Header';
import routes from './routes';
import {Provider} from 'react-redux';
import store from './ducks/store';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header/>
          {routes}
        </Router>
      </Provider>
    </div>
  );
}

export default App;
