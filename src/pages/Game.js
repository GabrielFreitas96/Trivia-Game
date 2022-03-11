import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../Service/service';
import Header from '../components/Header';
import './Game.css';
import Timer from '../components/Timer';
import { TimerAction } from '../Redux/Actions/index';

class Game extends React.Component {
  state = {
    resultsQuestions: [],
    counter: 0,
    allQuestions: [],
    correctAnswer: '',
    disabledBtnQuestions: false,
  }

  async componentDidMount() {
    const { token } = this.props;
    console.log(token);
    const ApiResult = await getQuestions(token);
    const { counter } = this.state;
    console.log(ApiResult.results[counter].correct_answer);
    this.setState({
      resultsQuestions: ApiResult.results,
      correctAnswer: ApiResult.results[counter].correct_answer,
      allQuestions: [...ApiResult.results[counter].incorrect_answers,
        ApiResult.results[counter].correct_answer],
    });
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
    const randomQuestions = this.arrayRandomOrder(arrayAllQuestions);
    // console.log('random Questions', randomQuestions);
    let counterIndex = 0 - 1;
    const { disabledBtnQuestions } = this.state;
    return randomQuestions.map((element) => {
      if (element === correctAnswer) {
        // console.log('Entrou no IF');
        // console.log(element);
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
      // console.log(counterIndex);
      // console.log('Não entrou no if');
      // console.log(element);
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

  clickAnswer = (answer, event) => {
    const { correctAnswer } = this.state;
    const answerClick = event.target;
    const answers = document.querySelectorAll('.incorrectAnswer');
    const respostaCorreta = document.querySelector('.respostaCorreta');

    if (answer === correctAnswer) {
      answerClick.classList.add('correct');
      answers.forEach((resposta) => {
        resposta.classList.add('incorrect');
      });
    } else {
      respostaCorreta.classList.add('correct');
      answers.forEach((resposta) => {
        resposta.classList.add('incorrect');
      });
    }
  };
  ;

  clickNextQuestion = () => {
    console.log('Clicou Next Question');
    this.setState((prevState) => (
      { counter: prevState.counter + 1 }
    ));
  };

  disableButtons = () => {
    console.log('entrei');
    this.setState({ disabledBtnQuestions: true });
    const { dispatch } = this.props;
    const number = 30;
    dispatch(TimerAction(number));
    // this.setState((prevState) => (
    //   { counter: prevState.counter + 1,
    //   disabledBtnQuestions: !prevState.disabledBtnQuestions, }
    // ));
  }

  render() {
    const { resultsQuestions,
      counter, correctAnswer, allQuestions, disabledBtnQuestions } = this.state;
    const { timer } = this.props;
    console.log(disabledBtnQuestions, timer);
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
                {this.createQuestions(allQuestions, correctAnswer)}
              </div>
            </div>
          )}
        <button
          type="button"
          onClick={ () => { this.clickNextQuestion(); } }
        >
          NEXT QUESTION
        </button>
        <Timer />
        { timer === 0 ? this.disableButtons() : null }
      </section>
    );
  }
}

const mapStateToProps = (globalState) => ({
  token: globalState.token,
  timer: globalState.timer,
});

export default connect(mapStateToProps)(Game);
Game.propTypes = {
  token: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};
