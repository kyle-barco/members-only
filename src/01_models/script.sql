-- Drop existing tables if they exist, in the correct order
DROP TABLE IF EXISTS msg_creator CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Table: users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  member_status VARCHAR DEFAULT 'registered'
);

-- Table: messages
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  message_text TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);

-- Table: msg_creator (currently unused in code logic, but included as per your code)
CREATE TABLE msg_creator (
  id SERIAL PRIMARY KEY,
  username_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Sample data for users
INSERT INTO users (fullname, username, password, member_status) VALUES
  ('John Doe', 'johnny', 'hashedpassword123', 'member'),
  ('Jane Smith', 'jane_smith', 'hashedpassword456', 'admin'), 
  ('Man', 'manoman', 'hashedpassword456', 'member');

-- Sample data for messages (optional)
INSERT INTO messages (title, message_text, user_id) VALUES
  ('Welcome Message', 'Welcome to the FreeBird club!', 1),
  ('Another Message', 'Keep pushing forward!', 2),
  ('Dont fall in love', 'Instead fall in love on yourself, right person will come in the right time!', 3);
