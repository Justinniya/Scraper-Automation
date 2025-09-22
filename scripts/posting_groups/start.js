const createBrowser = require('./createBrowser');
const scraper_main = require('./main')
async function starting_posting(url,url_photo,caption){
    const browser = await createBrowser();

    await scraper_main(browser,'2572421176457487',url_photo,caption);
    return "Posted Succesfully";
}

module.exports = starting_posting;
// (async () => {
//     const pics = ['https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/547613974_122133469016903784_305988299025487842_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=z468iaueQl4Q7kNvwGCKJbh&_nc_oc=AdnpvENosvkw3E6ZFfjJKeUnGXO3V_kwH3jZo3LF4NqVb7WUb8zvFTLMNGx_DcAbCko&_nc_zt=23&_nc_ht=scontent.filo1-1.fna&_nc_gid=-KzB1Itn_3fdQdYmy4UZuQ&oh=00_AfbvX0EFv1UL-_BAbOYU3I5W55Opii5HfirYVaRJM4r_ig&oe=68D1C6E8','https://scontent.filo1-1.fna.fbcdn.net/v/t39.30808-6/547613974_122133469016903784_305988299025487842_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=z468iaueQl4Q7kNvwGCKJbh&_nc_oc=AdnpvENosvkw3E6ZFfjJKeUnGXO3V_kwH3jZo3LF4NqVb7WUb8zvFTLMNGx_DcAbCko&_nc_zt=23&_nc_ht=scontent.filo1-1.fna&_nc_gid=-KzB1Itn_3fdQdYmy4UZuQ&oh=00_AfbvX0EFv1UL-_BAbOYU3I5W55Opii5HfirYVaRJM4r_ig&oe=68D1C6E8']
// const resutlt = await main('2572421176457487',pics,'this is a caption');
// console.log(resutlt);
// })();