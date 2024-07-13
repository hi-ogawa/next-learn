# phony all
.PHONY: $(shell grep --no-filename -E '^([a-zA-Z_-]|/)+:' $(MAKEFILE_LIST) | sed 's/:.*//')

db/reset:
	docker compose exec -T postgres psql postgres postgres -c 'DROP DATABASE IF EXISTS "development"' -c 'CREATE DATABASE "development"'
