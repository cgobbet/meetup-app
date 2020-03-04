import CitySearch from "../CitySearch";
import React from "react";
import { shallow } from "enzyme";

describe("<CitySearch /> component", () => {
  let CitySearchWrapper;
  beforeAll(() => {
    CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} />);
  });
  test("render text input", () => {
      expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });
  test("render list of suggestions", () => {
      expect(CitySearchWrapper.find(".suggestions")).toHaveLength(1);
  });
  test("render text input correctly", () => {
    const query = CitySearchWrapper.state("query");
      expect(CitySearchWrapper.find(".city").prop("value")).toBe(query);
  });
  test("change state when text input changes", () => {
    const eventObject = { target: { value: "Berlin" } }; 
    CitySearchWrapper.find(".city").simulate("change", eventObject);
      expect(CitySearchWrapper.state("query")).toBe("Berlin");
    });
  test("render list of suggestions correctly", () => {
    const suggestions = CitySearchWrapper.state("suggestions"); // compares suggestions with state value
      expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(
      suggestions.length,
    );
    for (let i = 0; i < suggestions.length; i += 1) { // loops through all the suggestions and compares the items in suggestions one by one.
      expect(
        CitySearchWrapper.find(".suggestions li")
          .at(i)
          .text(),
      ).toBe(suggestions[i].name_string);
    }
    });
    test("click on suggestion should change query state", () => {
      CitySearchWrapper.setState({// control CitySearch component state while testing
        suggestions: [
          {
            city: "Munich",
            country: "de",
            localized_country_name: "Germany",
            name_string: "Munich, Germany",
            zip: "meetup3",
            lat: 48.14,
            lon: 11.58,
          },
          {
            city: "Munich",
            country: "us",
            localized_country_name: "USA",
            state: "ND",
            name_string: "Munich, North Dakota, USA",
            zip: "58352",
            lat: 48.66,
            lon: -98.85,
          },
        ],
      });
      CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
      expect(CitySearchWrapper.state('query')).toBe('Munich, Germany');
    });
    test("click on suggestion should change query state and empty the list of suggestions", () => {
      CitySearchWrapper.setState({
        suggestions: [
          {
            city: "Munich",
            country: "de",
            localized_country_name: "Germany",
            name_string: "Munich, Germany",
            zip: "meetup3",
            lat: 48.14,
            lon: 11.58,
          },
          {
            city: "Munich",
            country: "us",
            localized_country_name: "USA",
            state: "ND",
            name_string: "Munich, North Dakota, USA",
            zip: "58352",
            lat: 48.66,
            lon: -98.85,
          },
        ],
      });
      expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);// test number suggestions before user clicks one of them
      CitySearchWrapper.find(".suggestions li")
        .at(0)
        .simulate("click");
      expect(CitySearchWrapper.state("query")).toBe("Munich, Germany");
      expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(0);// test number suggestions after user clicks one of them
    });
});