const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.SUBDL_API_KEY;

/**
 * Fetches hebrew subtitles from the SubDL API based on the IMDB id.
 *
 * @param {string} imdbId - The imdb id of the series or movie.
 * @returns {Promise<Array<Object>>} - A list of formmated subtitles with metadeta.
 * Each subtitle object includes:
 *  - id: string (unique ID for the subtitle)
 *  - lang: string ('Hebrew')
 *  - langShort: string ('he')
 *  - url: string (download link to the .zip SRT file)
 *  - title: string (optional release name)
 */

async function fetchSubtitles(imdbId) {
  try {
    const response = await axios.get('https://api.subdl.com/api/v1/subtitles', {
      params: {
        api_key: API_KEY,
        imdb_id: imdbId,
        languages: 'HE',
        type: 'movie',
      },
    });
    const { subtitles } = response.data;
    const formattedSubtitles = subtitles.map((sub, index) => ({
      id: `subdl-${index}`,
      lang: 'Hebrew',
      langShort: 'he',
      url: `https://dl.subdl.com${sub.url}`,
      title: `SubDL - ${sub.release_name || 'Hebrew Subtitles'}`,
    }));
    console.log('API subtitles:', subtitles);
    return formattedSubtitles;
  } catch (err) {
    console.error('SubDL API Error:', err.message);
    return [];
  }
}

module.exports = { fetchSubtitles };
