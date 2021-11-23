import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = ({
      load: false,
    });
  }

  handleChange = ({ target }) => {
    const { album } = this.props;
    const { id, name } = target;
    const value = (target.type === 'checkbox') && target.checked;
    if (value) {
      const object = {
        result: album.filter((music) => music.trackId === parseInt(id, 10)),
      };
      console.log(object.result);
      this.setState({
        load: true,
        [name]: value,
      });
      addSong(...object.result).then(() => this.setState({
        load: false,
      }));
    } else {
      this.setState({
        favorite: false,
      });
    }
  }

  render() {
    const { trackId, previewUrl } = this.props;
    const { state: {
      load,
      favorite,
    },
    handleChange,
    } = this;
    if (load === false) {
      return (
        <div>
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
              checked={ favorite }
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
