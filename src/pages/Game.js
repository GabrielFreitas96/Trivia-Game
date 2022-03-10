import React from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';
import { getQuestions } from '../Service/service';
=======
import Header from '../components/Header';
>>>>>>> af061916a7f3434e23c6da176d863204c1ff7d4d

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
        <Header />
      </section>);
  }
}

const mapStateToProps = (globalState) => ({
  token: globalState.token,
});

export default connect(mapStateToProps)(Game);
