const express = require("express");
var app = express();
app.use(express.json()); // for parsing POST bodies
const dotenv = require("dotenv");
dotenv.config();
const fetchAccessToken = require("./api/fetchAccessToken");
const fetchAlbums = require("./api/fetchAlbums");
const fetchArtistDetails = require("./api/fetchArtistDetails");
const extractAlbumData = require("./utils/extractAlbumData");
const extractArtistsData = require("./utils/extractArtistsData");
const fetchRelatedArtists = require("./api/fetchRelatedArtists");
const extractRelatedArtists = require("./utils/extractRelatedArtists");

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/token", async function (req, res) {
  const tokenVal = await fetchAccessToken();
  const token = tokenVal.access_token;
  // calculate expiry date and time (current time + one hour)
  const expires_at = Date.now() + 60 * 60 * 1000;
  if (tokenVal) res.send({ token, expires_at });
});

app.post("/albums", async function (req, res) {
  const accessToken = req.body.accessToken;
  const albumsVal = await fetchAlbums(accessToken);
  let albums;
  try {
    albums = extractAlbumData(albumsVal);
  } catch (err) {
    res.send("err");
  }
  res.send(albums);
});

app.post("/artists", async function (req, res) {
  const accessToken = req.body.accessToken;
  const albums = req.body.albums;
  const artistsData = await fetchArtistDetails(accessToken, albums);

  let artists;
  try {
    artists = extractArtistsData(artistsData);
  } catch (err) {
    res.send("err");
  }
  res.send(artists);
});

app.post("/relatedArtists", async function (req, res) {
  const accessToken = req.body.accessToken;
  const artistId = req.body.artistId;
  const artistsData = await fetchRelatedArtists(accessToken, artistId);

  let relatedArtists;
  try {
    relatedArtists = extractRelatedArtists(artistsData);
  } catch (err) {
    res.send("err");
  }
  res.send(relatedArtists);
});

app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});
