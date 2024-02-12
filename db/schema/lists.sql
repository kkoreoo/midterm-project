DROP TABLE IF EXISTS lists CASCADE;
CREATE TABLE lists(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255),
  task_id INTEGER REFERENCES tasks(id) NOT NULL
);
