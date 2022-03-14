import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  messageNumberOfQuestions = (correctAnswers) => {
    const couldBeBetter = 3;
    if (correctAnswers < couldBeBetter) {
      return <p data-testid="feedback-text">Could be better...</p>;
    }
    if (correctAnswers >= couldBeBetter) {
      return <p data-testid="feedback-text">Well Done!</p>;
    }
  };

  render() {
    const { rightQuestions, score } = this.props;
    return (
      <section>
        <h1 data-testid="feedback-text">Página de Feedback</h1>
        <Header />
        <div>
          <h3 data-testid="feedback-total-score">{ score }</h3>
          <h4 data-testid="feedback-total-question">{ rightQuestions }</h4>
          { this.messageNumberOfQuestions(rightQuestions) }
        </div>
        <Link
          to="/"
        >
          <button
            type="button"
            name="button-play-again"
            data-testid="btn-play-again"
          >
            Play again
          </button>
        </Link>
        <Link
          to="/ranking"
        >
          <button
            type="button"
            name="button-play-again"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (globalState) => ({
  rightQuestions: globalState.player.assertions,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  rightQuestions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
