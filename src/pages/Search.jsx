import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = ({
      buttonEnable: true,
      // name: '',
    });
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.enableButton(value);
  }

  enableButton(value) {
    const minValue = 2;
    if (value.length >= minValue) {
      this.setState({
        buttonEnable: false,
      });
    } else {
      this.setState({
        buttonEnable: true,
      });
    }
  }

  render() {
    const {
      state: {
        buttonEnable,
      },
      handleChange,
    } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            onChange={ handleChange }
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonEnable }
          >
            Pesquisar
          </button>
        </label>
      </div>
    );
  }
}
