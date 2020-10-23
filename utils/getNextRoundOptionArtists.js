const fetchRelatedArtists = require("../api/fetchRelatedArtists");

const getNextRoundArtistOptions = async (rounds, nextRound) => {
  const artistId = getRoundArtistId(rounds, nextRound);

  const artists = await fetchRelatedArtists(artistId);

  return artists;
};

module.exports = getNextRoundArtistOptions;
