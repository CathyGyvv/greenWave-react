REGISTRY = https://registry.npm.taobao.org

TNPM_INSTALL = tnpm install
CNPM_INSTALL = cnpm install
NPM_INSTALL = npm install --registry=${REGISTRY}
INSTALL = $(TNPM_INSTALL) || $(CNPM_INSTALL) || $(NPM_INSTALL)

install:
	@${INSTALL}
	@cd assets && ${INSTALL}

release: front
	@echo "env: ${env}"
	@mkdir -p out/release
	@rsync -av . out/release --exclude .git --exclude node_modules --exclude out --exclude test --exclude assets;
	@mv assets/build out/release/assets
	@cd out/release && NODE_ENV=${env} ${INSTALL}
	@if [ -f out/release/config/config_${env}.js ]; then\
		cp out/release/config/config_${env}.js out/release/config/config.js;\
	fi

front:
	@echo building assets...
	@NODE_ENV=development ${INSTALL} honeypack
	@cd assets && NODE_ENV=development ${INSTALL}
	@cd assets && node build.js
	@cd assets && ../node_modules/.bin/honeypack build

test:
	@node_modules/.bin/mocha --require intelli-espower-loader $(shell find test -name *.test.js)

cover:
	@node_modules/.bin/istanbul cover node_modules/.bin/_mocha -- $(shell find test -name *.test.js)

clean:
	@rm -rf node_modules assets/node_modules

.PHONY: install release front test cover clean
