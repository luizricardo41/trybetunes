import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../css/search.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = ({
      name: '',
      buttonEnable: true,
      albums: [],
      hideLabel: false,
      sectionSearch: 'section-disable',
      msgEnable: '',
      saveName: 'artista',
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
      sectionSearch: 'section-enable',
    }, () => searchAlbumsAPI(getArtist)
      .then((result) => this.setState({
        albums: result,
        hideLabel: false,
        msgEnable: 'msg-search',
      })));
    this.enableButton('');
  }

  messageFoundAlbum = () => {
    const { saveName } = this.state;
    return (
      <span>
        <h3>
          Resultado de álbuns de:
          {' '}
          {saveName}
        </h3>
      </span>
    );
  };

  returnLabel() {
    const {
      state: {
        buttonEnable,
        name,
      },
      getAlbums,
      handleChange,
    } = this;
    return (
      <div className="input-search">
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            onChange={ handleChange }
            data-testid="search-artist-input"
            value={ name }
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ buttonEnable }
          onClick={ getAlbums }
        >
          Pesquisar
        </button>
      </div>
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
        saveName,
        sectionSearch,
        msgEnable,
      },
      messageFoundAlbum,
      returnLabel,
    } = this;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {hideLabel ? <Loading /> : returnLabel() }
          <div className={ msgEnable }>
            {(albums.length !== 0) && messageFoundAlbum()}
            {(albums.length === 0 && !saveName)
                && <div><h3>Nenhum álbum foi encontrado</h3></div>}
          </div>
          <section className={ sectionSearch }>
            {albums.map((album) => (
              <div key={ album.collectionId } className="albuns">
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <div className="text-album">
                    Banda/Artista:
                    {` ${album.artistName}`}
                  </div>
                  <div className="text-album">
                    Album:
                    {` ${album.collectionName}` }
                  </div>
                </Link>
              </div>
            ))}
          </section>
        </div>
      </>
    );
  }
}
