// gets the correct artist ids for the upcoming rounds and fetches their data
const FetchClient = require('./FetchClient');

const baseURL = process.env.SPOTIFY_BASE_URL;
const fetchArtistDetails = async (accessToken, albums) => {
    // get artist ids in a comma separated string
    const artistIds = albums.map((round) => round.artists[0].id).join(',');

    const queryParams = new URLSearchParams({
        ids: artistIds,
    });
    const stringifiedQueryParams = queryParams.toString();

    // append params to baseURL
    const severalArtistsEndpoint = `${baseURL}/artists?${stringifiedQueryParams}`;

    const config = {
        url: severalArtistsEndpoint,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const fetcher = new FetchClient(config);
    const artistDetails = await fetcher.fetch();

    return artistDetails;
};

module.exports = fetchArtistDetails;
