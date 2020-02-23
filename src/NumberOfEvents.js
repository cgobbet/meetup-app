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
        <input value={this.state.amount} />
        <button onClick={this.onClick}>+1</button>
      </div>
    );
  }
}

export default NumberOfEvents;
