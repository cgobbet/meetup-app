import CitySearch from "../CitySearch";
import React from "react";
import { shallow } from "enzyme";

describe("<CitySearch /> component", () => {
  let CitySearchWrapper;
  beforeAll(() => {
    CitySearchWrapper = shallow(<CitySearch />);
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
    const CitySearchWrapper = shallow(<CitySearch />);
    const eventObject = { target: { value: "Berlin" } }; 
    CitySearchWrapper.find(".city").simulate("change", eventObject);
    expect(CitySearchWrapper.state("query")).toBe("Berlin");
    });
});