import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';

export default class Content extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/search" component={ Search } />
        <Route path="/search" component={ Search } />
        <Route path="/search" component={ Search } />
        <Route path="/search" component={ Search } />
      </div>
    );
  }
}
