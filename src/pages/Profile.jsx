import React, { Component } from 'react';
import Header from '../components/Header';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-profile">
          Page Profile
        </div>
      </div>
    );
  }
}
