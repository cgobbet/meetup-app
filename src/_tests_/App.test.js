import App from "../App";
import CitySearch from "../CitySearch";
import EventList from "../EventList";
import NumberOfEvents from "../NumberOfEvents";
import React from "react";
import { mockEvents } from "../mock-events";
import { mount } from "enzyme";
import { shallow } from "enzyme";
import { unmount } from "enzyme";

describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
  test("render NumberOfEvents", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe("<App /> integration", () => {
  test("get list of events after user selects a city", async () => {
    const AppWrapper = mount(<App />); // mount because we need to render the component’s children
    AppWrapper.instance().updateEvents = jest.fn(); //tell Jest to execute update function on the component so results can be seen
    AppWrapper.instance().forceUpdate(); //update the App component
    const CitySearchWrapper = AppWrapper.find(CitySearch); //full rendering gives access to children component and its functions like handleItemClicked()
    CitySearchWrapper.instance().handleItemClicked('value', 1.1, 1.2); // value on parameter not relevant; used because the function needs to be called with a value
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(1.1, 1.2); 
    //checks if updateEvents() has been called with the same lat/lon parameters
    AppWrapper.unmount();
  });
  test("change state after get list of events", async () => {
    const AppWrapper = shallow(<App />);
    AppWrapper.instance().updateEvents(1.1, 1.2);
    await AppWrapper.update();
    expect(AppWrapper.state('events')).toEqual(mockEvents.events);
  });
});