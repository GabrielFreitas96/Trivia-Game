import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <section>
        <h1 data-testid="feedback-text">Página de Feedback</h1>
        <Header />
      </section>
    );
  }
}

export default Feedback;
