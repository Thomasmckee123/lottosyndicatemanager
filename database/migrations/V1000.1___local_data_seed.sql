version: "3"
services:
  db:
    image: postgres:latest
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - db:/var/lib/postgresql/data
  flyway:
    image: flyway/flyway
    command: -url=jdbc:postgresql://db/postgres -schemas=public -user=user
      -password=password -connectRetries=5 migrate
    volumes:
      - ./database:/flyway/sql
    depends_on:
      - db
volumes:
  db: