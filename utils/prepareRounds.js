// gets 5 random albums with related artists

const fetchAlbums = require('../api/fetchAlbums');
const fetchArtistDetails = require('../api/fetchArtistDetails');
const fetchRelatedArtists = require('../api/fetchRelatedArtists');
const extractAlbumData = require('./extractAlbumData');
const extractArtistData = require('./extractArtistsData');
const extractRelatedArtists = require('./extractRelatedArtists');
const getCurrentArtistId = require('./getCurrentArtistId');

const prepareRounds = async (accessToken, currentRound = 1) => {
    const randomAlbums = await fetchAlbums(accessToken);

    const albums = extractAlbumData(randomAlbums);

    const artistDetails = await fetchArtistDetails(accessToken, albums);

    const artistImages = extractArtistData(artistDetails);

    // map each round's artists obj to an artist image
    const rounds = albums.map((album, index) => {
        album.artists[currentRound - 1].image = artistImages[index];
        return album;
    });

    const artistId = getCurrentArtistId(albums, currentRound);

    const allRelatedArtists = await fetchRelatedArtists(accessToken, artistId);

    const relatedArtists = extractRelatedArtists(allRelatedArtists);

    return { rounds, relatedArtists, currentRound };
};

module.exports = prepareRounds;
