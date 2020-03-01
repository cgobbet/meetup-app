import './App.css';

import React, { Component } from 'react';

import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from "./NumberOfEvents";

class App extends Component {
  state = {
    events: [],
    page: null,
    lat: null,
    lon: null,
  };
  
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