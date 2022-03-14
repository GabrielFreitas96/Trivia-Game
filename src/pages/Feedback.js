import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <section>
          <h1 data-testid="feedback-text">Página de Feedback</h1>
          <Header />
        </section>
        <Link
          to="/"
        >
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play again
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
