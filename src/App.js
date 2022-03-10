import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './pages/Login';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={ Login } />
      </div>
    );
  }
}
