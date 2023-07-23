const { getHashByData, fetchData } = require('./utils');

const logUrlErrorMessage = (err, url) => {
    console.log(`[${url}]: ${err}`);
}

const asyncFilter = async (arr, predicate) =>
    Promise.all(arr.map(predicate)).then((results) => arr.filter((_v, index) => results[index]))

const checkHash = async (res, url) => {
    let isDataIntact = false;
    getHashByData(res.data, (hash) => {
        if (hash !== res.hashSum) {
            logUrlErrorMessage('Hashsums do not match', url);
            isDataIntact = false;
        } else {
            logUrlErrorMessage('Fetch successful', url);
            isDataIntact = true;
        }
    });

    return isDataIntact;
}

async function retry(fn, url, retries) {
    if (!retries) {
        logUrlErrorMessage('No retires left', url);
        return false
    }

    try {
        console.log('calling', url)
        const res = await fn(url);

        console.log('getting hash')
        let isDataIntact = false;
        while (!isDataIntact) {
            isDataIntact = await checkHash(res, url);

            if (!isDataIntact) {
                const isSuccessful = retry(fn, url, retries - 1);
                // ...
            }
        }
        return true;
    } catch (err) {
        logUrlErrorMessage(err, url);
        return retry(fn, url, retries - 1);
    }
}

module.exports = async function (urls, retryCount) {
    return asyncFilter(
        urls,
        async (url) => retry(fetchData, url, retryCount)
    )
}
