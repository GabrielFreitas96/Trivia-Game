import React from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabled: true,
  }

  enableButton = () => {
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
            placeholder="Email" data-testid="input-gravatar-email"
            onChange={ (event) => this.handleChange(event) }
          />
          <button disabled={ disabled } type="submit" data-testid="btn-play">Play</button>
        </form>
      </>
    )
  }
}

export default connect()(Login);