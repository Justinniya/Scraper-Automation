
const fetch = require('node-fetch');
const downloadImages = require('./download')
const path = require('path');

const going_to_this_group = require('./group_route')

async function posting(page,url,url_photo,caption){
    await going_to_this_group(page,url);
    await page.waitForTimeout(10000);

    await page.waitForSelector('body', { state: 'visible' });
    let click_write_something = page.locator('div[role="button"]:has-text("Write something...")').first();
    await click_write_something.click();
    await page.waitForTimeout(5000);

    console.log("open write something click successfully");

    await page.waitForTimeout(2000);
    await page.keyboard.type(`${caption}`);//`${textPost}`);
    await page.waitForTimeout(2000);

    const modal = page.locator('.x1l90r2v.xyamay9.x1n2onr6');
    await page.waitForTimeout(2000);

    const img = modal.locator('img[src*="Y4mYLVOhTwq.png"]').first();
    await img.click();
    await page.waitForTimeout(2000);

    await page.keyboard.type("sad");
    await page.waitForTimeout(3000);

    let chooseThis = page.locator('.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xc5r6h4.xqeqjp1.x1phubyo.x13fuv20.x18b5jzi.x1q0q8m5.x1t7ytsu.x972fbf.x10w94by.x1qhh985.x14e42zd.x9f619.x1ypdohk.xdl72j9.x2lah0s.x3ct3a4.xdj266r.x14z9mp.xat24cr.x1lziwak.x2lwn1j.xeuugli.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1fmog5m.xu25z0z.x140muxe.xo1y3bh.x1q0g3np.x87ps6o.x1lku1pv.x78zum5.x1a2a7pz.xh8yej3');
    await chooseThis.click({ timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // let click_upload = modal.locator('img[src*="Ivw7nhRtXyo.png"]').first();
    // await click_upload.click();
    // await page.waitForTimeout(2000);

    try{
        const { pics, folderPath } = await downloadImages(url_photo);
        console.log(folderPath,pics);
         const filePaths = pics.map(name => path.join(`${folderPath}/`, name));
         console.log(filePaths);
        const fileInput = page.locator('input[type="file"]').nth(1);
        await page.waitForTimeout(20000);

        console.log('uploading',filePaths);
        await fileInput.setInputFiles(filePaths);
        await page.waitForTimeout(20000);
        await page.waitForTimeout(2000);
        console.log("upload file successfully");

        const postButton = modal.locator('div.x1i10hfl.xjbqb8w[role="button"]').nth(8);
        await postButton.click();
        await page.waitForTimeout(20000);
        // fs.rmSync(folderPath, { recursive: true, force: true });
        return folderPath;
    }catch(err){
        console.log('No file to upload',err);
    }
    
}

module.exports = posting;