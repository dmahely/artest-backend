const express = require('express');
const dotenv = require('dotenv');

const app = express();
const cors = require('cors');

app.use(express.json()); // for parsing POST bodies
app.use(cors());
dotenv.config();

const fetchAccessToken = require('./api/fetchAccessToken');
const fetchRelatedArtists = require('./api/fetchRelatedArtists');
const prepareRounds = require('./utils/prepareRounds');
const extractRelatedArtists = require('./utils/extractRelatedArtists');

app.get('/token', cors(process.env.FRONTEND_URL), async (req, res) => {
    const tokenVal = await fetchAccessToken();
    const token = tokenVal.access_token;
    // calculate expiry date and time (current time + one hour)
    const expiresAt = Date.now() + 60 * 60 * 1000;
    if (tokenVal) res.send({ token, expiresAt });
});

app.post('/rounds', cors(process.env.FRONTEND_URL), async (req, res) => {
    const { currentRound, accessToken } = req.body;

    const roundsData = await prepareRounds(accessToken, currentRound);
    res.send(roundsData);
});

app.post('/relatedArtists', cors(process.env.FRONTEND_URL), async (req, res) => {
    const { accessToken, artistId } = req.body;
    const artistsData = await fetchRelatedArtists(accessToken, artistId);

    let relatedArtists;
    try {
        relatedArtists = extractRelatedArtists(artistsData);
    } catch (err) {
        throw new Error('Unable to get related artists');
    }
    res.send(relatedArtists);
});

app.listen(process.env.PORT, () => {
    console.log(`🥁 App listening on port ${process.env.PORT}!`);
});
