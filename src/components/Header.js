import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../css/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = ({
      verifyName: false,
      userInfo: [],
    });
  }

  componentDidMount() {
    getUser().then((user) => (this.setState({
      verifyName: true,
      userInfo: user,
    })));
  }

  render() {
    const {
      verifyName,
      userInfo,
    } = this.state;

    return (
      <header className="header-app">
        <div className="header-logo-user">
          <div className="name-app-header">
            <h1>TryBE</h1>
            <h1>Tunes</h1>
          </div>
          <div>
            <h4>
              Usuário:
              { verifyName ? ` ${userInfo.name}` : <Loading /> }
            </h4>
          </div>
        </div>
        <div className="div-navigator">
          <nav className="nav">
            <Link
              to="/search"
              data-testid="link-to-search"
            >
              Pequisa
            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Músicas Favoritas
            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
            >
              Perfil
            </Link>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
