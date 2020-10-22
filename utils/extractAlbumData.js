// maps over GET albums endpoint response data, extracts album and artist details in an object
// returns an array of albums and artists

const extractAlbumData = (data) => {
  const items = data.albums.items;

  const albums = items.map((albumObj) => {
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
