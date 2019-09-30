const { getDatabase } = require('../../utils/database');

async function random(nbAds) {
    try {
        const adsTable = getDatabase().collection('ads');
        const cursor = await adsTable.aggregate([{ '$sample': { size: nbAds } }]);
        const randomAds = await cursor.toArray();

        return randomAds;
    } catch (e) {
        throw e;
    }
};

module.exports = {
    random
};
