import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    amount: 32,
  }
  
  render() {
    return (
      <div className='NumberOfEvents'>
        <span>Showing</span>
        <input value={this.state.amount} />
      </div>
    );
  }
}

export default NumberOfEvents;
