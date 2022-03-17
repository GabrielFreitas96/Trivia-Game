import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import MD5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import '../style/Header.css';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <header>
        <div className="name-img-div">
          <h4 className="name-header" data-testid="header-player-name">{ name }</h4>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${MD5(gravatarEmail)}` }
            alt="GravatarImg"
            className="gravatarImg"
          />
        </div>
        <div className="score-header">
          <p>Score: </p>
        <p
          data-testid="header-score"
        >
          {score}
        </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
  gravatarURL: globalState.player.gravatarURL,
  score: globalState.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
