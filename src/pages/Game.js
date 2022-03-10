import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../Service/service';
import Header from '../components/Header';

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
Game.propTypes = {
  token: PropTypes.string.isRequired,
};
