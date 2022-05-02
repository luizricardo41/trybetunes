import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
        <div className="div-logo">
          <h1>TrybeTunes</h1>
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
        <div>
          <h4>
            Usuário:
            { verifyName ? ` ${userInfo.name}` : <Loading /> }
          </h4>
        </div>
      </header>
    );
  }
}

export default Header;
