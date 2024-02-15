const { checkGoogleBooks, checkYelp, checkMovieDB } = require('./api-calls.js');

const keywordsToWatch = ['watch', 'movie', 'film', 'show', 'tv'];
const keywordsToEat = ['eat', 'food', 'recipe', 'restaurant', 'cafe', 'meat', 'vegetable', 'dairy', 'vitamins'];
const keywordsToRead = ['read', 'book', 'journal', 'novel', 'newspaper', 'textbook'];
const keywordsToBuy = ['buy', 'store', 'retail', 'purchase'];
const dictionary = [keywordsToWatch, keywordsToEat, keywordsToRead, keywordsToBuy];
const categories = ['watch','eat','read', 'buy'];

// if taskString has .includes() any of the keywords, we can automatically categorize,
// else call apis, using promise.all,

//the taskString value will be received dynamically from the user
let taskString = "buy a laptop";
//Convert to lowerCase in case upperCase text is provided
let result = taskString.toLowerCase();
//split the taskString and store result varaible
const task = result.split(' ');
const categorizeTask = function(){
  for (let i in dictionary) {

    const categoryKeywords = dictionary[i];

    const matchingKeywords = categoryKeywords.filter(keyword => task.includes(keyword));

    if (matchingKeywords.length > 0) {

        return categories[i];
   }
}

};
module.exports = categorizeTask;


