const express = require('express');
const {
    annotate,
    getAnnotations
} = require('./actions');

const router = express.Router();

router.get('/annotations/:type?', async function (req, res, next) {
    try {
        const type = req.params.type;
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 100;
        const isReview = !!req.query.isReview || false;

        const result = await getAnnotations(type, skip, limit, isReview);

        res.json(result);
    } catch (e) {
        return next(e);
    }
});

async function annotateRoute (req, res, next) {
    try {
        const adId = req.params['adId'];
        const payload = req.body;
        const contributorIP = req.ip;
        const userAgent = req.headers['user-agent'];

        await annotate(adId, payload, contributorIP, userAgent);

        res.status(201).json({
            id: adId
        });
    } catch (e) {
        return next(e);
    }
}

//deprecatde route
router.post('/ads/:adId/annotation', annotateRoute);

// Sample request:
// curl -X POST http://localhost:3003/ads/1254/annotation --header "Content-Type: application/json" --data '{"value": "hello"}'
router.post('/political-ads/:adId/annotation', annotateRoute);

module.exports = router;
