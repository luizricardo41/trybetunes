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
    if (verifyName) {
      return (
        <div>
          <header data-testid="header-component">
            <h1>TrybeTunes</h1>
            <nav>
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
            <span>
              Usuário:
              {' '}
              {userInfo.name}
            </span>
          </header>
        </div>
      );
    }
    if (verifyName === false) {
      return (
        <div>
          <header>
            <h1>TrybeTunes</h1>
            <nav>
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
            <Loading />
          </header>
        </div>
      );
    }
  }
}

export default Header;
