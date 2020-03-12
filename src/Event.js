import {
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import React, { Component } from "react";

class Event extends Component {
  state = {
    showDetails: false,
    event: [],
  };

  handleDetails = () => {
    if (this.state.showDetails === false) {
      this.setState({ showDetails: true });
    } else {
      this.setState({ showDetails: false });
    }
  };

  getAttendance = () => {
    const reserved = this.props.event.yes_rsvp_count;
    const max = this.props.event.rsvp_limit;
    const places = max - this.props.event.yes_rsvp_count

    return (
      [
        {"name": "People Going", value: reserved},
        {"name": "Still Open", "value": places}
      ]
    )
  }

  render() {
    // const showDetails = this.state.showDetails;
    const { event } = this.props;

    let colors = ["#B22222", "#FFD700"];

    return (
      <div className='event'>
        <div className='eventWrap'>
          <p className='eventWrap--name'>{this.props.event.name}</p>
          <p className='eventWrap--localDate'>{this.props.event.local_date}</p>
          <p className='eventWrap--localTime'>{this.props.event.local_time}</p>
          <button className='button' onClick={() => this.handleDetails()}>
            + Details
          </button>
        </div>
        {this.state.showDetails && (
          <div className='eventDetails'>
            {event.yes_rsvp_count && event.rsvp_limit ? (
              <ResponsiveContainer height={180}>
                <PieChart width={180} height={180}>
                  <Pie
                    data={this.getAttendance()}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    innerRadius={40}
                    outerRadius={70}
                    label
                  >
                    {this.getAttendance().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend verticalAlign='top' height={36}>
                    <Line
                      name='Attending'
                      type='stepBefore'
                      dataKey='reserved'
                      stroke='#483D8B'
                    />
                    <Line
                      name='Spots Open'
                      type='stepBefore'
                      dataKey='places'
                      stroke='#006400'
                    />
                  </Legend>
                </PieChart>
              </ResponsiveContainer>
            ) : null}
            <p
              className='eventDetails--description'
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Event;