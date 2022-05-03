import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/login.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = ({
      buttonEnable: true,
      nameUser: '',
      logado: false,
    });
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.infoUser = this.infoUser.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.enableButton(value);
  }

  enableButton(value) {
    const minValue = 3;
    if (value.length >= minValue) {
      this.setState({
        buttonEnable: false,
      });
    } else {
      this.setState({
        buttonEnable: true,
      });
    }
  }

  infoUser() {
    const { nameUser } = this.state;
    this.setState({
      saveName: false,
    }, () => {
      createUser({ name: nameUser })
        .then(() => this.setState({
          logado: true,
          saveName: true,
        }));
    });
  }

  render() {
    const {
      state: {
        buttonEnable,
        logado,
        saveName,
      },
      handleChange,
      infoUser,
    } = this;

    if (logado) {
      return <Redirect to="./search" />;
    }
    if (saveName === false) {
      return <Loading />;
    }
    return (
      <div className="total-login">

        <div data-testid="page-login" className="login">
          <div className="name-app">
            <h1 className="trybe">TryBE</h1>
            <h1 className="tunes">Tunes</h1>
          </div>
          <label htmlFor="nameUser">
            <input
              type="text"
              name="nameUser"
              placeholder="Nome"
              data-testid="login-name-input"
              onChange={ handleChange }
            />
          </label>
          <button
            className="btn-login"
            type="submit"
            data-testid="login-submit-button"
            disabled={ buttonEnable }
            onClick={ () => infoUser() }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}
