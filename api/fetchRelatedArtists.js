const FetchClient = require('./FetchClient');

const baseURL = process.env.SPOTIFY_BASE_URL;

const fetchRelatedArtists = async (accessToken, artistId) => {
    // append params to baseURL
    const relatedArtistsEndpoint = `${baseURL}/artists/${artistId}/related-artists`;

    const config = {
        url: relatedArtistsEndpoint,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const fetcher = new FetchClient(config);
    const relatedArtists = await fetcher.fetch();

    return relatedArtists;
};

module.exports = fetchRelatedArtists;
