const { checkGoogleBooks, checkYelp, checkMovieDB } = require('./api-calls.js');

const keywordsToWatch = ['watch', 'movie', 'film', 'show', 'tv'];
const keywordsToEat = ['eat', 'food', 'recipe', 'restaurant', 'cafe', 'meat', 'vegetable', 'dairy', 'vitamins'];
const keywordsToRead = ['read', 'book', 'journal', 'novel', 'newspaper', 'textbook'];
const keywordsToBuy = ['buy', 'store', 'retail', 'purchase'];

// if taskString has .includes() any of the keywords, we can automatically categorize,
// else call apis, using promise.all,
