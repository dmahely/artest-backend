const getCurrentArtistId = (rounds, currentRound) => {
    const artistId = rounds[currentRound - 1].artists[0].id;
    return artistId;
};

module.exports = getCurrentArtistId;
