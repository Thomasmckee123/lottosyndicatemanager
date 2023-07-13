INSERT INTO users (first_name, last_name, password, email) VALUES
('Thomas', 'Mckee', 'qwerty12', 'thomasmckee12345@gmail.com'),
('Jake', 'jones', 'w13c81', 'jjones23@gmail.com'),
('Hannah', 'McConnell', 'niceHouse23', 'Hannah03@yahoo.com');

INSERT INTO syndicates (created_date, name, description, avatar, owner_id) VALUES
('2023-07-05', 'Thomas syndicate', 'I want people I know', 'h124ha1.jpg', 1),
('2023-07-10', 'Pink Floyd', 'We just like pink floyd', '38Pb.jpg', 2),
('2023-07-02', 'amazing group', 'we do everything over here', 'c23jauhe.jpg', 3);

INSERT INTO roles (name) VALUES
('Leader'),
('Member'),
('Moderator');

INSERT INTO user_syndicates (start_date, user_id, syndicate_id, role_id) VALUES
('2023-07-13', 1, 1, 1),
('2023-07-14', 2, 2, 1),
('2023-07-15', 3, 3, 1);

INSERT INTO games (name, draw_date, reward, required_ticket_number, user_syndicate_id) VALUES
('powerball', '2023-07-16', 50000.0, 1, 1),
('national Lottery', '2023-07-17', 75000.0, 7, 2),
('German Lottery', '2023-07-18', 100000.0, 8, 3);


INSERT INTO user_syndicate_reviews (created_date, title, content, user_id, syndicate_id) VALUES
  ('2023-07-19', 'Great team!', 'Terrible, im leaving a bad review', 1, 1),


INSERT INTO ticket_status (name) VALUES
('win'),
('loss'),
('pending');

INSERT INTO game_user_syndicates_ticket (ticket_code, total_reward_value, ticket_status_id, user_syndicate_id, game_id) VALUES
(234546, 0, 3, 1, 1),
(234355, 0, 3, 2, 2),
(2345621, 0, 3, 3, 3);

INSERT INTO boards (name, syndicate_id) VALUES
('terrible talk', 1),
('fan club', 2),
('powerball chat', 3);

INSERT INTO board_message (message, created_date, board_id, user_syndicate_id) VALUES
('hi how is everyone!', '2023-07-22', 1, 1),
('great how are you buddy.', '2023-07-23', 2, 2),
('we have to keep moving ', '2023-07-24', 3, 3);

