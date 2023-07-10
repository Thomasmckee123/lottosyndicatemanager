CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL CONSTRAINT users_pk PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_syndicate_reviews(
    id SERIAL NOT NULL CONSTRAINT user_syndicate_review_pk PRIMARY KEY,
    created_date DATE,
    title VARCHAR(255),
    content TEXT

);
CREATE TABLE IF NOT EXISTS syndicate_types(
    id SERIAL NOT NULL constraint syndicate_types_pk PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS syndicates(
    id SERIAL NOT NULL CONSTRAINT syndicate_pk PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    avatar VARCHAR(255),
syndicate_types_id serial NOT NULL CONSTRAINT fk_syndicates_syndicate_types REFERENCES syndicate_types(id)
);
CREATE TABLE IF NOT EXISTS boards(
    id SERIAL NOT NULL constraint board_pk PRIMARY KEY,
     maximum_contribution INT,
    minimum_contribution INT,
    name VARCHAR(255),
    syndicate_id SERIAL NOT NULL CONSTRAINT fk_syndicate_boards REFERENCES syndicates(id)
    );
CREATE TABLE IF NOT EXISTS messages(
    id SERIAL NOT NULL constraint messages_pk PRIMARY KEY,
    message TEXT,
    board_id SERIAL NOT NULL CONSTRAINT fk_messages_board REFERENCES boards(id),
    user_id serial NOT NULL CONSTRAINT fk_messages_user REFERENCES users(id)
);

    CREATE TABLE IF NOT EXISTS games(
    id SERIAL NOT NULL constraint games_pk PRIMARY KEY,
    name VARCHAR(255),
    reward FLOAT,
    boards_id SERIAL NOT NULL CONSTRAINT fk_games_board REFERENCES boards(id)
);
CREATE TABLE IF NOT EXISTS syndicate_roles(
    id serial NOT NULL CONSTRAINT syndcate_role_pk PRIMARY KEY,
    name VARCHAR(255) NOT NULL
   
);
CREATE TABLE IF NOT EXISTS draws(
    id SERIAL NOT NULL CONSTRAINT draws_pk PRIMARY KEY,
    draw_date TIMESTAMP,
    games_id SERIAL NOT NULL CONSTRAINT fk_draws_games REFERENCES games(id)
);
CREATE TABLE IF NOT EXISTS outcomes(
    id SERIAL PRIMARY KEY,
    result VARCHAR(255),
    reward FLOAT,
draw_id SERIAL NOT NULL CONSTRAINT fk_draws_outcomes REFERENCES draws(id)
);
CREATE TABLE IF NOT EXISTS user_syndicates (
    id SERIAL PRIMARY KEY,
    created_date TIMESTAMP,
        start_date TIMESTAMP,
    leave_date TIMESTAMP,
   
    user_id serial NOT NULL CONSTRAINT fk_user_syndicates_user REFERENCES users(id),
    syndicate_id serial NOT NULL CONSTRAINT fk_syndicate_user_syndicates REFERENCES syndicates(id),
    user_syndicate_reviews_id serial NOT NULL CONSTRAINT fk_syndicate_reviews_user_syndicates REFERENCES user_syndicate_reviews(id),
    syndicate_roles_id serial NOT NULL CONSTRAINT fk_user_syndicates_syndicate_roles REFERENCES syndicate_roles(id)
);


CREATE TABLE IF NOT EXISTS tickets(
    id SERIAL PRIMARY KEY,
    ticket_code VARCHAR(255),
    draw_id serial NOT NULL CONSTRAINT fk_tickets_draws REFERENCES draws(id),
    syndicate_id serial NOT NULL CONSTRAINT fk_ticket_syndicate REFERENCES syndicates(id)
);

















