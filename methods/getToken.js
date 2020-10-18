const btoa = require("btoa");
const fetch = require("node-fetch");

const client_id = process.env.SPOTIFY_CLIENT_ID,
  client_secret = process.env.SPOTIFY_CLIENT_SECRET,
  apiTokenURL = process.env.SPOTIFY_ACCESS_TOKEN_URL;

async function getToken() {
  // encodes client id and secret to base64
  const authParam = btoa(`${client_id}:${client_secret}`);
  const tokenResponse = await fetch(apiTokenURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authParam}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  // jsonify the api response and return the access token
  const tokenVal = await tokenResponse.json();
  const token = tokenVal.access_token;
  // calculate expiry date and time (current time + one hour)
  const expires_at = Date.now() + 60 * 60 * 1000;

  return { token, expires_at };
}

module.exports = getToken;
