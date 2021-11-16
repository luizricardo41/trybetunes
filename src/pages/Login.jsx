import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <label htmlFor="login">
          <input type="text" name="login" />
        </label>
      </div>
    )
  }
}
