import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart } from 'react-icons/ai';

import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../css/musicCard.css';

export default class MusicCard extends Component {
  handleChange = ({ target }) => {
    const { collection, favorites } = this.props;
    const { id, checked } = target;
    let music = '';
    if (!collection.album) {
      music = collection.musicsFavorites.find((track) => track.trackId === Number(id));
    } else {
      music = collection.album.find((track) => track.trackId === Number(id));
    }
    if (checked && id) {
      addSong(music);
    } else {
      removeSong(music);
    }
    favorites();
  }

  render() {
    const { trackId, previewUrl, collection } = this.props;
    const { handleChange } = this;

    return (
      <div className="music-preview">
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          { collection.musicsFavorites
            .some((track) => track.trackId === trackId)
            ? <h2 className="heart-checked"><AiFillHeart /></h2>
            : <h2 className="heart-no-checked"><AiFillHeart /></h2> }
          <input
            className="check-favorite"
            name="favorite"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ handleChange }
            id={ trackId }
            checked={ collection.musicsFavorites
              .some((track) => track.trackId === trackId) }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  collection: PropTypes.shape({
    album: PropTypes.arrayOf(PropTypes.object),
    musicsFavorites: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  favorites: PropTypes.func.isRequired,
};
