import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <div className="light-blue">
            <Route path="/game" component={ Game } />
            <Route path="/settings" component={ Settings } />
            <Route path="/feedback" component={ Feedback } />
            <Route path="/ranking" component={ Ranking } />
          </div>
        </Switch>
      </div>
    );
  }
}
