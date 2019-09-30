const { getDatabase } = require('../../utils/database');

async function counts() {
    try {
        const adsCount = await getDatabase().collection('ads').count();
        const annotationsCount = await getDatabase().collection('annotations').count();

        return {
            adsCount,
            annotationsCount,
        };
    } catch (e) {
        throw e;
    }
};

module.exports = {
    counts
};
