up:
	docker-compose up -d

restart:
	docker-compose down
	make up

rebuild:
	docker-compose down -v
	docker-compose build
	make up

rr:
	docker-compose exec -it app-dev yarn stop && yarn start