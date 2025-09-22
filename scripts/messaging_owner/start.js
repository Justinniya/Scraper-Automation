const createBrowser = require('./createBrowser');
const scraper_main = require('./main')
async function starting_messaging(url){
    const browser = await createBrowser();

    const result  = await scraper_main(browser,url);
    return result;
}

module.exports = starting_messaging;

// main('https://www.facebook.com/otniel.aryo.2025');