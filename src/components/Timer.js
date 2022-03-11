import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TimerAction } from '../Redux/Actions/index';

class Timer extends Component {
  state = {
    time: 30,
  }

  componentDidMount() {
    const interval = 1000;
    const myInterval = setInterval(
      () => this.setState((prevState) => ({ time: prevState.time - 1 })), interval,
    );
    return myInterval;
  }

  componentDidUpdate() {
    const { time } = this.state;
    const { dispatch } = this.props;
    if (time === 0) {
      dispatch(TimerAction(time));
    }
  }

  render() {
    const { time } = this.state;
    const numberTime = -1;
    return (
      <div>
        { time <= numberTime ? <h4>0</h4>
          : (
            <h4>
              { time }
            </h4>)}
      </div>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
