JSHINT_CLIENT_TARGETS = \
  $(shell find ./public/js -path ./public/js/libs -prune -o -type f -print)

lint:
	@jshint --config ./fixtures/jshint-client-config.js $(JSHINT_CLIENT_TARGETS)
	@jshint --config ./fixtures/jshint-node-config.js ./server.js
	@echo "lint ok"