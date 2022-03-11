import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../Service/service';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    resultsQuestions: [],
    counter: 0,
    allQuestions: [],
    correctAnswer: '',
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
    // console.log('random Questions', randomQuestions);
    let counterIndex = 0 - 1;
    return randomQuestions.map((element) => {
      if (element === correctAnswer) {
        // console.log('Entrou no IF');
        // console.log(element);
        return (
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ () => { this.clickAnswer(element); } }
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
          data-testid={ `wrong-answer-${counterIndex}` }
          onClick={ () => { this.clickAnswer(element); } }
          key={ counterIndex }
        >
          {element}
        </button>);
    });
  };

  clickAnswer = (answer) => {
    console.log('Clicado');
    console.log('Clicou na Answer', answer);
  };

  clickNextQuestion = () => {
    console.log('Clicou Next Question');
    this.setState((prevState) => (
      { counter: prevState.counter + 1 }
    ));
  };

  render() {
    const { resultsQuestions, counter, correctAnswer, allQuestions } = this.state;
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
