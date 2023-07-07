INSERT INTO users(first_name, last_name, password, email) VALUES 
('Lucky', 'Lotto', 'luckyNumber777', 'lucky.lotto@example.com'),
('Bingo', 'Bonanza', 'bingoBlast2023', 'bingo.bonanza@example.com');

INSERT INTO syndicate_roles(name) VALUES 
('Moderator'),
('Member');

INSERT INTO syndicate_types(name) VALUES 
('Office Lottery Group'),
('Online Lottery Club');

INSERT INTO syndicates(name, description, avatar, maximum_contribution, minimum_contribution, syndicate_type_id) VALUES 
('Office Lottery Syndicate', 'Join our office syndicate for a chance to win big', 'officeAvatar', 100, 5, 1),
('Internet Lottery Club', 'Online club for passionate lotto players', 'internetClubAvatar', 200, 10, 2);

INSERT INTO user_syndicates(created_date, start_date, leave_date, syndicate_id, user_id, syndicate_role_id) VALUES 
('2023-07-01 00:00:00', '2023-07-01 00:00:00', NULL, 1, 1, 1), 
('2023-07-02 00:00:00', '2023-07-02 00:00:00', NULL, 2, 2, 1);

INSERT INTO user_syndicate_reviews(created_date, title, content) VALUES 
('2023-07-03', 'Loving the Odds', 'Office Lottery Syndicate has made playing the lottery so much more fun and social - Lucky'),
('2023-07-04', 'Winning with Friends', 'Playing in the Internet Lottery Club is a great way to play the lotto with friends across the world - Bingo');

INSERT INTO games(name, date, reward) VALUES 
('powerball', '2023-07-09 00:00:00', 5000.0),
('national Lottery', '2023-07-06 00:00:00', 10000.0);

INSERT INTO boards(board_title, syndicate_id) VALUES 
('Office Strategies', 1),
('Online Lottery Tips', 2);

INSERT INTO messages(message, user_id) VALUES 
('Remember, never spend more than you can afford to lose. Play responsibly!', 1),
('The key to winning is persistence. Don’t lose heart if you don’t win at first!', 2);

INSERT INTO draws(draw_date, game_id, board_id) VALUES 
('2023-07-05 00:00:00', 1, 1),
('2023-07-06 00:00:00', 2, 2);

INSERT INTO tickets(ticket_code, draw_id, syndicate_id) VALUES 
('Ticket1', 1, 1),
('Ticket2', 2, 2);

INSERT INTO outcomes(result, reward, draw_id) VALUES 
('Loss', 0.0, 1),
('Win', 10000.0, 2);
