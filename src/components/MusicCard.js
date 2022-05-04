import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../css/musicCard.css';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = ({
      load: false,
      musicsFavorites: [],
    });
  }

  componentDidMount() {
    this.recoveryFavorites();
  }

  recoveryFavorites = () => {
    getFavoriteSongs().then((data) => this.setState({
      musicsFavorites: data,
      load: true,
    }, () => this.setState({
      load: false,
    })));
  }

  handleChange = ({ target }) => {
    const { album } = this.props;
    const { id, checked } = target;
    const music = album.find((track) => track.trackId === Number(id));

    if (checked && id) {
      addSong(music);
    } else {
      removeSong(music);
    }
    this.recoveryFavorites();
  }

  render() {
    const { trackId, previewUrl } = this.props;
    const { state: {
      load,
      musicsFavorites,
    },
    handleChange,
    } = this;

    if (load === false) {
      return (
        <div className="music-preview">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
          </audio>
          <label htmlFor="favorite">
            <input
              name="favorite"
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ handleChange }
              id={ trackId }
              checked={ musicsFavorites.some((track) => track.trackId === trackId) }
            />
          </label>
        </div>
      );
    }
    return <Loading />;
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  album: PropTypes.arrayOf(PropTypes.object).isRequired,
};
