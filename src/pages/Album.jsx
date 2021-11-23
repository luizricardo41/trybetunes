import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = ({
      album: [],
    });
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    getMusics(params.id).then((result) => this.setState({
      album: result,
    }));
    this.recoveryFavorites();
  }

  recoveryFavorites = () => {
    getFavoriteSongs().then((data) => this.setState({
      musicsFavorites: data,
    }));
  }

  pageAlbum = () => {
    const { album } = this.state;
    return (
      <div data-testid="page-album">
        <span data-testid="artist-name">
          Artista/Banda:
          {' '}
          {album[0].artistName}
        </span>
        {' '}
        <br />
        <span data-testid="album-name">
          Collection Name
          {' '}
          {album[0].collectionCensoredName}
        </span>
      </div>
    );
  }

  render() {
    const {
      state: {
        album,
        musicsFavorites,
      },
      pageAlbum,
    } = this;
    const verifyAlbum = album.filter((track) => track.trackName !== undefined);
    return (
      <div>
        <Header />
        {(album.length === 0)
          ? <Loading /> : pageAlbum()}
        {!musicsFavorites ? <Loading />
          : verifyAlbum.map(({ trackName, trackId, previewUrl }) => (
            <div key={ trackName }>
              <p>{ trackName }</p>
              <MusicCard
                trackId={ trackId }
                previewUrl={ previewUrl }
                album={ album }
                musicsFavorites={ musicsFavorites }
              />
            </div>))}
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
