const axios = require('axios');
require('dotenv').config();

// Request to Google Books
const checkGoogleBooks = (taskString) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${taskString}&key=${process.env.GOOGLE_API}`)
  .then((data) => {
    if (data.data.totalItems !== 0) {
      return true;
    } else {
      console.log('hello');
      return null;
    }
  })
  .catch((error) => {
    console.log('error msg:', error.response);
  });
};

// need to figure out how to find location or we hard code it.
const checkYelp = (taskString, city) => {
  const options = {
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    params: {
      term: `${taskString}`,
      location: city,
      categories: 'food&categories=resturant',
      sort_by: 'best_match',
      limit: '20'
    },
    headers: {accept: 'application/json', Authorization: `Bearer ${process.env.YELP_API}`}
  };

  axios.request(options)
    .then(function (response) {
      console.log('success', response.data);
      console.log(response.data.businesses[0].categories);
    })
    .catch(function (error) {
      console.error('error msg:', error.response);
    });
};

const checkMovieDB = function(taskString) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?query=${taskString}&include_adult=false&language=en-US&page=1`,
    headers: {accept: 'application/json', Authorization: `Bearer ${process.env.MOVIE_API}`}
  };

  axios.request(options)
  .then(function (response) {
    if (response.data.total_results !== 0){
      console.log('success', response.data);
      return true;
    } else {
      console.log('no matches', response.data);
      return null;
    }
  })
  .catch(function (error) {
    console.error('error', error);
  });
};

module.exports = { checkGoogleBooks, checkYelp, checkMovieDB };

