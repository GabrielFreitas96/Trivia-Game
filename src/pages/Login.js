import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';
import { PlayerAction, TokenAction } from '../Redux/Actions';
import { getToken, saveTokenLocalStorage, getGravatar } from '../Service/service';


class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabled: true,
    gravatarURL: '',
  }

  enableButton = async () => {
    const minLengthName = 4;
    const { email, name } = this.state;
    const emailVerify = email.includes('@') && email.includes('.com');
    if (emailVerify && name.length >= minLengthName) {
      this.setState({
        disabled: false,
      });
      const result = await getGravatar(email);
      this.setState({ gravatarURL: result })
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
    console.log(tokenApi);
    const { dispatch, history } = this.props;
    const { name, email, gravatarURL } = this.state;
    dispatch(PlayerAction({ name, email, gravatarURL }));
    dispatch(TokenAction(tokenApi));
    saveTokenLocalStorage(tokenApi);
    history.push('/game');
  }

  render() {
    const { disabled, email, name } = this.state;
    return (
      <>
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <input
            value={ name }
            name="name"
            type="text"
            placeholder="Nome"
            data-testid="input-player-name"
            onChange={ (event) => this.handleChange(event) }
          />
          <input
            value={ email }
            name="email"
            type="email"
            placeholder="Email"
            data-testid="input-gravatar-email"
            onChange={ (event) => this.handleChange(event) }
          />
          <button
            onClick={ this.handleClick }
            disabled={ disabled }
            type="button"
            data-testid="btn-play"
          >
            Play
          </button>
        </form>
      </>
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
