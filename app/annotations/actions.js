require('dotenv').config();
const crypto = require('crypto');
const { getDatabase } = require('../../utils/database');

const CLASSIFICATION_TYPES = {
    NOTHING_SUSPECT: 'Nothing suspect',
    CANT_SAY: "Can't say",
    SURVEY: 'Contains a survey',
    NOT_RELATED_TO_POLITICS_OR_ISSUES_OF_NATIONAL_IMPORTANCE:
      'Not related to politics or issues of national importance',
    PROMOTES_A_CANDIDATE: 'Promotes a candidate, list or political party',
    INTRODUCES_OF_A_NEW_CONTROVERSIAL_ELEMENT:
      'Introduces of a new controversial element',
};

const paramsToClassificationType = {
    survey: CLASSIFICATION_TYPES.SURVEY,
    'promotes-candidates': CLASSIFICATION_TYPES.PROMOTES_A_CANDIDATE,
    'new-controversial-element': CLASSIFICATION_TYPES.INTRODUCES_OF_A_NEW_CONTROVERSIAL_ELEMENT,
    'nothing-suspect': CLASSIFICATION_TYPES.NOTHING_SUSPECT,
    'cant-say': CLASSIFICATION_TYPES.CANT_SAY,
    'not-related-to-politics': CLASSIFICATION_TYPES.NOT_RELATED_TO_POLITICS_OR_ISSUES_OF_NATIONAL_IMPORTANCE,
}

async function annotate(adId, payload, ip, browserUserAgent) {
    try {
        const timestamp = new Date().toISOString();
        const contributorIP = crypto.createHmac('sha512', process.env.SALT).update(ip).digest("hex");
        const userAgent = crypto.createHmac('sha512', process.env.SALT).update(browserUserAgent).digest("hex");

        annotationTable = getDatabase().collection('annotations');
        await annotationTable.insertOne({
            adId,
            payload,
            timestamp,
            contributorIP,
            userAgent,
        });

        return adId;
    } catch (e) {
        throw e;
    }
}

async function getAnnotations(type, skip, limit, isReview) {
    try {
        const annotationsCount = await getDatabase().collection('annotations').count();
        const annotationsCollection = await getDatabase().collection('annotations');
        const query = [
            {
                $lookup:
                {
                    from: "ads",
                    localField: "adId",
                    foreignField: "ad_id",
                    as: 'ad'
                }
            },
            { $unwind: '$ad' },
        ];

        if (type && paramsToClassificationType[type]) {
            query.push({
                $match: { 'payload.value': paramsToClassificationType[type]}
            });
        }


        if (isReview) {
            query.unshift({ $match: { 'isReview': { '$eq': true } }});
        } else {
            query.unshift({ $match: { 'isReview': { '$ne': true } }});
        }

        query.push({ $skip: skip });
        query.push({ $limit: limit });

        const results = await annotationsCollection.aggregate(query).toArray();

        return {
            results,
            pagination: {
                total: annotationsCount,
                skip,
                limit
            }
        };
    } catch (e) {
        throw e;
    }
}


module.exports = {
    annotate,
    getAnnotations
};
