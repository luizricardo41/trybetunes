import React from 'react';
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
        <header data-testid="header-component">
          <h1>TrybeTunes</h1>
          <span data-testid="header-user-name">
            Usuário:
            {' '}
            {userInfo.name}
          </span>
        </header>
      );
    }
    if (verifyName === false) {
      return (
        <header data-testid="header-component">
          <h1>TrybeTunes</h1>
          <Loading />
        </header>
      );
    }
  }
}

export default Header;
