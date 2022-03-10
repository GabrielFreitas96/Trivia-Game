import React from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../Service/service';

class Game extends React.Component {
  async componentDidMount() {
    const { token } = this.props;
    console.log(token);
    const resultsQuestions = await getQuestions(token);
    console.log('Result Questions', resultsQuestions);
  }

  render() {
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
