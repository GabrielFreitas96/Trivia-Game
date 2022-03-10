import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';


class Header extends Component {
  render() {
    const { name, gravatarURL } = this.props;
    console.log(gravatarURL);
    return (
      <header>
        <h4 data-testid="header-player-name" >{ name }</h4>
        <img
          data-testid="header-profile-picture"
          src={ `${gravatarURL}` }
          alt="GravatarImg" 
        />
        <p data-testid="header-score">score: 0</p>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.players.gravatarEmail,
  name: globalState.players.name,
  gravatarURL: globalState.players.gravatarURL,
})

export default connect(mapStateToProps)(Header);
