const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.SUBDL_API_KEY;

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
