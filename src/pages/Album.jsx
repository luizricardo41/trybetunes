import React, { Component } from 'react';
import Header from '../components/Header';

export default class Album extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          Page Album
        </div>
      </div>
    );
  }
}
