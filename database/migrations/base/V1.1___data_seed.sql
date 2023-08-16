INSERT INTO users (first_name, last_name, password, email,balance) VALUES 
('John', 'Doe', 'h4x0r123', 'JohnDoe@Gmail.com',0),
('Jane', 'Smith', 'al0ha123', 'JaneSmith@Gmail.com',0),
('Charlie', 'Brown', 'peanut123', 'CharlieBrown@Gmail.com',0);

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
INSERT INTO game_types(name, draw_date, reward, image) VALUES
('euro millions', '2023-08-18', 43000000.0,'euromillions.png'),
('set for life', '2023-08-17', 10000.0,'setforLife.png'),
('Thunderball', '2023-08-16', 500000.0,'thunderball.png'),
('lotto hotpicks', '2023-08-16', 3500000.0, 'hotpicks.png'),
('Euro Millions hotpicks', '2023-08-18',10000000, 'euromillions hotpicks'),
('lotto', '2023-08-16', 20000000, 'lotto.png');

INSERT INTO games ( maximum_players,treasury, user_syndicate_id, game_type_id) VALUES 
( 5,0, 1, 1),
( 2,0, 2, 2),
( 7,0, 3, 3);

INSERT INTO user_syndicate_reviews (created_date, title, content, user_id, syndicate_id) VALUES
  ('2023-07-19', 'Great team!', 'The Thunderbolts really know what they''re doing!', 1, 1),
  ('2023-07-20', 'Sneaky but Effective', 'The Silent Shadows have a unique approach, but it pays off!', 2, 2),
  ('2023-07-21', 'Warriors Indeed!', 'Code Warriors live up to their name!', 3, 3);

INSERT INTO ticket_status (name) VALUES
('win'),
('loss'),
('pending');
INSERT INTO user_games (deposit, start_date, game_id, user_id)
VALUES(0,'2023-07-21', 1, 1);
INSERT INTO game_user_syndicates_ticket (ticket_code, total_reward_value, ticket_status_id, user_syndicate_id, game_id) VALUES
('123456', 0, 3, 1, 1),
('234567', 0, 3, 2, 2),
('345678', 0, 3, 3, 3);

INSERT INTO boards (name, syndicate_id) VALUES
('Thunderbolts Talk', 1),
('Shadows Speak', 2),
('Warriors Word', 3);

INSERT INTO board_message (message, created_date, board_id, user_syndicate_id) VALUES
('Lets win this, Thunderbolts!', '2023-07-22', 1, 1),
('We move silently, we win always.', '2023-07-23', 2, 2),
('No bug can stop us!', '2023-07-24', 3, 3);

