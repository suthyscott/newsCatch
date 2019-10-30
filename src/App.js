import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import Header from './Components/Header/Header';
import routes from './routes';
import {Provider} from 'react-redux';
import store from './ducks/store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <Header/>
          {routes}
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
