const artists = require('./artists');

const extractRelatedArtists = (data) => {
    // to disallow any 'various artists' as an artist option
    const filteredRelatedArtists = data.artists.filter((artist) => !artist.name.toLowerCase().includes('various'));

    const relatedArtists = filteredRelatedArtists.slice(0, 3).map((artist) => {
        const artistObj = {
            name: artist.name,
            id: artist.id,
            isAnswer: false,
            image: artist.images.length ? artist.images[0].url : '',
        };
        return artistObj;
    });

    // if there are less than 3 related artists, get a
    // random artist from fallback array and add it as an option
    while (relatedArtists.length < 3) {
        const randomArtist = artists[Math.floor(Math.random() * artists.length)];
        const randomIndex = Math.floor(Math.random() * relatedArtists.length);
        relatedArtists.splice(randomIndex, 0, randomArtist);
    }
    return relatedArtists;
};

module.exports = extractRelatedArtists;
