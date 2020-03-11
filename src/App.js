import './App.css';

import { Offline, Online } from "react-detect-offline";
import React, { Component } from 'react';

import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';

class App extends Component {
  state = {
    events: [],
    page: null,
    lat: null,
    lon: null
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

  render() {
    return (
      <div className='App'>
        <h1>meetApp</h1>
        <div className='subheader'>your groups | your places | your events</div>
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
        <EventList events={this.state.events} />
        {/* pass events from App to EventList */}
      </div>
    );
  }
}

export default App;