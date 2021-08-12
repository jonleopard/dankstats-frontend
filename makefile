.PHONY: create dev build

dev:
	npm run dev

build:
	num run build

create:
	docker build \
		-f . \
		-t dankstats-frontend:v1 \
		.
