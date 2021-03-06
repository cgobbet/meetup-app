import React, { Component } from 'react';

import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    amount: 32 //defines default amount of events displayed
  };

  handleInputChanged = event => {
    const value = event.target.value;
    this.setState({ amount: value });//changes state and defines amount of events displayed
    this.props.updateEvents(null, null, value);

    if (value < 1) {
      this.setState({
        errorText:
        "Please insert a value equal or greater than 1",
      });
    } else {
      this.setState({
        errorText: '',
      });
    }
  }

  render() {
    return (
      <div className='NumberOfEvents'>
        <ErrorAlert text={this.state.errorText} />
        Showing the next
        <input
          type='number'
          className='eventsDisplayed'
          value={this.state.amount}
          onChange={this.handleInputChanged}
        />
        events
      </div>
    );
  }
}

export default NumberOfEvents;

//15: determines text box name in the tests
//18: determines the actual number of events to be events displayed
//20: exhibits the default number of events events displayed
//21: activates handleInputChanged function on change
