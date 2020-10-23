// gets the correct artist ids for the upcoming rounds and fetches their data
const baseURL = process.env.SPOTIFY_BASE_URL;
const fetch = require('node-fetch');
const isTokenValid = require('../utils/isTokenValid');

const fetchArtistDetails = async (accessToken, albums) => {
    // get artist ids in a comma separated string
    const artistIds = albums.map((round) => round.artists[0].id).join(',');

    const queryParams = new URLSearchParams({
        ids: artistIds,
    });
    const stringifiedQueryParams = queryParams.toString();

    // append params to baseURL
    const severalArtistsEndpoint = `${baseURL}/artists?${stringifiedQueryParams}`;

    const artistImagesResponse = await fetch(severalArtistsEndpoint, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!isTokenValid(artistImagesResponse)) {
        throw new Error('Authentication error');
    }

    const artistImagesData = await artistImagesResponse.json();

    return artistImagesData;
};

module.exports = fetchArtistDetails;
