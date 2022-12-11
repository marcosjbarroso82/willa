truffle-console::
	docker-compose run --rm --service-ports truffle /bin/bash

dshell:
	docker-compose run --rm --service-ports server /bin/bash

# remove recursively all pyc files
clean:
	find . -name "*.pyc" -exec rm -rf {} \;

# remove recursively all __pycache__ folders
clean-cache:
	find . -name "__pycache__" -exec rm -rf {} \;