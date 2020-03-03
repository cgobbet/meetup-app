import React from 'react';
import { shallow, mount } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render text box input', () => {
    expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);//expects const to find only 1 NumberOfEvents (div className )
  });

  test('render input', () => {
    expect(NumberOfEventsWrapper.find('input')).toHaveLength(1);//expects cont to find only one input box
  });

  test('render proper input number', () => {
    const amount = NumberOfEventsWrapper.state('amount');
    expect(NumberOfEventsWrapper.find('.eventsDisplayed').prop('value')).toBe(
      amount
    );//expects state to equal the input class eventsDisplayed
  });

  test('change state after input changes', () => {
    const eventObject = { target: { value: '32' } };
    NumberOfEventsWrapper.find('.eventsDisplayed').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('amount')).toBe('32');
  });//simulates state change and expects the actual state to equal it
});
