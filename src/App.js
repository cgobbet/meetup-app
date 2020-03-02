import './App.css';

import React, { Component } from 'react';

import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';

class App extends Component {
  state = {
    events: []
  };

  updateEvents = (lat, lon) => {
    getEvents(lat, lon).then(events => this.setState({ events }));
  }

  render() {
    return (
      <div className='App'>
        <CitySearch updateEvents={this.updateEvents} />
        {/* pass it as a prop to your CitySearch component */}
        <EventList />
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;