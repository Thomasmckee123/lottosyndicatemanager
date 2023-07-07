version: "3"
services:
  db:
    image: postgres:latest
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_DB: lottoSyndicate
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - db:/var/lib/postgresql/data
  flyway:
    image: flyway/flyway
    command: -url=jdbc:postgresql://db/lottoSyndicate -schemas=public -user=postgres -password=password -connectRetries=5 migrate
    volumes:
      - ./database/migrations:/flyway/sql
    depends_on:
      - db
volumes:
  db: 