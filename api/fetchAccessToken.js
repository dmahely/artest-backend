const btoa = require('btoa');
const fetch = require('node-fetch');

const client_id = process.env.SPOTIFY_CLIENT_ID,
    client_secret = process.env.SPOTIFY_CLIENT_SECRET,
    apiTokenURL = process.env.SPOTIFY_ACCESS_TOKEN_URL;

async function fetchAccessToken() {
    // encodes client id and secret to base64
    const authParam = btoa(`${client_id}:${client_secret}`);
    const tokenResponse = await fetch(apiTokenURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authParam}`,
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }),
    });

    // jsonify the api response and return the access token
    const tokenVal = await tokenResponse.json();

    return tokenVal;
}

module.exports = fetchAccessToken;
