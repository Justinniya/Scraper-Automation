const { chromium } = require('playwright');
async function createBrowser() {
    const browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox','--enable-blink-features=ClipboardAPI']
        });

    return browser;
}

module.exports = createBrowser;