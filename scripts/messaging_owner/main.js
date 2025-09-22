
const buildContext = require('./createContext');
const message = require('./message')

async function scraper_main(browser, url) {
    try {
        const context = await buildContext(browser);
        const page = await context.newPage();
        const result = await message(page, url);
        await browser.close();
        return result;
    } catch (error) {
        
        console.log('❌ Error at', url, error);
        return { error: error.message };
    }
}

module.exports = scraper_main;

