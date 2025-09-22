const going_to_profile = require('./message_route')
const saving = require('./saving_message');

async function message(page,url){
    await going_to_profile(page,url);
    await page.waitForTimeout(10000);
    let click_message = page.locator('div[role="button"]:has-text("Message")').first();
    await click_message.click();
    await page.waitForTimeout(5000);
    const messageBox = page.locator('[role="textbox"][aria-label="Message"]');
    await messageBox.click();
    await messageBox.type('Hello World!', { delay: 100 });
    await page.waitForTimeout(500);
    await messageBox.press('Enter');
    await page.waitForTimeout(10000);
    const saving_message = await page.locator('[role="button"][aria-label="Chat settings"]');
    await saving_message.click();
    await page.waitForTimeout(5000);
    await page.click('//a[.//span[text()="Open in Messenger"]]');
    // saving(page,url);
    // const click_profile_message = page.locator('.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xc5r6h4.xqeqjp1.x1phubyo.x13fuv20.x18b5jzi.x1q0q8m5.x1t7ytsu.x972fbf.x10w94by.x1qhh985.x14e42zd.x9f619.x1ypdohk.xdl72j9.x2lah0s.x3ct3a4.xdj266r.x14z9mp.xat24cr.x1lziwak.x2lwn1j.xeuugli.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1fmog5m.xu25z0z.x140muxe.xo1y3bh.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x1lliihq').first();
    await page.waitForTimeout(5000);
    await page.keyboard.type('123456',{ delay: 100 });
    // await click_profile_message.click();
    await page.waitForTimeout(5000);
    const urls = page.url();
    // console.log(urls);
    // const element = await page.$('span.xdmh292 x15dsfln x140p0ai x1gufx9m x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x193iq5w xeuugli x13faqbe x1vvkbs x1lliihq xzsf02u xlh3980 xvmahel x1x9mg3 xo1l8bm div.html-div');

    // if (element) {
    //     const text = await element.textContent();
    //     console.log('Element found, text:', text.trim());
    // } else {
    //     console.log('Element not found');
    // }

    return urls;

}

module.exports = message;


