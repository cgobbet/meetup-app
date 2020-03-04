import React, { Component } from "react";

class Event extends Component {
  state = {
    event: [],
    showDetails: false
  };

  handleDetails = () => {
    if (this.state.showDetails === false) {
      this.setState({ showDetails: true });
    } else {
      this.setState({ showDetails: false });
    }
  };

  render() {
    const showDetails = this.state.showDetails;
    const { event } = this.props;

    return (
      <div className='event'>
        <div className='eventWrap'>
          <p className='eventWrap--name'>{this.props.event.name}</p>
          <p className='eventWrap--localDate'>{this.props.event.local_date}</p>
          <p className='eventWrap--localTime'>{this.props.event.local_time}</p>
          <button className="button" onClick={() => this.handleDetails()}>+ Details</button>
        </div>
        {this.state.showDetails && (
          <div className='eventDetails'>
            <p className='eventDetails--description'dangerouslySetInnerHTML={{ __html: event.description }}/>
          </div>
        )}
      </div>
    );
  }
}

export default Event;