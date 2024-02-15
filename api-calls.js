const axios = require('axios');
require('dotenv').config();


const queryString = 'Harry Potter'

// Request to Google Books
const checkGoogleBooks = (taskString) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${queryString}&key=${process.env.GOOGLE_API}`)
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
  })
};



