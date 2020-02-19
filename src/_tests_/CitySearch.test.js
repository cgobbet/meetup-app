import CitySearch from "../CitySearch";
import React from "react";
import { shallow } from "enzyme";

describe("<CitySearch /> component", () => {
  test("render text input", () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });
});
