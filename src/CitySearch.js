import React, { Component } from "react";

class CitySearch extends Component {
  state = {
    // define query state for CitySearch component
    query: "", // defines query following API documentation
    suggestions: [], // defines suggestions in CitySearch state following API documentation
  };

  handleInputChanged = event => { // whether any textual changes have been made
    const value = event.target.value;
    this.setState({ query: value });
  };
  handleItemClicked = (value, lat, lon) => {
    this.setState({ query: value });
    this.props.updateEvents(lat, lon);
  };
  render() {
    return (
      <div className='CitySearch'>
        <input // adds city element textbox
          type='text'
          className='city'
          value={this.state.query} //<input> will derive its value from the value of query (which is located in the state of CitySearch).
          onChange={this.handleInputChanged}
        />
        <ul className='suggestions'>
          {this.state.suggestions.map((
            item, //render suggestion list items using name_string to diff
          ) => (
            <li key={item.name_string} onClick={() => this.handleItemClicked(item.name_string, item.lat, item.lon)}>{item.name_string}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CitySearch;