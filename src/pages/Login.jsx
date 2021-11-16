import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <label htmlFor="login">
          Login:
          <input
            type="text"
            name="login"
            placeholder="Nome"
          />
        </label>
        <button type="submit">Entrar</button>
      </div>
    );
  }
}