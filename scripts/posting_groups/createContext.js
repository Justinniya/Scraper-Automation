const fs = require('fs');

async function buildContext(browser) {
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        viewport: null,
        // viewport: { width: 1920, height: 1080 },
        permissions: ['clipboard-read', 'clipboard-write']
    });
    console.log();

    // --- Load cookies ---
    let cookies = JSON.parse(fs.readFileSync(`${process.cwd()}/scripts/cookies/facebook_cookies.json`, 'utf-8'));
    cookies = cookies.map(cookie => {
        if (!cookie.sameSite || cookie.sameSite.toLowerCase() === 'no_restriction') {
            cookie.sameSite = 'None';
        } else if (cookie.sameSite.toLowerCase() === 'lax') {
            cookie.sameSite = 'Lax';
        } else if (cookie.sameSite.toLowerCase() === 'strict') {
            cookie.sameSite = 'Strict';
        }
        if (cookie.expirationDate) {
            cookie.expires = Math.floor(cookie.expirationDate);
            delete cookie.expirationDate;
        }
        delete cookie.hostOnly;
        delete cookie.storeId;
        delete cookie.session;
        return cookie;
    });

    await context.addCookies(cookies);
    return context;
}

module.exports = buildContext;
