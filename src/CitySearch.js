import React, { Component } from "react";

class CitySearch extends Component {
  state = { // define query state for CitySearch component
    query: 'Munich',
  }

  handleInputChanged = (event) => {
  const value = event.target.value;
  this.setState({ query: value });
  }
  render() {
    return (
      <div className='CitySearch'>
        <input // adds city element
          type='text'
          className='city'
          value={this.state.query} //<input> will derive its value from the value of query (which is located in the state of CitySearch).
          onChange={this.handleInputChanged}
        />
        <ul className='suggestions'></ul>
      </div>
    );
  }
}

export default CitySearch;