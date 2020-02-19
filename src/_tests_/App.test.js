import App from "../App";
import CitySearch from "../CitySearch";
import EventList from "../EventList";
import React from "react";
import { shallow } from "enzyme";

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
});

 
//line 10 stores App shallow-rendering to AppWrapper
// line 13 runs find()search for EventList; ensures only one EventList on App