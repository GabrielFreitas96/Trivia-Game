import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions, saveLocalStorage } from '../Service/service';
import Header from '../components/Header';
import './Game.css';
import Timer from '../components/Timer';
import { ScoreAction, TimerAction, RightQuestionsAction } from '../Redux/Actions/index';

class Game extends React.Component {
  state = {
    resultsQuestions: [],
    counter: 0,
    allQuestions: [],
    correctAnswer: '',
    isDisabled: true,
    isHidden: true,
    difficulty: '',
    disabledBtnQuestions: false,
    stopTimer: false,
  }

  async componentDidMount() {
    const { token } = this.props;
    const ApiResult = await getQuestions(token);
    const { counter } = this.state;
    this.setState({
      resultsQuestions: ApiResult.results,
      correctAnswer: ApiResult.results[counter].correct_answer,
      allQuestions: this.arrayRandomOrder(
        [...ApiResult.results[counter].incorrect_answers,
          ApiResult.results[counter].correct_answer,
        ],
      ),
      difficulty: ApiResult.results[counter].difficulty,
    });
  }

  componentDidUpdate() {
    const { score } = this.props;
    const soma = score;
    saveLocalStorage('score', soma);
  }
  // https://pt.stackoverflow.com/questions/406037/mostrar-elementos-de-um-array-em-ordem-aleat%C3%B3ria usado para fazer a função ArrayRandomOrder

  arrayRandomOrder = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  createQuestions = (arrayAllQuestions, correctAnswer) => {
    let counterIndex = 0 - 1;
    const { disabledBtnQuestions } = this.state;
    return arrayAllQuestions.map((element) => {
      if (element === correctAnswer) {
        return (
          <button
            type="button"
            className="respostaCorreta"
            data-testid="correct-answer"
            onClick={ (event) => { this.clickAnswer(element, event); } }
            disabled={ disabledBtnQuestions }
          >
            {element}
          </button>);
      }
      counterIndex += 1;

      return (
        <button
          type="button"
          className="incorrectAnswer"
          data-testid={ `wrong-answer-${counterIndex}` }
          onClick={ (event) => { this.clickAnswer(element, event); } }
          key={ counterIndex }
          disabled={ disabledBtnQuestions }
        >
          {element}
        </button>);
    });
  };

  refreshButton = () => {
    const { counter } = this.state;
    const counterNumerMaximo = 4;
    if (counter <= counterNumerMaximo) {
      this.setState({
        isDisabled: false,
        isHidden: false,
      });
    }
  }

  clickAnswer = (answer, event) => {
    const { correctAnswer, difficulty } = this.state;
    const answerClick = event.target;
    const answers = document.querySelectorAll('.incorrectAnswer');
    const respostaCorreta = document.querySelector('.respostaCorreta');
    let score = 0;
    const { timer, dispatch } = this.props;
    if (answer === correctAnswer) {
      dispatch(RightQuestionsAction());
      answerClick.classList.add('correct');
      answers.forEach((resposta) => {
        resposta.classList.add('incorrect');
      });
      let difficultPoints = 0;
      const hardNumber = 3;
      const mediumNumber = 2;
      const easyNumber = 1;
      if (difficulty === 'hard') {
        difficultPoints = hardNumber;
      } else if (difficulty === 'medium') {
        difficultPoints = mediumNumber;
      } else {
        difficultPoints = easyNumber;
      }
      const scoreNumber = 10;
      score = scoreNumber + (timer * difficultPoints);
      dispatch(ScoreAction(score));
    } else {
      respostaCorreta.classList.add('correct');
      answers.forEach((resposta) => {
        resposta.classList.add('incorrect');
      });
    }
    this.refreshButton();
    this.setState({ stopTimer: true });
  };

  updateQuestions = () => {
    const { resultsQuestions, counter } = this.state;
    this.setState({ correctAnswer: resultsQuestions[counter].correct_answer,
      allQuestions: this.arrayRandomOrder([...resultsQuestions[counter].incorrect_answers,
        resultsQuestions[counter].correct_answer]),
      difficulty: resultsQuestions[counter].difficulty,
    });
  }

  clickNextQuestion = () => {
    const answers = document.querySelectorAll('.incorrectAnswer');
    const respostaCorreta = document.querySelector('.respostaCorreta');
    respostaCorreta.classList.remove('correct');
    answers.forEach((resposta) => {
      resposta.classList.remove('incorrect');
    });
    const { counter } = this.state;
    const questionsNumber = 4;
    if (counter < questionsNumber) {
      this.setState((prevState) => (
        { counter: prevState.counter + 1 }
      ), this.updateQuestions);
    }
    this.setState({
      isDisabled: true,
      isHidden: true,
    });
    if (counter === questionsNumber) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState({ disabledBtnQuestions: false, stopTimer: false });
  };

  disableButtons = () => {
    this.setState({ disabledBtnQuestions: true });
    const { dispatch } = this.props;
    const number = 30;
    dispatch(TimerAction(number));
    this.setState({
      isDisabled: false,
      isHidden: false,
      stopTimer: false,
    });
  }

  render() {
    const {
      resultsQuestions,
      stopTimer,
      counter,
      correctAnswer,
      allQuestions,
      isDisabled,
      isHidden } = this.state;
    const { timer } = this.props;
    return (
      <section>
        <Header />
        { resultsQuestions.length === 0 ? null
          : (
            <div>
              <h2
                data-testid="question-category"
              >
                { resultsQuestions[counter].category }
              </h2>
              <h3
                data-testid="question-text"
              >
                { resultsQuestions[counter].question }
              </h3>
              <div data-testid="answer-options">
                { this.createQuestions(allQuestions, correctAnswer) }
              </div>
            </div>
          )}
        <button
          type="button"
          name="next"
          data-testid="btn-next"
          disabled={ isDisabled }
          hidden={ isHidden }
          onClick={ () => { this.clickNextQuestion(); } }
        >
          Next
        </button>
        <Timer key={ counter } stopTimer={ stopTimer } />
        { timer === 0 ? this.disableButtons() : null }
      </section>
    );
  }
}

const mapStateToProps = (globalState) => ({
  token: globalState.token,
  timer: globalState.timer,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  token: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
