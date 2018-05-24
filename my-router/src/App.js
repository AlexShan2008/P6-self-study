import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import Profile from './Profile';
import User from './User';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Router>
        <div>
          <div>
            <Link to='/home' />
            <Link to='/user' />
            <Link to='/profile' />
          </div>
          <div className='container'>
            <Switch>
              <Route exact={true} path='/' components={Home}></Route>
              <Route path='/user' components={User}></Route>
              <Route path='/profile' components={Profile}></Route>
              <Redirect to='/' />
            </Switch>
          </div>
        </div>

      </Router>
    );
  }
}

export default App;
