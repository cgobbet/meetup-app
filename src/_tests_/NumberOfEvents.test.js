import NumberOfEvents from "../NumberOfEvents";
import React from "react";
import { shallow } from "enzyme";

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => { NumberOfEventsWrapper = shallow(<NumberOfEvents />); })

  test('render event number input', () => {
    expect(NumberOfEventsWrapper.find('input')).toHaveLength(1);
  });
  test('show 32 events', () => {
    expect(NumberOfEventsWrapper.state('amount')).toBe(32);
  });
    test('changes amount of displayed events', () => {
    expect(NumberOfEventsWrapper.state('amount')).toBe(32);
    NumberOfEventsWrapper.find('button').simulate("click");
    expect(NumberOfEventsWrapper.state("amount")).toBe(33);
  });
});