import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';

export default class Content extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={ Login } />
      </div>
    );
  }
}
