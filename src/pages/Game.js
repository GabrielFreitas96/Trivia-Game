import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../Service/service';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    resultsQuestions: [],
    counter: 0,
  }

  async componentDidMount() {
    const { token } = this.props;
    console.log(token);
    const ApiResult = await getQuestions(token);
    console.log(ApiResult);
    /* ApiResult.results.forEach((element, index, array2) => {
      const index2 = Math.floor(Math.random() * (array2.length - 1));
      array[index] = (array2[index2]);
    }); */
    /* const number = 0.5; */
    // const array = [...ApiResult.results];
    // array
    // .sort(function compare(a, b) {
    //   if (a.difficulty.length < b.difficulty.length) {
    //     return -1;
    //   }
    //   if (a.difficulty.length > b.difficulty.length) {
    //     return 1;
    //   }
    //   if (a.difficulty.length === b.difficulty.length) {
    //     return 0;
    //   }
    // });
    console.log('Result Questions', array);
    this.setState({
      resultsQuestions: array,
    });
  }

  render() {
    const { resultsQuestions, counter } = this.state;
    return (
      <section>
        <Header />
        { resultsQuestions.length === 0 ? null
          : (
            <div>
              <p
                data-testid="question-category"
              >
                { resultsQuestions[counter].category }
              </p>
              <p data-testid="question-text">{ resultsQuestions[counter].question }</p>
              <div data-testid="answer-options">
                <p
                  data-testid="correct-answer"
                >
                  { resultsQuestions[counter].correct_answer }
                </p>
                { resultsQuestions[counter]
                  .incorrect_answers.map((element, index) => (
                    <p
                      key={ index }
                      data-testid={ `wrong-answer-${index}` }
                    >
                      { element }
                    </p>
                  ))}
              </div>
            </div>
          )}
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
