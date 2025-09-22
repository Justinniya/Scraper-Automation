
const buildContext = require('./createContext');
const posting = require('./facebook_post')
const fs = require('fs');

async function scraper_main(browser, url,url_photo,caption) {
    try {
        const context = await buildContext(browser);
        const page = await context.newPage();
        const folderPath = await posting(page, url,url_photo,caption);

        await browser.close();
        fs.rmSync(folderPath, { recursive: true, force: true });
        return true;
    } catch (error) {
        
        console.log('❌ Error at', url, error);
        return { error: error.message };
    }
}

module.exports = scraper_main;

