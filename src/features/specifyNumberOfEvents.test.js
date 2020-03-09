import { defineFeature, loadFeature } from "jest-cucumber";

import App from "../App";
import NumberOfEvents from "../NumberOfEvents";
import React from "react";
import { mockEvents } from "../mock-events";
import { mount } from "enzyme";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
  test("App default is to display 32 events", ({ given, when, then }) => {
    let AppWrapper;
    given("number of events is still the default", () => {
      AppWrapper = mount(<App />);
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.state("amount")).toBe(32);
    });
    when("the events for the selected city are displayed", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(mockEvents.events.length);
    });
    then("the default amount of events is 32", () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.find(".eventsDisplayed").prop("value")).toBe(
        32,
      );
    });
    test("User can change amount of events displayed", 
    ({ given, when, then }) => {
      given("the app has been opened by user", () => {
        AppWrapper = mount(<App />);
      });
      when("user types the desired number", () => {
        AppWrapper = mount(<App />);
        AppWrapper.find(".eventsDisplayed").simulate("change", {
          target: { value: 10 },
        });
      });
      then("the new number is now the default", () => {
        // expect(AppWrapper.state('value')).toBe(10);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        expect(
        NumberOfEventsWrapper.find(".eventsDisplayed").prop("value"),
        ).toBe(10);
      });
    });
  });
});