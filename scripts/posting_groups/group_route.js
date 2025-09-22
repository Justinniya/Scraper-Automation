async function going_to_this_group(page, url) {
    let fullUrl = url.startsWith('http')
        ? url
        : `https://www.facebook.com/groups/${url}`;

    let retries = 3;
    while (retries > 0) {
        try {
            await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

            if (page.url().includes('login')) {
                throw new Error("Redirected to login page (invalid cookies?)");
            }

            await page.waitForTimeout(3000);
            console.log("✅ Navigated to:", fullUrl);
            return true;
        } catch (err) {
            retries--;
            console.warn(`⚠️ Failed to load ${fullUrl}. Retries left: ${retries}. Error: ${err.message}`);
            if (retries === 0) throw err;
        }
    }
}

module.exports = going_to_this_group;
