'use strict';

const axios = require('axios');

module.exports.getAccessToken = async (event) => {

  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=l2jcfng9l83dsd3qe5vb48988n'
    + '&client_secret=4010b2b0e6k9u8ojghfjkf8v8u'
    + '&grant_type=authorization_code'
    + '&redirect_uri=https://cgobbet.github.io/meetup-app/'
    + '&code=' + event.pathParameters.code; // initially, the code had to be manually inserted here. Then, it should be changed after each server run; to get a new authorization code, https://secure.meetup.com/oauth2/authorize?client_id=l2jcfng9l83dsd3qe5vb48988n&response_type=code&redirect_uri=https://cgobbet.github.io/meetup-app/” - the code will be the last URL element

  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        access_token: info.data.access_token,
        refresh_token: info.data.refresh_token,
      }),
    };
};

module.exports.refreshAccessToken = async (event) => {

  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=l2jcfng9l83dsd3qe5vb48988n'
    + '&client_secret=4010b2b0e6k9u8ojghfjkf8v8u'
    + '&grant_type=refresh_token'
    + '&refresh_token=' + event.pathParameters.refresh_token;

  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        access_token: info.data.access_token,
        refresh_token: info.data.refresh_token,
      }),
    };
};
