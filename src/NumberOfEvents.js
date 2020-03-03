import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    amount: 12 //defines default amount of events displayed
  };

  handleInputChanged = event => {
    const value = event.target.value;
    this.setState({ amount: value });//changes state and defines amount of events displayed
  };

  render() {
    return (
      <div className="NumberOfEvents">Showing the next
        <input
          type="text"
          className="eventsDisplayed"
          placeholder="Set number of events shown"
          value={this.state.amount}
          onChange={this.handleInputChanged}
        /> events
      </div>
    );
  }
}

export default NumberOfEvents;

//15: determines text box name in the tests
//18: determines the actual number of events to be events displayed
//20: exhibits the default number of events events displayed
//21: activates handleInputChanged function on change
