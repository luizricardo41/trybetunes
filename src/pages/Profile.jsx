import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

import '../css/profile.css';
import foto from '../images/sem-foto.png';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = ({
      name: '',
      email: '',
      image: '',
      description: '',
      perfilEdit: false,
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

  goProfileEdit = () => {
    this.setState({
      perfilEdit: true,
    });
  }

  render() {
    const { name, email, image, description, perfilEdit } = this.state;
    const { goProfileEdit } = this;
    if (perfilEdit) {
      return <Redirect to="profile/edit" />;
    }
    return (
      <div>
        <Header />
        <div data-testid="page-profile" className="page-profile">
          <div className="image">
            <img
              src={ image === '' ? foto : image }
              alt="foto de perfil"
            />
          </div>
          <div className="box-perfil">
            <div className="info-profile">
              <span>
                Name:
                {' '}
                { name }
              </span>
              <span>
                Email:
                {' '}
                { email }
              </span>
              <span>
                Description:
                {' '}
                { description }
              </span>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn-perfil-edit"
                onClick={ () => goProfileEdit() }
              >
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
