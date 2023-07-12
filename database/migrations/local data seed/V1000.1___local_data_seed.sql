INSERT INTO users (first_name, last_name, password, email) VALUES
('John', 'Doe', 'h4x0r123', 'JohnDoe@GPTmail.com'),
('Jane', 'Smith', 'al0ha123', 'JaneSmith@GPTmail.com'),
('Charlie', 'Brown', 'peanut123', 'CharlieBrown@GPTmail.com');

INSERT INTO syndicates (created_date, name, description, avatar, owner_id) VALUES
('2023-07-10', 'The Thunderbolts', 'For those who strike like lightning!', 'thunderbolts.jpg', 1),
('2023-07-11', 'The Silent Shadows', 'We move in silence, we win in shadows.', 'silent_shadows.jpg', 2),
('2023-07-12', 'Code Warriors', 'Battling bugs, one line of code at a time.', 'code_warriors.jpg', 3);

INSERT INTO roles (name) VALUES
('Leader'),
('Member'),
('Moderator');

INSERT INTO user_syndicates (start_date, user_id, syndicate_id, role_id) VALUES
('2023-07-13', 1, 1, 1),
('2023-07-14', 2, 2, 1),
('2023-07-15', 3, 3, 1);

INSERT INTO games (name, draw_date, reward, required_ticket_number, user_syndicate_id) VALUES
('Fortune Flood', '2023-07-16', 50000.0, 'FF-123456', 1),
('Lucky Labyrinth', '2023-07-17', 75000.0, 'LL-123456', 2),
('Money Maze', '2023-07-18', 100000.0, 'MM-123456', 3);


INSERT INTO user_syndicate_reviews (created_date, title, content, user_id, syndicate_id) VALUES
  ('2023-07-19', 'Great team!', 'The Thunderbolts really know what they''re doing!', 1, 1),
  ('2023-07-20', 'Sneaky but Effective', 'The Silent Shadows have a unique approach, but it pays off!', 2, 2),
  ('2023-07-21', 'Warriors Indeed!', 'Code Warriors live up to their name!', 3, 3);

INSERT INTO ticket_status (name) VALUES
('win'),
('loss'),
('pending');

INSERT INTO game_user_syndicates_ticket (ticket_code, total_reward_value, ticket_status_id, user_syndicate_id, game_id) VALUES
(123456, 0, 3, 1, 1),
(234567, 0, 3, 2, 2),
(345678, 0, 3, 3, 3);

INSERT INTO boards (name, syndicate_id) VALUES
('Thunderbolts Talk', 1),
('Shadows Speak', 2),
('Warriors Word', 3);

INSERT INTO board_message (message, created_date, board_id, user_syndicate_id) VALUES
('Lets win this, Thunderbolts!', '2023-07-22', 1, 1),
('We move silently, we win always.', '2023-07-23', 2, 2),
('No bug can stop us!', '2023-07-24', 3, 3);

