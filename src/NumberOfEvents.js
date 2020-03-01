import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    amount: 32,
  }

  onClick = () => {
    this.setState({
      amount: this.state.amount + 1
    })
  }
  
  render() {
    return (
      <div className='NumberOfEvents'>
        <span>Showing</span>
        <input
          type='text'
          className='city'
          value={this.state.amount}
          onChange={event => this.onClick(event)}
        />
        <button onClick={this.onClick}>+1</button>
      </div>
    );
  }
}

export default NumberOfEvents;

// line 22: "onChange" handler added to input to make company to "Value"
