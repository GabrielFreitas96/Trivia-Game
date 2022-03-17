import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ResetAction } from '../Redux/Actions/index';
import '../style/Ranking.css';

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
      <div className="ranking-div">
        <h1 className="ranking-h1" data-testid="ranking-title">Ranking</h1>
        <div className="ranking-div-allplayers">
          { playersArray.length === 0 ? null
            : (
              playersArray.map((item, index) => (
                <div className="player-div" key={ index }>
                  <div className="ranking-name-img">
                    <h4 className="ranking-h4" data-testid={ `player-name-${index}` }>{ item.name }</h4>
                    <img className="ranking-img" src={ item.picture } alt="gravatarImg" />
                  </div>
                  <h4 classname='ranking-score' data-testid={ `player-score-${index}` }>{ item.score }</h4>
                </div>
              )))}
        </div>
        <Link
          to="/"
        >
          <button
            className='next-btn'
            type="button"
            name="button-play-again"
            data-testid="btn-go-home"
          >
            Play Again!
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
