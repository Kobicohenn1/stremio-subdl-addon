const express = require('express');
const { getRouter } = require('stremio-addon-sdk');
const addonInterface = require('./src/addonInterface'); //addon logic
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7000;

// Create and mount the Stremio router
const router = getRouter(addonInterface);

app.use('/stremio-subdl-addon', router);

/**
 * Starts the Express server and listens for Stremio requests.
 */
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
