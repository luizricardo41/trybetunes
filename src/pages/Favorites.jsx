import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = ({
      musicsFavorites: [],
    });
  }

  componentDidMount() {
    this.recoveryFavoriteSongs();
  }

  recoveryFavoriteSongs = () => {
    getFavoriteSongs().then((data) => this.setState({
      musicsFavorites: data,
    }));
  }

  render() {
    const { state: {
      musicsFavorites,
    },
    recoveryFavoriteSongs } = this;

    return (
      <div>
        <Header />
        <div data-testid="page-favorites" className="container-track">
          {musicsFavorites.length !== 0 ? musicsFavorites
            .map(({ artistName, trackId, collectionName, trackName, previewUrl }) => (
              <div key={ trackId } className="track">
                <p>{`${trackName} - ${artistName}`}</p>
                <p>{ collectionName }</p>
                <MusicCard
                  trackId={ trackId }
                  previewUrl={ previewUrl }
                  collection={ { musicsFavorites } }
                  favorites={ recoveryFavoriteSongs }
                />
              </div>
            )) : <h3>Nenhuma música adicionada por aqui...</h3>}
        </div>
      </div>
    );
  }
}
