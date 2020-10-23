const express = require("express");
var app = express();
app.use(express.json()); // for parsing POST bodies
const dotenv = require("dotenv");
dotenv.config();

const fetchAccessToken = require("./api/fetchAccessToken");
const fetchRelatedArtists = require("./api/fetchRelatedArtists");
const prepareRounds = require("./utils/prepareRounds");
const extractRelatedArtists = require("./utils/extractRelatedArtists");

app.get("/token", async function (req, res) {
  const tokenVal = await fetchAccessToken();
  const token = tokenVal.access_token;
  // calculate expiry date and time (current time + one hour)
  const expires_at = Date.now() + 60 * 60 * 1000;
  if (tokenVal) res.send({ token, expires_at });
});

app.post("/rounds", async function (req, res) {
  const currentRound = req.body.currentRound;
  const accessToken = req.body.accessToken;

  const roundsData = await prepareRounds(accessToken, currentRound);
  res.send(roundsData);
});

app.post("/relatedArtists", async function (req, res) {
  const accessToken = req.body.accessToken;
  const artistId = req.body.artistId;
  const artistsData = await fetchRelatedArtists(accessToken, artistId);

  let relatedArtists;
  try {
    relatedArtists = extractRelatedArtists(artistsData);
  } catch (err) {
    throw new Error("Unable to get related artists");
  }
  res.send(relatedArtists);
});

app.listen(process.env.PORT, function () {
  console.log(`🥁 App listening on port ${process.env.PORT}!`);
});
