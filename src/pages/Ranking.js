import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Ranking extends Component {
  state = {
    playersArray: [],
  }

  componentDidMount() {
    const players =  JSON.parse(localStorage.getItem('ranking'));
    players.sort((a,b) => b.score - a.score);
    this.setState({ playersArray: players })
  }
  
  render() {
    const { playersArray } = this.state;
    return ( 
      <div> 
        <h1 data-testid='ranking-title'>Ranking</h1>
        <div>
          { playersArray.length === 0 ? null 
            : ( 
          playersArray.map((item, index) => (
            <div key={index}>
              <h4 data-testid={`player-name-${index}`}>{item.name}</h4>
              <img src={item.picture} />
              <h4 data-testid={`player-score-${index}`}>{item.score}</h4>
            </div>
            )))}
        </div>
        <Link
          to="/"
        >
          <button
            type="button"
            name="button-play-again"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
      </div>
    )
  }
}

export default Ranking;
