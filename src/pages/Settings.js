import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategorys } from '../Service/service';
import { CategoryAction, DifficultyAction, TypeAction } from '../Redux/Actions/index';
import '../style/Settings.css';

class Settings extends React.Component {
    state = {
      categorys: [{ name: 'Choose a category...' }],
    };

    async componentDidMount() {
      const results = await getCategorys();
      const { categorys } = this.state;
      this.setState({ categorys: [...categorys, ...results.trivia_categories] });
    }

  createSelectCategory = (categorys) => {
    console.log(categorys);
    return (
      <select className="settings-list" onChange={ this.handleCategoryChange }>
        { categorys.map(({ id, name }, index) => (
          <option key={ index } name={ id } value={ id }>{name}</option>
        ))}
      </select>
    );
  }

  handleCategoryChange = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(CategoryAction(target.value));
  }

  handleDifficultyChange = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(DifficultyAction(target.value));
  }

    handleTypeChange = ({ target }) => {
      const { dispatch } = this.props;
      dispatch(TypeAction(target.value));
    }

    render() {
      const { categorys } = this.state;
      return (
        <>
          <h1 className="settings-h1">Settings</h1>
          <section className="settings-section">
            <div className="settings-div">
              { categorys.length !== 0 ? this.createSelectCategory(categorys)
                : null }
              <select className="settings-list" onChange={ this.handleDifficultyChange }>
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <select className="settings-list" onChange={ this.handleTypeChange }>
                <option value="">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True/False</option>
              </select>
              <Link to="/game">
                <button className="settings-play" type="button">Play</button>
              </Link>
            </div>
          </section>
        </>
      );
    }
}

export default connect()(Settings);
