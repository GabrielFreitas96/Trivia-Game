import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../Service/service';
import Header from '../components/Header';
import './Game.css';

class Game extends React.Component {
  state = {
    resultsQuestions: [],
    counter: 0,
    allQuestions: [],
    correctAnswer: '',
    isDisabled: true,
    isHidden: true,
  }

  async componentDidMount() {
    const { token } = this.props;
    console.log(token);
    const ApiResult = await getQuestions(token);
    const { counter } = this.state;
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
    let counterIndex = 0 - 1;
    return randomQuestions.map((element) => {
      if (element === correctAnswer) {
        return (
          <button
            type="button"
            className="respostaCorreta"
            data-testid="correct-answer"
            onClick={ (event) => { this.clickAnswer(element, event); } }
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
        >
          {element}
        </button>);
    });
  };

  refreshButton = () => {
    this.setState({
      isDisabled: false,
      isHidden: false,
    });
  }

  clickAnswer = (answer, event) => {
    const { correctAnswer } = this.state;
    const answerClick = event.target;
    const answers = document.querySelectorAll('.incorrectAnswer');
    const respostaCorreta = document.querySelector('.respostaCorreta');
    console.log(respostaCorreta);

    if (answer === correctAnswer) {
      answerClick.classList.add('correct');
      answers.forEach((resposta) => {
        resposta.classList.add('incorrect');
      });
    } else {
      console.log('oi:', respostaCorreta);
      respostaCorreta.classList.add('correct');
      answers.forEach((resposta) => {
        resposta.classList.add('incorrect');
      });
    }
    this.refreshButton();
  };

  clickNextQuestion = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      isDisabled: true,
    }
    ));

    const answers = document.querySelectorAll('.incorrectAnswer');
    const respostaCorreta = document.querySelector('.respostaCorreta');

    respostaCorreta.classList.remove('correct');
    answers.forEach((resposta) => {
      resposta.classList.remove('incorrect');
    });
  };

  render() {
    const {
      resultsQuestions,
      counter,
      correctAnswer,
      allQuestions,
      isDisabled,
      isHidden } = this.state;
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
          name="next"
          data-testid="btn-next"
          disabled={ isDisabled }
          hidden={ isHidden }
          onClick={ () => { this.clickNextQuestion(); } }
        >
          Next
        </button>
      </section>
    );
  }
}

const mapStateToProps = (globalState) => ({
  token: globalState.token,
});

export default connect(mapStateToProps)(Game);
Game.propTypes = {
  token: PropTypes.string.isRequired,
};
