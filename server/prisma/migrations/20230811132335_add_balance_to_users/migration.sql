-- CreateTable
CREATE TABLE "board_message" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "created_date" DATE NOT NULL,
    "board_id" INTEGER NOT NULL,
    "user_syndicate_id" INTEGER NOT NULL,

    CONSTRAINT "board_message_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boards" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "syndicate_id" SERIAL NOT NULL,

    CONSTRAINT "board_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flyway_schema_history" (
    "installed_rank" INTEGER NOT NULL,
    "version" VARCHAR(50),
    "description" VARCHAR(200) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "script" VARCHAR(1000) NOT NULL,
    "checksum" INTEGER,
    "installed_by" VARCHAR(100) NOT NULL,
    "installed_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "execution_time" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "flyway_schema_history_pk" PRIMARY KEY ("installed_rank")
);

-- CreateTable
CREATE TABLE "game_user_syndicates_ticket" (
    "id" SERIAL NOT NULL,
    "ticket_code" VARCHAR(255) NOT NULL,
    "total_reward_value" DOUBLE PRECISION NOT NULL,
    "ticket_status_id" INTEGER NOT NULL,
    "user_syndicate_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "game_user_syndicates_ticket_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "draw_date" DATE NOT NULL,
    "reward" DOUBLE PRECISION NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "required_ticket_number" VARCHAR(255) NOT NULL,
    "user_syndicate_id" INTEGER NOT NULL,

    CONSTRAINT "games_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "role_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "syndicates" (
    "id" SERIAL NOT NULL,
    "created_date" DATE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "avatar" VARCHAR(255),
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "syndicate_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "ticket_type_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_syndicate_reviews" (
    "id" SERIAL NOT NULL,
    "created_date" DATE NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "syndicate_id" INTEGER NOT NULL,

    CONSTRAINT "user_syndicate_review_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_syndicates" (
    "id" SERIAL NOT NULL,
    "start_date" DATE NOT NULL,
    "user_id" INTEGER NOT NULL,
    "syndicate_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "user_syndicate_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "balance" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "flyway_schema_history_s_idx" ON "flyway_schema_history"("success");

-- AddForeignKey
ALTER TABLE "board_message" ADD CONSTRAINT "fk_board_message_board_id" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "board_message" ADD CONSTRAINT "fk_board_message_user_syndicate_id" FOREIGN KEY ("user_syndicate_id") REFERENCES "user_syndicates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "fk_syndicate_board" FOREIGN KEY ("syndicate_id") REFERENCES "syndicates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_user_syndicates_ticket" ADD CONSTRAINT "fk_game_game_user_syndicates_ticket" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_user_syndicates_ticket" ADD CONSTRAINT "fk_ticket_type_game_user_syndicates" FOREIGN KEY ("ticket_status_id") REFERENCES "ticket_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_user_syndicates_ticket" ADD CONSTRAINT "fk_user_syndicate_game_user_syndicates_ticket" FOREIGN KEY ("user_syndicate_id") REFERENCES "user_syndicates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "fk_games_user_syndicate_id" FOREIGN KEY ("user_syndicate_id") REFERENCES "user_syndicates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "syndicates" ADD CONSTRAINT "fk_syndicate_user" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_syndicate_reviews" ADD CONSTRAINT "fk_user_syndicate_reviews_syndicates" FOREIGN KEY ("syndicate_id") REFERENCES "syndicates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_syndicate_reviews" ADD CONSTRAINT "fk_user_user_syndicates_reviews" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_syndicates" ADD CONSTRAINT "fk_role_user_syndicates" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_syndicates" ADD CONSTRAINT "fk_user_syndicates_syndicates" FOREIGN KEY ("syndicate_id") REFERENCES "syndicates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_syndicates" ADD CONSTRAINT "fk_user_user_syndicates" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
