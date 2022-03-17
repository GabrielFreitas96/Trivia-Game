import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TimerAction } from '../Redux/Actions/index';
import '../style/Timer.css';

class Timer extends Component {
  constructor() {
    super();
    this.Timer = () => {};
    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    const interval = 1000;
    this.Timer = setInterval(
      () => this.setState((prevState) => ({ time: prevState.time - 1 })), interval,
    );
    return this.Timer;
  }

  componentDidUpdate() {
    const { time } = this.state;
    const { dispatch } = this.props;
    if (time >= 0) {
      dispatch(TimerAction(time));
    } else {
      return null;
    }
    this.myInterval();
  }

  myInterval = () => {
    const { stopTimer } = this.props;
    if (stopTimer) {
      clearInterval(this.Timer);
    }
  }

  render() {
    const { time } = this.state;
    const numberTime = -1;
    return (
      <div>
        { time <= numberTime ? <h5 className="timer-text">0</h5>
          : (
            <h5 className="timer-text">
              { time }
            </h5>)}
      </div>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stopTimer: PropTypes.bool.isRequired,
};

export default connect()(Timer);
