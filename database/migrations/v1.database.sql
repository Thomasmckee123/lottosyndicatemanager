CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE syndicate_roles(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE syndicate_types(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE syndicates(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    avatar VARCHAR(255),
    maximum_contribution FLOAT,
    minimum_contribution FLOAT,
    syndicate_type_id INTEGER REFERENCES syndicate_types(id)
);

CREATE TABLE user_syndicates(
    id SERIAL PRIMARY KEY,
    created_date TIMESTAMP,
    start_date TIMESTAMP,
    leave_date TIMESTAMP,
    syndicate_id INTEGER REFERENCES syndicates(id),
    user_id INTEGER REFERENCES users(id),
    syndicate_role_id INTEGER REFERENCES syndicate_roles(id)
);

CREATE TABLE user_syndicate_reviews(
    id SERIAL PRIMARY KEY,
    created_date DATE,
    title VARCHAR(255),
    content TEXT
);

CREATE TABLE games(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    date TIMESTAMP,
    reward FLOAT
);

CREATE TABLE boards(
    id SERIAL PRIMARY KEY,
    board_title VARCHAR(255),
    syndicate_id INTEGER REFERENCES syndicates(id)
);

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    message TEXT,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE draws(
    id SERIAL PRIMARY KEY,
    draw_date TIMESTAMP,
    game_id INTEGER REFERENCES games(id),
    board_id INTEGER REFERENCES boards(id)
);

CREATE TABLE tickets(
    id SERIAL PRIMARY KEY,
    ticket_code VARCHAR(255),
    draw_id INTEGER REFERENCES draws(id),
    syndicate_id INTEGER REFERENCES syndicates(id)
);

CREATE TABLE outcomes(
    id SERIAL PRIMARY KEY,
    result VARCHAR(255),
    reward FLOAT,
    draw_id INTEGER REFERENCES draws(id)
);
