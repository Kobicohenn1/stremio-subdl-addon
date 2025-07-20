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
    let subtitles;
    const normalizedType = type === 'series' ? 'tv' : 'movie';
    if (normalizedType === 'tv') {
      const parts = id.split(':');
      const imdbId = parts[0];
      const season = parts[1];
      const episode = parts[2];
      subtitles = await fetchSubtitles(imdbId, normalizedType, season, episode);
    } else {
      console.log(normalizedType);
      subtitles = await fetchSubtitles(id, normalizedType);
    }
    return { subtitles };
  } catch (err) {
    console.error('Error in subtitles handler:', err);
    return { subtitles: [] };
  }
});

module.exports = builder.getInterface();
