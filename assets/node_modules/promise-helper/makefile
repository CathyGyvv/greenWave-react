TESTS = $(shell find test -type f -name test-*)
NPM_INSTALL_TEST = PYTHON=`which python2.6` NODE_ENV=test cnpm install
NPM_INSTALL_PRODUCTION = PYTHON=`which python2.6` NODE_ENV=production cnpm install
-TESTS := $(sort $(TESTS))

-BIN_MOCHA := node --harmony ./node_modules/.bin/mocha
-BIN_ISTANBUL := node --harmony ./node_modules/.bin/istanbul


default: test
-common-pre: clean -npm-install

test: -common-pre
	@$(-BIN_MOCHA) \
		--no-colors \
		--check-leaks \
		--reporter tap \
		--harmony \
		$(-TESTS)

test-cov: -common-pre
	@$(-BIN_ISTANBUL) cover ./node_modules/.bin/_mocha -- -u exports -R tap $(-TESTS)
	@$(-BIN_ISTANBUL) report html

cov: test-cov
	@open ./coverage/index.html

-npm-install:
	@$(NPM_INSTALL_TEST)

clean:
	@echo 'clean'
