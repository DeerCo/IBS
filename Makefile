build:  # build dev
	docker compose -f docker-compose.dev.yml build

run:  # run dev
	docker compose -f docker-compose.dev.yml up -d

down:  # down dev
	docker compose -f docker-compose.dev.yml down