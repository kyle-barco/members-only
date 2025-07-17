DROP TABLE IF EXISTS test CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS msg_creator CASCADE;

-- table for users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_member VARCHAR DEFAULT 'registered'
);

-- table for messages
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  message_text TEXT NOT NULL
);

-- table for msg_creator
CREATE TABLE msg_creator (
  id SERIAL PRIMARY KEY,
  username_id INT REFERENCES users(id) 
);
