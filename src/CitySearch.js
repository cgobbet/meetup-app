import React, { Component } from "react";

import { InfoAlert } from "./Alert";
import { getSuggestions } from "./api";

class CitySearch extends Component {
  state = {
    // define query state for CitySearch component
    query: "", // defines query following API documentation
    suggestions: [], // defines suggestions in CitySearch state following API documentation
  };

  handleInputChanged = event => {
    const value = event.target.value;
    this.setState({ query: value });
    getSuggestions(value).then(suggestions => {
      this.setState({ suggestions });

      if (value && suggestions.length === 0) { // if there is an input and no suggestions, then...
        this.setState({// InfoText will be shown
          infoText:
            "We can not find the city you are looking for. Please try another city",
        });
      } else {
        this.setState({
          infoText: '',
        });
      }
    });
  }

  handleItemClicked = (value, lat, lon) => {
    this.setState({ query: value, suggestions: [] }); // set initial state and suggestions array start empty
    this.props.updateEvents(lat, lon);
    // console.log(value);
  };
  render() {
    return (
      <div className='CitySearch'>
        <InfoAlert text={this.state.infoText} />
        {" "}
        Show me events around
        <input // adds city element text box
          type='text'
          className='city'
          placeholder='Which city?'
          value={this.state.query} //<input> will derive its value from the value of query (which is located in the state of CitySearch).
          onChange={this.handleInputChanged}
        />
        <ul className='suggestions'>
          {this.state.suggestions.map((
            item, //render suggestion list items using name_string to diff
          ) => (
            <li
              key={item.name_string}
              onClick={() =>
                this.handleItemClicked(item.name_string, item.lat, item.lon)
              }
            >
              {item.name_string}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CitySearch;
// line 31: list items call handleItemClicked() with item name, item lat and item lon params