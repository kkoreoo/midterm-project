// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};
// DB_HOST=localhost
// DB_USER=labber
// DB_PASS='123'
// DB_NAME= midterm
// DB_PORT= 5432


const db = new Pool(dbParams);

// Attempt to connect to the PostgreSQL database and handle connection errors
db.connect(err => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
  }
});

module.exports = db;
