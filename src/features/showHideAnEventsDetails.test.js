import {
  defineFeature,
  loadFeature
} from "jest-cucumber";

import App from "../App";
import CitySearch from "../CitySearch";
import Event from "../Event";
import EventList from "../EventList";
import React from "react";
import {
  mockEvents
} from "../mock-events";
import {
  mount
} from "enzyme";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, test => {
  test("By default, an event element is collapsed", ({
    given,
    when,
    then
  }) => {
    given("the events are loaded for their location", () => {
      const AppWrapper = mount( < App / > ); //app is opened
      const CitySearchWrapper = AppWrapper.find(CitySearch); //app sets user location
      expect(CitySearchWrapper.find(".city")).toHaveLength(1); //selects 1 city
    });

    let AppWrapper; //initializes variable
    when("the given locations events are loaded", () => {
      AppWrapper = mount( < App / > ); // updates variable by mounting App
      const EventListWrapper = AppWrapper.find(EventList); //check if there is a list of events
      expect(EventListWrapper).toHaveLength(1); //there should be just one list of events
    });

    then("the user will be able to view event overview", () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(
        mockEvents.events.length);
    });
  });
    // let AppWrapper;
  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the user is interested in seeing the details of an event", () => {
      AppWrapper = mount( < App / > );
    });

    when('the user clicks on the more details button', () => {
      AppWrapper.setState({
        showDetails: true,
      });      
      AppWrapper.find(".event .button").at(0).simulate("click");
      expect(AppWrapper.state("showDetails")).toBe(true);
    });

    // let AppWrapper;
    then("the user will be able to see all of the details for the event", () => {
      AppWrapper.setState({
        showDetails: true
      });
      expect(AppWrapper.state("showDetails")).toBe(true); 
    });
    // let AppWrapper;
  test("User can collapse an event to hide its details", ({
      given,
      and,
      when,
      then
    }) => {

    given("the user is viewing the event", () => {
      AppWrapper = mount(<App />);
    });

    and("the event details are displayed", () => {
      const AppWrapper = mount(<App />);
      AppWrapper.setState({
        showDetails: true
      });
      expect(AppWrapper.find('.eventDetails')).toHaveLength(0)
    });

    when("the user chooses to collapse the details", () => {
      AppWrapper.update();      
      ;
      expect(AppWrapper.find(".event .button").at(0).simulate("click"));  
      });

    then("the event details will be hidden", () => {

      expect(AppWrapper.find(".eventDetails--description")).toHaveLength(1);
    });
    });
  });
});