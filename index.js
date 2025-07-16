const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
const addonInterface = require('./src/addonInterface');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7000;

const router = getRouter(addonInterface);

app.use('/stremio-subdl-addon', router);

app
  .listen(PORT, () => {
    console.log(
      `Addon running at http://localhost:${PORT}/stremio-subdl-addon/manifest.json`
    );
  })
  .on('error', (err) => {
    console.error('Server error:', err.message);
    process.exit(1);
  });
