const express = require('express');
const { getHello } = require('./scripts/hello.js');
const start_scraping = require('./scripts/Facebook-Scraper-Monitoring/scraper_functions/login_facebook.js');
const starting_messaging = require('./scripts/messaging_owner/start.js');
const starting_posting = require('./scripts/posting_groups/start.js');

const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/hello', (req, res) => {
  res.send(getHello());
});

app.get('/start_scraping', (req, res) => {
  start_scraping();
  return res.send('Scraping is started');
});

app.post('/start_messaging', async (req, res) => {
  try{
    // https://www.facebook.com/reuben.mallorca
    let body = req.body;
    const response = await starting_messaging(body.profile_link);
    return res.json({ success: true, response });
  }catch (err) {
    console.error('❌ Error in /start_posting:', err);
    return res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/start_posting', async (req, res) => {
  try {
    let body = req.body;

    body.url_photo = typeof body.url_photo === 'string'
      ? JSON.parse(body.url_photo.replace(/'/g, '"'))
      : body.url_photo;

    const response = await starting_posting(body.url, body.url_photo, body.caption);
    return res.json({ success: true, response });
  } catch (err) {
    console.error('❌ Error in /start_posting:', err);
    return res.status(400).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`running at automation.localhost`);
});
