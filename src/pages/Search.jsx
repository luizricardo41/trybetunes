import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  constructor() {
    super();
    this.state = ({
      name: '',
      buttonEnable: true,
      albums: [],
      hideLabel: false,
    });
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.returnLabel = this.returnLabel.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.enableButton(value);
  }

  getAlbums = () => {
    const { name } = this.state;
    const getArtist = name;
    this.setState({
      saveName: name,
      name: '',
      hideLabel: true,
    }, () => searchAlbumsAPI(getArtist)
      .then((result) => this.setState({
        albums: result,
        hideLabel: false,
      })));
  }

  messageFoundAlbum = () => {
    const { saveName } = this.state;
    return (
      <span>
        Resultado de álbuns de:
        {' '}
        {saveName}
      </span>
    );
  };

  returnLabel() {
    const {
      state: {
        buttonEnable,
        name,
        albums,
        saveName,
      },
      messageFoundAlbum,
      getAlbums,
      handleChange,
    } = this;
    return (
      <label htmlFor="name">
        <input
          type="text"
          name="name"
          onChange={ handleChange }
          data-testid="search-artist-input"
          value={ name }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ buttonEnable }
          onClick={ getAlbums }
        >
          Pesquisar
        </button>
        {(albums.length !== 0)
          && messageFoundAlbum()}
        {(albums.length === 0 && saveName !== undefined)
          && <span>Nenhum álbum foi encontrado</span>}
      </label>
    );
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
        albums,
        hideLabel,
      },
      returnLabel,
    } = this;
    return (
      <div data-testid="page-search">
        <Header />
        {hideLabel
          ? <Loading /> : returnLabel() }
        <section>
          {albums.map((album) => (
            <div key={ album.collectionId }>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                <div>{album.artistName}</div>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <div>{album.collectionName}</div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    );
  }
}
