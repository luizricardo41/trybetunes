import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

import '../css/profile.css';
import foto from '../images/sem-foto.png';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = ({
      name: '',
      email: '',
      image: '',
      description: '',
      perfilEdit: true,
      buttonEnable: true,
    });
  }

  componentDidMount() {
    getUser().then((data) => this.setState({
      name: data.name,
      email: data.email,
      image: data.image,
      description: data.description,
    }));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.enableButton(name, value);
  }

  enableButton = (item, value) => {
    const minValue = 3;
    if (item === 'name' && value.length >= minValue) {
      this.setState({
        buttonEnable: false,
      });
    } else if (item === 'name') {
      this.setState({
        buttonEnable: true,
      });
    }
  }

  saveProfile = () => {
    const { name, email, image, description } = this.state;
    this.setState({
      perfilEdit: false,
    });
    updateUser({ name, email, image, description });
  }

  render() {
    const { name, image, perfilEdit, buttonEnable, email, description } = this.state;
    const { saveProfile, handleChange } = this;
    if (!perfilEdit) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <Header />
        <div data-testid="page-profile" className="page-profile">
          <div className="image">
            <img
              src={ image === '' || image.indexOf(' ') >= 0 ? foto : image }
              alt="foto de perfil"
            />
          </div>
          <div className="box-perfil">
            <div className="info-profile">
              <p>Image:</p>
              {' '}
              <input
                type="text"
                name="image"
                onChange={ handleChange }
              />
              <p>Name:</p>
              <input
                type="text"
                name="name"
                placeholder={ name }
                onChange={ handleChange }
              />
              <p>Email:</p>
              <input
                type="text"
                name="email"
                placeholder={ email }
                onChange={ handleChange }
              />
              <p>Description:</p>
              <textarea
                type="text"
                name="description"
                placeholder={ description }
                onChange={ handleChange }
              />
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn-perfil-edit"
                onClick={ () => saveProfile() }
                disabled={ buttonEnable }
              >
                Salvar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
