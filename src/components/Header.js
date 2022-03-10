import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import MD5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    return (
      <header>
        <h4 data-testid="header-player-name">{ name }</h4>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${MD5(gravatarEmail)}` }
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
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
