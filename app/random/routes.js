const express = require('express');
const { random } = require('./actions');

const router = express.Router();

const DEFAULT_NB_ADDS = 20;

router.get('/', async function (req, res, next) {
    try {
        const nbAds = parseInt(req.query.nb_ads) || DEFAULT_NB_ADDS;
        const randomAds = await random(nbAds);

        res.json(randomAds);
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
