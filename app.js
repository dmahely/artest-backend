const express = require("express");
var app = express();
app.use(express.json()); // for parsing POST bodies
const dotenv = require("dotenv");
dotenv.config();
const getToken = require("./api/getToken");
const getAlbums = require("./api/getAlbums");
const getArtistData = require("./api/getArtistData");
const extractAlbumData = require("./utils/extractAlbumData");
const extractArtistsData = require("./utils/extractArtistsData");

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/token", async function (req, res) {
  const tokenVal = await getToken();
  const token = tokenVal.access_token;
  // calculate expiry date and time (current time + one hour)
  const expires_at = Date.now() + 60 * 60 * 1000;
  if (tokenVal) res.send({ token, expires_at });
});

app.post("/albums", async function (req, res) {
  const accessToken = req.body.accessToken;
  const albumsVal = await getAlbums(accessToken);
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
  const artistsData = await getArtistData(accessToken, albums);

  let artists;
  try {
    artists = extractArtistsData(artistsData);
  } catch (err) {
    res.send("err");
  }
  res.send(artists);
});

app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});
