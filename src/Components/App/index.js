import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from '../Header';
import Body from '../Home';
import WorkSpace from '../WorkSpace';

import { StateContextProvider } from '../../ContextProvider'

const App = () => {
  return (
    <StateContextProvider initialValue={{ username: localStorage.getItem("udta") || "" }}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Body />
            </Route>
            <Route exact path="/liste">
              <WorkSpace />
            </Route>
          </Switch>
        </Router>
      </div>
    </StateContextProvider>
  );
}

export default App;
