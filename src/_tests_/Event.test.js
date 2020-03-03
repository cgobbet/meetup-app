import App from "../App";
import Event from "../Event";
import EventList from "../EventList";
import React from "react";
import { shallow } from "enzyme";

describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event />);
  });

  test("<Event/> is rendered", () => {
    expect(EventWrapper).toHaveLength(1);
  });

  test("event wrapping div rendered", () => {
    expect(EventWrapper.find(".event")).toHaveLength(1);
  });

  test("name & date div rendered", () => {
    expect(EventWrapper.find(".eventWrap")).toHaveLength(1);
  });

  test("eventWrap children rendered", () => {
    expect(EventWrapper.find(".eventWrap").children()).toHaveLength(3);
  });//to display name, date and button for +details

  test("details button is rendered", () => {
    expect(EventWrapper.find(".eventWrap button")).toHaveLength(1);
  });

  test("click on button toggle details", () => {
    EventWrapper.setState({
      showDetails: false,
    });
    EventWrapper.find(".eventWrap button").simulate("click");
    expect(EventWrapper.state("showDetails")).toBe(true);
  });

  test("set mock eventdata as state", () => {
    EventWrapper.setState({
      event: {
        name: "Running Kubernetes on Azure",
        local_date: "2020-03-05",
        description:
          "<p>In this session Mohit Chhabra will give you insights how to run real apps on the most popular container orchestrator in Azure.</p> <p>We’ll review a high-level overview of the Azure Kubernetes Service (AKS) service and Azure Container Registry (ACR). We will start with the basic concepts of Kubernetes followed by understanding how AKS is different from the vanilla Kubernetes. Finally we'll be setting up and deploying a real world app on AKS. Feel free to follow along!</p> <p>Our speaker Mohit is working as Software Engineer at medialesson GmbH, Germany. He is currently Microsoft Most Valuable Professional for Microsoft Azure and former leader of BDotnet (India's Biggest offline community). He has delivered more than 50 sessions in the community and international conferences. Prior to this, Mohit was Microsoft Student Partner and Mozilla Student Representative. He was also India's first Azure Champion and the first person to intern in Microsoft Technology Center.</p> <p>This meetup will be hosted by medialesson, food and drinks will be provided. The session language is English. Please make sure you update your RSVP status 24h in advance so we don't waste any food!</p>"
      },
    });
  });
});
