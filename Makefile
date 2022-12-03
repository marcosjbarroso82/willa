truffle-console::
	docker-compose run --rm --service-ports truffle /bin/bash

dshell:
	docker-compose run --rm --service-ports server /bin/bash