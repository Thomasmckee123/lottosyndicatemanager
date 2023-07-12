
CREATE TABLE users(
    id SERIAL NOT NULL CONSTRAINT users_pk PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);
CREATE TABLE syndicates(
    id SERIAL NOT NULL CONSTRAINT syndicate_pk PRIMARY KEY,
    created_date DATE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    avatar VARCHAR(255),
    owner_id SERIAL NOT NULL constraint fk_syndicate_user REFERENCES users(id)
);
CREATE TABLE user_syndicate_reviews(
    id SERIAL NOT NULL Constraint user_syndicate_review_pk PRIMARY KEY,
    created_date DATE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
  
    user_id serial NOT NULL CONSTRAINT fk_user_user_syndicates_reviews REFERENCES users(id),
    syndicate_id serial NOT Null CONSTRAINT fk_user_syndicate_reviews_syndicates REFERENCES syndicates(id)
);

CREATE TABLE roles(
    id SERIAL NOT NULL constraint role_pk PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);



CREATE TABLE user_syndicates(
    id SERIAL NOT NULL constraint user_syndicate_pk PRIMARY KEY,
    start_date DATE NOT NULL,
   
    user_id SERIAL NOT NULL CONSTRAINT FK_user_user_syndicates REFERENCES users(id),
    syndicate_id SERIAL NOT NULL CONSTRAINT FK_user_syndicates_syndicates REFERENCES syndicates(id),
    role_id SERIAL NOT NULL CONSTRAINT FK_role_user_syndicates REFERENCES roles(id)
);

CREATE TABLE games(
    id SERIAL NOT NULL constraint games_pk PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    draw_date DATE NOT NULL,
    reward FLOAT NOT NULL,
    required_ticket_number VARCHAR(255) NOT NULL,
    user_syndicate_id SERIAL NOT NULL CONSTRAINT fk_games_user_syndicate_id REFERENCES user_syndicates(id)
);
CREATE TABLE ticket_status(
    id SERIAL NOT NULL constraint ticket_type_pk PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ;
CREATE TABLE game_user_syndicates_ticket(
    id SERIAL NOT NULL constraint game_user_syndicates_ticket_pk PRIMARY KEY,
    ticket_code INT NOT NULL,
    total_reward_value FLOAT NOT NULL,
    ticket_type_id SERIAL NOT NULL CONSTRAINT fk_ticket_type_game_user_syndicates REFERENCES ticket_types(id),
   user_syndicate_id SERIAL NOT NULL CONSTRAINT FK_user_syndicate_game_user_syndicates_ticket REFERENCES user_syndicates(id),
    game_id SERIAL NOT NULL CONSTRAINT FK_game_game_user_syndicates_ticket REFERENCES games(id)
);

CREATE TABLE boards(
    id SERIAL NOT NULL CONSTRAINT board_pk PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    syndicate_id SERIAL NOT NULL CONSTRAINT FK_syndicate_Board REFERENCES syndicates(id)
);

CREATE TABLE board_message(
    id SERIAL NOT NULL CONSTRAINT board_message_pk PRIMARY KEY,
    message TEXT NOT NULL,
    created_date DATE NOT NULL,
  
    
    board_id SERIAL NOT NULL CONSTRAINT FK_board_message_board_id REFERENCES boards(id),
    user_syndicate_id SERIAL NOT NULL CONSTRAINT FK_board_message_user_syndicate_id REFERENCES user_syndicates(id)
);



