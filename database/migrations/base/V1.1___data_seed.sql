
-- Insert sample data into the users table
INSERT INTO users (first_name, last_name, password, email)
VALUES
    ('John', 'Doe', 'password123', 'john@example.com'),
    ('Jane', 'Smith', 'secret321', 'jane@example.com');

-- Insert sample data into the user_syndicate_reviews table
INSERT INTO user_syndicate_reviews (created_date, title, content)
VALUES
    (CURRENT_DATE, 'Great syndicate!', 'I highly recommend this syndicate.'),
    (CURRENT_DATE, 'Excellent experience', 'I have had a wonderful time in this syndicate.');

-- Insert sample data into the syndicate_types table
INSERT INTO syndicate_types (name)
VALUES
    ('Type A'),
    ('Type B');

-- Insert sample data into the syndicates table
INSERT INTO syndicates (name, description, avatar, syndicate_types_id)
VALUES
    ('Syndicate 1', 'Description of syndicate 1', 'avatar1.png', 1),
    ('Syndicate 2', 'Description of syndicate 2', 'avatar2.png',  2);



-- Insert sample data into the boards table
INSERT INTO boards (name, syndicate_id)
VALUES
    ('Board 1', 1),
    ('Board 2', 2);

-- Insert sample data into the games table
INSERT INTO games (name, reward)
VALUES
    ('Game 1', 1000.00),
    ('Game 2', 2000.00);
-- Insert sample data into the messages table
INSERT INTO messages (message, user_id, board_id)
VALUES
    ('Hello, how is everyone?', 1, 1),
    ('I have an announcement to make!', 2, 2);
-- Insert sample data into the syndicate_roles table
INSERT INTO syndicate_roles (name)
VALUES
    ('Role A'),
    ('Role B');

-- Insert sample data into the draws table
INSERT INTO draws (draw_date, games_id)
VALUES
    (CURRENT_TIMESTAMP, 1),
    (CURRENT_TIMESTAMP, 2);

-- Insert sample data into the outcomes table
INSERT INTO outcomes (result, reward, draw_id)
VALUES
    ('Win', 500.00, 1),
    ('Loss', 0.00, 2);

-- Insert sample data into the user_syndicates table
INSERT INTO user_syndicates (created_date, start_date, leave_date, user_id, syndicate_id, user_syndicate_reviews_id, syndicate_roles_id)
VALUES
    (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, 1, 1, 1, 1),
    (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, 2, 2, 2, 2);

-- Insert sample data into the tickets table
INSERT INTO tickets (ticket_code, draw_id)
VALUES
    ('ABC123', 1),
    ('XYZ456', 2);


