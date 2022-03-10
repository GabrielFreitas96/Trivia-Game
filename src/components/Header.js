import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { getGravatar } from '../Service/service'

class Header extends Component {
  state = {
    gravatarURL: '',
  }

  async componentDidMount() {
    const { gravatarEmail } = this.props;
    const result = await getGravatar(gravatarEmail);
    this.setState({ gravatarURL: result})
  }

  render() {
    const { name } = this.props;
    const { gravatarURL } = this.state;
    console.log(gravatarURL)
    return (
      <header>
        <h4 data-testid="header-player-name" >{ name }</h4>
        <img data-testid="header-profile-picture" src={ gravatarURL } alt="GravatarImg" />
        <p data-testid="header-score">score: 0</p>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.players.gravatarEmail,
  name: globalState.players.name,
})

export default connect(mapStateToProps)(Header);
