JSHINT_CLIENT_TARGETS = \
  $(shell find ./public/js -path ./public/js/libs -prune -o -type f -print)

JSHINT_SERVER_TARGETS = \
  server.js \
  $(wildcard ./lib/*.js)

lint:
	@jshint --config ./fixtures/jshint-client-config.js $(JSHINT_CLIENT_TARGETS)
	@jshint --config ./fixtures/jshint-node-config.js $(JSHINT_SERVER_TARGETS)
	@echo "lint ok"