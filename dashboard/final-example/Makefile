# phony all
.PHONY: $(shell grep --no-filename -E '^([a-zA-Z_-]|/)+:' $(MAKEFILE_LIST) | sed 's/:.*//')

# Setup
#   make docker/up
#   make db/reset

docker/up:
	docker compose up -d

docker/down:
	docker compose down

docker/clean:
	docker compose down -v --remove-orphans

db/reset:
	docker compose exec -T postgres psql postgres postgres -c 'DROP DATABASE IF EXISTS "development"' -c 'CREATE DATABASE "development"'
