import React, { Component } from "react";

class Event extends Component {
  state = {
    event: [],
    showDetails: false,
  };

  handleDetails = () => {
    this.setState({ showDetails: true });
  };

  render() {
    const showDetails = this.state.showDetails;

    return (
      <div className="event">
        <div className="eventWrap">
          <p className="eventWrap--name">{this.state.event.name}</p>
          <p className="eventWrap--localDate">{this.state.event.local_date}</p>
          <button onClick={() => this.handleDetails()}>+ Details</button>
        </div>
        {showDetails && (
          <div className='eventDetails'>
            <p className='eventDetails--description'>
              {this.state.event.description}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
// handleDetails old handleShowDetails
// eventDetails old eventDetails
// event__Overview event__Overview