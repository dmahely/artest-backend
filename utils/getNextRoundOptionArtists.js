const fetchRelatedArtists = require('../api/fetchRelatedArtists');
const getCurrentArtistId = require('./getCurrentArtistId');

const getNextRoundArtistOptions = async (rounds, nextRound) => {
    const artistId = getCurrentArtistId(rounds, nextRound);

    const artists = await fetchRelatedArtists(artistId);

    return artists;
};

module.exports = getNextRoundArtistOptions;
