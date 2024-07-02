# README

This README provides instructions to get the Rails application up and running using Docker.

## Ruby version
3.1.1

## System dependencies
- Docker

## Configuration

### Database
- PostgreSQL is used as the database in this application.

## Database creation and initialization
rails db:create db:migrate
<!-- OR -->
<!-- while running docker compose up in separate terminal within same directory -->
docker-compose exec backend rails db:migrate 

To run the whole application Backend and Frontend goto the root directory and run:
for first time: docker compose up --build or docker-compose up --build
after that: docker compose up
for down of docker: docker compose down
