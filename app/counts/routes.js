const express = require('express');
const { counts } = require('./actions');

const router = express.Router();

router.get('/', async function (req, res, next) {
    try {

        const {adsCount, annotationsCount} = await counts();

        res.json({
            adsCount,
            annotationsCount,
        });
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
