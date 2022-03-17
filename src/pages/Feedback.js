import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MD5 from 'crypto-js/md5';
import { saveLocalStorageRanking } from '../Service/service';
import Header from '../components/Header';
import { ResetAction } from '../Redux/Actions/index';
import '../style/Feedback.css';

class Feedback extends React.Component {
  componentDidMount() {
    const { name, score, email } = this.props;
    const picture = `https://www.gravatar.com/avatar/${MD5(email)}`;
    const object = {
      name,
      score,
      picture,
    };
    saveLocalStorageRanking(object);
  }

  messageNumberOfQuestions = (correctAnswers) => {
    const couldBeBetter = 3;
    if (correctAnswers < couldBeBetter) {
      return <h6 className="feedback-message" data-testid="feedback-text">Could be better...</h6>;
    }
    if (correctAnswers >= couldBeBetter) {
      return <h6 className="feedback-message" data-testid="feedback-text">Well Done!</h6>;
    }
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(ResetAction(0));
  }

  render() {
    const { rightQuestions, score } = this.props;
    return (
      <>
        <Header />
        <section className="section-feedback">
          <h1 className="text-feedback-page" data-testid="feedback-text">Your Score!</h1>
          <div>
            <h3
              className="feedback-score"
              data-testid="feedback-total-score"
            >
              { score }
            </h3>
            <div className="assertions-div">
              <h4 className="text-number-acertos">Right answers: </h4>
              <h4 data-testid="feedback-total-question">{ rightQuestions }</h4>
            </div>
            { this.messageNumberOfQuestions(rightQuestions) }
          </div>
          <div className="div-buttons-feedback">
            <Link
              to="/"
            >
              <button
                type="button"
                name="button-play-again"
                data-testid="btn-play-again"
                onClick={ this.handleClick }
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
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (globalState) => ({
  rightQuestions: globalState.player.assertions,
  score: globalState.player.score,
  name: globalState.player.name,
  email: globalState.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  rightQuestions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
