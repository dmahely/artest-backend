const btoa = require('btoa');
const FetchClient = require('./FetchClient');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const apiTokenURL = process.env.SPOTIFY_ACCESS_TOKEN_URL;

async function fetchAccessToken() {
    // encodes client id and secret to base64
    const authParam = btoa(`${clientId}:${clientSecret}`);
    const body = new URLSearchParams({
        grant_type: 'client_credentials',
    });

    const config = {
        url: apiTokenURL,
        method: 'POST',
        headers: {
            Authorization: `Basic ${authParam}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    };

    const fetcher = new FetchClient(config);
    const tokenVal = await fetcher.fetch();

    return tokenVal;
}

module.exports = fetchAccessToken;
