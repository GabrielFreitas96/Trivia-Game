import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategorys } from '../Service/service';
import { CategoryAction, DifficultyAction, TypeAction } from '../Redux/Actions/index';

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
    <select onChange={this.handleCategoryChange}>
      { categorys.map(({id, name}) => (
        <option name={id} value={id}>{name}</option>
      ))};
    </select>
    )
  }

  handleCategoryChange = ({target}) => {
  const { dispatch } = this.props;
  dispatch(CategoryAction(target.value));
  }

  handleDifficultyChange = ({target}) => {
    const { dispatch } = this.props;
    dispatch(DifficultyAction(target.value));
    }

    handleTypeChange = ({target}) => {
      const { dispatch } = this.props;
      dispatch(TypeAction(target.value));
      }
  
  render() {
    const { categorys } = this.state;
    return (
      <>
        <h1 className="settings-h1">Settings</h1>
        { categorys.length !== 0 ? this.createSelectCategory(categorys)
          : null
        }
          <select onChange={ this.handleDifficultyChange}>
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select onChange={ this.handleTypeChange}>
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        <Link to='/game'>
            <button type="button">Play</button>
          </Link>
      </>
    );
  }
}

export default connect()(Settings);
