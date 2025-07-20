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

async function fetchSubtitles(imdbId, type, season, episode) {
  try {
    const params = {
      api_key: API_KEY,
      imdb_id: imdbId,
      languages: 'HE',
      type: type,
    };
    if (season && episode) {
      params.season_number = season;
      params.episode_number = episode;
    }
    const response = await axios.get('https://api.subdl.com/api/v1/subtitles', {
      params,
    });
    const { subtitles } = response.data;
    const filtered =
      season && episode
        ? subtitles.filter(
            (sub) => sub.season == season && sub.episode == episode
          )
        : subtitles;
    const formattedSubtitles = filtered.map((sub, index) => ({
      id: `subdl-${index}`,
      lang: 'Hebrew',
      langShort: 'he',
      url: `https://dl.subdl.com${sub.url}`,
      title: `SubDL - ${sub.release_name || 'Hebrew Subtitles'}`,
    }));
    console.log(
      '[SubDL Addon] Final subtitles array to return:',
      formattedSubtitles
    );
    return formattedSubtitles;
  } catch (err) {
    console.error(`SubDL API Error:${type}`, err.message);
    return [];
  }
}

module.exports = { fetchSubtitles };
