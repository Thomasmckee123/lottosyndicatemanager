CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS syndicate_roles(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT uc_syndicate_roles_name UNIQUE (name)
);


CREATE TABLE IF NOT EXISTS syndicate_types(
    id SERIAL NOT NULL constraint syndicate_types_pk PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS syndicates(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    avatar VARCHAR(255),
    maximum_contribution INT,
    minimum_contribution INT,
 CONSTRAINT FK_syndicate_type_syndicates  FOREIGN KEY syndicate_type_id REFERENCES syndicate_types(id)
);

CREATE TABLE IF NOT EXISTS user_syndicates(
    id SERIAL PRIMARY KEY,
    created_date TIMESTAMP,
    start_date TIMESTAMP,
    leave_date TIMESTAMP,
    syndicate_id INTEGER REFERENCES syndicates(id),
   CONSTRAINT fK_user_user_syndicate FOREIGN KEY user_id  REFERENCES users(id),
   CONSTRAINT fk_sydicate_role_user_syndicates FOREIGN KEY syndicate_role_id REFERENCES syndicate_roles(id)
);

CREATE TABLE IF NOT EXISTS user_syndicate_reviews(
    id SERIAL PRIMARY KEY,
    created_date DATE,
    title VARCHAR(255),
    content TEXT
);

CREATE TABLE IF NOT EXISTS games(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    date TIMESTAMP,
    reward FLOAT
);

CREATE TABLE IF NOT EXISTS boards(
    id SERIAL PRIMARY KEY,
    board_title VARCHAR(255),
  CONSTRAINT FK_syndicate_boards FOREIGN KEY syndicate_id REFERENCES syndicates(id)
);

CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY,
    message TEXT,
  constraint FK_messages_users  FOREIGN KEY user_id REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS draws(
    id SERIAL PRIMARY KEY,
    draw_date TIMESTAMP,
   CONSTRAINT FK_draws_game FOREIGN KEY  game_id REFERENCES games(id),
    CONSTRAINT FK_draws_boardsFOREIGN KEY board_id REFERENCES boards(id)
);

CREATE TABLE IF NOT EXISTS tickets(
    id SERIAL PRIMARY KEY,
    ticket_code VARCHAR(255),
   CONSTRAINT FK_tickets_draws FOREIGN KEY draw_id REFERENCES draws(id),
   CONSTRAINT FK_syndicate_draws FOREIGN KEY syndicate_id REFERENCES syndicates(id)
);

CREATE TABLE IF NOT EXISTS outcomes(
    id SERIAL PRIMARY KEY,
    result VARCHAR(255),
    reward FLOAT,
  CONSTRAINT FK_draws_outcomes FOREIGN KEY draw_id REFERENCES draws(id)
);
