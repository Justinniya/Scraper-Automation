const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

async function downloadImages(urls) {
    // make unique folder inside 'photos'
    const { v4: uuidv4 } = await import('uuid');
    const uuid = uuidv4();
    const folderPath = path.join(process.cwd(), 'photos', uuid);
    fs.mkdirSync(folderPath, { recursive: true });

    const pics = [];

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];

        // naming convention: pic_<i>_photo_<i>.jpg
        const photoName = `pic_${i + 1}_photo_${i + 1}.jpg`;
        const filePath = path.join(folderPath, photoName);

        // fetch and save
        const imgData = await fetch(url).then(res => {
            if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
            return res.buffer();
        });

        fs.writeFileSync(filePath, imgData);
        pics.push(photoName);

        console.log(`✅ Downloaded: ${photoName}`);
    }
    console.log(pics,folderPath);
    return { pics, folderPath };
}

module.exports = downloadImages;
