const axios = require('axios');
require('dotenv').config();
// Request to Google Books


const checkGoogleBooks = (taskString) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=flowers&key=${process.env.GOOGLE_API}`)
  .then((data) => {
    console.log('success', data.data);
  })
  .catch((error) => {
    console.log('error msg:', error.response);
  })
};

checkGoogleBooks();
