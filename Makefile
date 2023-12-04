bundle-install:
	docker-compose run --rm web bash -c "bundle install"

app-init:
	docker-compose run --rm web bash -c "rails db:create db:migrate"

app-bash:
	docker-compose run --rm --service-ports web /bin/bash

run-app:
	docker-compose up

rubocop:
	docker-compose run --rm web bash -c "bundle exec rubocop"

rubocop-autofix:
	docker-compose run --rm web bash -c "bundle exec rubocop -a"

rubocop-autofix-unsafe:
	docker-compose run --rm web bash -c "bundle exec rubocop -A"

test-app:
	docker-compose run --rm web bash -c "bin/rails test"