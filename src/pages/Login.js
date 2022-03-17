import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';
import { PlayerAction, TokenAction } from '../Redux/Actions';
import { getToken, saveLocalStorage } from '../Service/service';
import '../style/Login.css';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabled: true,
  }

  enableButton = async () => {
    const minLengthName = 4;
    const { email, name } = this.state;
    const emailVerify = email.includes('@') && email.includes('.com');
    if (emailVerify && name.length >= minLengthName) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableButton());
  }

  handleClick = async () => {
    const tokenApi = await getToken();
    const { dispatch, history } = this.props;
    const { name, email } = this.state;
    dispatch(PlayerAction({ name, email }));
    dispatch(TokenAction(tokenApi));
    saveLocalStorage('token', tokenApi);
    history.push('/game');
  }

  handleClickSettings = async () => {
    const tokenApi = await getToken();
    const { dispatch, history } = this.props;
    const { name, email } = this.state;
    dispatch(PlayerAction({ name, email }));
    dispatch(TokenAction(tokenApi));
    saveLocalStorage('token', tokenApi);
    history.push('/settings');
  }

  render() {
    const { disabled, email, name } = this.state;
    return (
      <div className="login-container">
        <img src={ logo } className="App-logo" alt="logo" />
        <form className="login-form">
          <input
            className="form-inputs"
            value={ name }
            name="name"
            type="text"
            placeholder="Nome"
            data-testid="input-player-name"
            onChange={ (event) => this.handleChange(event) }
          />
          <input
            className="form-inputs"
            value={ email }
            name="email"
            type="email"
            placeholder="Email"
            data-testid="input-gravatar-email"
            onChange={ (event) => this.handleChange(event) }
          />
          <button
            className="form-play button-login"
            onClick={ this.handleClick }
            disabled={ disabled }
            type="button"
            data-testid="btn-play"
          >
            Play
          </button>
            <button onClick={ this.handleClickSettings } disabled={ disabled } className="settings-btn button-login form-settings" data-testid="btn-settings" type="button">Settings</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
