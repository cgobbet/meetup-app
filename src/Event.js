import React, { Component } from "react";

// import CitySearch from './CitySearch';
import EventDetails from "./EventDetails";

class Event extends Component {
  state = {
    events: [],
    showDetails: false
  };

  handleClick = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  render() {
    return (
      <div className='Event'>
        <div className='id'></div>
        <div className='name'></div>
        <EventDetails isOpen={this.state.showDetails}/>
        <button className='details' onClick={this.handleClick}>
          Details
        </button>
      </div>
    );
  }
}

export default Event;