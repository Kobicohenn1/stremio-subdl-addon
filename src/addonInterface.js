const { addonBuilder } = require('stremio-addon-sdk');
const manifest = require('./manifest.json');
const { fetchSubtitles } = require('./subdlApi');

const builder = new addonBuilder(manifest);

builder.defineSubtitlesHandler(async ({ type, id }) => {
  try {
    const subtitles = await fetchSubtitles(id, type);
    return { subtitles };
  } catch (err) {
    console.error('Error in subtitles handler:', err.message);
    return { subtitles: [] };
  }
});

module.exports = builder.getInterface();
