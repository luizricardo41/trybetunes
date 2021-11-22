import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { album } = this.props;
    const verifyAlbum = album.filter((track) => track.trackName !== undefined);
    return (
      <div>
        {verifyAlbum.map((music) => (
          <div
            key={ music.trackNumber }
          >
            <span>
              {' '}
              {music.trackName}
            </span>
            {' '}
            <br />
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
            </audio>
          </div>
        ))}
      </div>
    );
  }
}
MusicCard.propTypes = {
  album: PropTypes.arrayOf(PropTypes.array).isRequired,
};
