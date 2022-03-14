import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ResetAction } from '../Redux/Actions/index';

class Ranking extends Component {
  state = {
    playersArray: [],
  }

  componentDidMount() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    players.sort((a, b) => b.score - a.score);
    this.setState({ playersArray: players });
    const { dispatch } = this.props;
    dispatch(ResetAction(0));
  }

  render() {
    const { playersArray } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          { playersArray.length === 0 ? null
            : (
              playersArray.map((item, index) => (
                <div key={ index }>
                  <h4 data-testid={ `player-name-${index}` }>{ item.name }</h4>
                  <img src={ item.picture } alt="gravatarImg" />
                  <h4 data-testid={ `player-score-${index}` }>{ item.score }</h4>
                </div>
              )))}
        </div>
        <Link
          to="/"
        >
          <button
            type="button"
            name="button-play-again"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
