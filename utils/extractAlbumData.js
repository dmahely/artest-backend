// maps over GET albums endpoint response data, extracts album and artist details in an object
// returns an array of albums and artists

const extractAlbumData = (data) => {
    // to disallow any album with 'soundtrack' in the name
    const filteredAlbums = data.albums.items.filter(
        (album) => !album.name.toLowerCase().includes('soundtrack')
    );

    const albums = filteredAlbums.slice(0, 5).map((albumObj) => {
        const album = {
            coverArt: albumObj.images[0].url,
            name: albumObj.name,
            id: albumObj.id,
            releaseYear: albumObj.release_date.slice(0, 4),
        };

        const artists = [
            {
                name: albumObj.artists[0].name,
                id: albumObj.artists[0].id,
                isAnswer: true,
            },
        ];

        return { album, artists };
    });

    return albums;
};

module.exports = extractAlbumData;
