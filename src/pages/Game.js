import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../Service/service';
// import Header from '../components/Header';

class Game extends React.Component {
/*   state = {
    resultQuestions: [],
  };
 */
  async componentDidMount() {
    const { token } = this.props;
    console.log(token);
    const resultsQuestions = await getQuestions(token);
    console.log('Result Questions', resultsQuestions);
    /*  this.setState({
      resultQuestions,
    }); */
  }

  render() {
    // const { resultQuestions } = this.state;
    return (
      <section>
        <h1>Tela do Jogo</h1>
      </section>);
  }
}

const mapStateToProps = (globalState) => ({
  token: globalState.token,
});

export default connect(mapStateToProps)(Game);
Game.propTypes = {
  token: PropTypes.string.isRequired,
};
