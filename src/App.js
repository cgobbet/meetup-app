import './App.css';

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { Component } from 'react';

import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { Offline } from "react-detect-offline";
import { getEvents } from './api';
import moment from "moment";

class App extends Component {
  state = {
    events: [],
    page: null,
    lat: null,
    lon: null,
  };

  componentDidMount() {
    this.updateEvents();
  }

  updateEvents = (lat, lon, page) => {
    if (lat && lon) {
      getEvents(lat, lon, this.state.page).then(events =>
        this.setState({ events, lat, lon }),
      );
    } else if (page) {
      getEvents(this.state.lat, this.state.lon, page).then(events =>
        this.setState({ events, page }),
      );
    } else {
      getEvents(this.state.lat, this.state.lon, this.state.page).then(events =>
        this.setState({ events }),
      );
    }
  };

  countEventsOnADate = date => {
    let count = 0;
    for (let i = 0; i < this.state.events.length; i += 1) {
      if (this.state.events[i].local_date === date) {
        count += 1;
      }
    }
    return count;
  };

  getData = () => {
    const next7Days = []; // Create empty array for the next 7 days
    const currentDate = moment(); // Today
    // Loop 7 times for next 7 days
    for (let i = 0; i < 7; i += 1) {
      currentDate.add(1, "days"); // Add 1 day to current date, currentDate changes
      const dateString = currentDate.format("YYYY-MM-DD"); // Format the date
      // Use the countEventsOnADate function to count #events on this date
      const count = this.countEventsOnADate(dateString);
      next7Days.push({ date: dateString, number: count }); // Add this date and number to the list
    }
    return next7Days;
  };

  render() {
    return (
      <div className='App'>
        <h1>meetApp</h1>
        <div className='subheader'>Meetup your places | Meetup your events</div>
        <div className='items-container'></div>
        <div className='offline'>
          <Offline>
            You are offline. Recent data will only become available after you
            reconnect
          </Offline>
        </div>
        <CitySearch updateEvents={this.updateEvents} />
        {/* pass events from App to CitySearch */}
        <NumberOfEvents updateEvents={this.updateEvents} />
        <ResponsiveContainer height={400}>
          <ScatterChart
            width={800}
            height={400}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type='category' dataKey='date' name='date' />
            <YAxis
              allowDecimals={false}
              type='number'
              dataKey='number'
              name='number of events'
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill='#8884d8' />
          </ScatterChart>
        </ResponsiveContainer>
        <EventList events={this.state.events} />
        {/* pass events from App to EventList */}
      </div>
    );
  }
}

export default App;