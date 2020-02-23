import Event from '../Event';
import EventDetails from "../EventDetails";
import React from 'react';
import { shallow } from 'enzyme';

describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event />);
  });
test("render event details", () => {
    expect(EventWrapper.find(EventDetails)).toHaveLength(1);
  });
test("render details collapsed", () => {
    expect(EventWrapper.find(EventDetails).prop('isOpen')).toEqual(false);
  });
test("render details visible when click", () => {
    expect(EventWrapper.state('showDetails')).toEqual(false);
    EventWrapper.find('.details').simulate('click');
    expect(EventWrapper.find(EventDetails).prop('isOpen')).toEqual(true);
  });
test("render details collapsed when click", () => {
    expect(EventWrapper.state('showDetails')).toEqual(true);
    EventWrapper.find('.details').simulate('click');
    expect(EventWrapper.find(EventDetails).prop('isOpen')).toEqual(false);
  });
// test("render details visible", () => {
//     expect(EventWrapper.find(EventDetails).prop('isOpen')).toEqual(true);
//   });
}); 