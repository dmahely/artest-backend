const baseURL = process.env.SPOTIFY_BASE_URL;
const fetch = require("node-fetch");

const getRelatedArtists = async (accessToken, artistId) => {
  // append params to baseURL
  const relatedArtistsEndpoint = `${baseURL}/artists/${artistId}/related-artists`;

  const relatedArtistsResponse = await fetch(relatedArtistsEndpoint, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const relatedArtistsData = await relatedArtistsResponse.json();

  return relatedArtistsData;
};

module.exports = getRelatedArtists;
