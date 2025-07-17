const { addonBuilder } = require('stremio-addon-sdk');
const manifest = require('./manifest.json');
const { fetchSubtitles } = require('./subdlApi');

const builder = new addonBuilder(manifest);
/**
 * Defines the subtitles handler for the streimo addon
 * When stremio request subtitles for movie/series
 * This function triggered fetches them from SubDL
 *
 * @param {Object} args
 * @param {string} args.type - 'movie' or 'series'
 * @param {string} args.id - Imdb id
 * @returns {Promise<Object>} subtitles array of subtitles objects
 */

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
