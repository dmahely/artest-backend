const baseURL = process.env.SPOTIFY_BASE_URL;
const wordBank = require('../utils/words');
const FetchClient = require('./FetchClient');

const fetchAlbums = async (accessToken) => {
    const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    const queryParam = `%${randomWord}%`;
    const offsetParam = 0; // to get the most relevant albums
    const typeParam = 'album';
    const limitParam = 5;

    const queryParams = new URLSearchParams({
        q: queryParam,
        type: typeParam,
        limit: limitParam,
        offset: offsetParam,
    });

    const stringifiedQueryParams = queryParams.toString();

    // append params to baseURL
    const searchEndpoint = `${baseURL}/search?${stringifiedQueryParams}`;

    const config = {
        url: searchEndpoint,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const fetcher = new FetchClient(config);
    const albums = await fetcher.fetch();

    return albums;
};

module.exports = fetchAlbums;
