-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255)
);
