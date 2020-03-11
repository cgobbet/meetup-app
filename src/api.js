import axios from 'axios';
import { mockEvents } from "./mock-events";

async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === "get") {
    // Lambda endpoint to get token by code
    url =
      "https://sz7vowj5hl.execute-api.eu-central-1.amazonaws.com/dev/api/token/" +
      key;
  } else if (type === "renew") {
    // Lambda endpoint to get token by refresh_token
    url =
      "https://sz7vowj5hl.execute-api.eu-central-1.amazonaws.com/dev/api/refresh_token/" +
      key;
  }
  // Use Axios to make a GET request to the endpoint
  const tokenInfo = await axios.get(url);

  // Save tokens to localStorage together with a timestamp
  localStorage.setItem("access_token", tokenInfo.data.access_token);
  localStorage.setItem("refresh_token", tokenInfo.data.refresh_token);
  localStorage.setItem("last_saved_time", Date.now());

  // Return the access_token
  return tokenInfo.data.access_token;
}

async function getAccessToken() {
  // checks whether access token is found
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    //if not, checks for an authorization code
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (!code) {
      // checks whether auth code is found; if not, user is automatically redirected to the Meetup API OAuth2 client
      window.location.href =
        "https://secure.meetup.com/oauth2/authorize?client_id=l2jcfng9l83dsd3qe5vb48988n&response_type=code&redirect_uri=https://cgobbet.github.io/meetup-app/";
      return null;
    }
    return getOrRenewAccessToken("get", code);
  }
  const lastSavedTime = localStorage.getItem('last_saved_time');

  if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
    return accessToken;
  }
  // If the access_token is expired, we try to renew it by using refresh_token
  const refreshToken = localStorage.getItem('refresh_token');
  return getOrRenewAccessToken('renew', refreshToken);
}

async function getSuggestions(query) {
  if (window.location.href.startsWith("http://localhost")) { // checks with mocked data when running locally
    return [
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
    ];
  }

    if (!navigator.onLine) {
      const events = localStorage.getItem("lastEvents");
      return JSON.parse(events);
    }

  const token = await getAccessToken();
  if (token) {
    const url =
      "https://api.meetup.com/find/locations?&sign=true&photo-host=public&query=" + // Meetup API “Find Locations” method
      query +
      "&access_token=" +
      token;
    const result = await axios.get(url);
    return result.data;
  }
  return [];
}

async function getEvents(lat, lon, page) {
  if (window.location.href.startsWith("http://localhost")) {
    return mockEvents.events;
  }
  const token = await getAccessToken();
  if (token) {
    let url =
      "https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public" +
      "&access_token=" +
      token;
    // lat, lon is optional; if you have a lat and lon, you can add them
    if (lat && lon) {
      url += "&lat=" + lat + "&lon=" + lon;
    }
    if (page) {
      url += "&page" + page;
    }
    const result = await axios.get(url);
    const events = result.data.events;
    if (events.length) { // Check if the events exist
      localStorage.setItem("lastEvents", JSON.stringify(events));// as localStorage only stores strings, JSONStringify convert list intro string
    }

    return events;
  }
  return [];
}

export { getSuggestions, getEvents };