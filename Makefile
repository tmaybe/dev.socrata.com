jekyll:
	bundle exec jekyll build

incremental-build:
	bundle exec jekyll build --incremental --safe

quick: incremental-build stamp

watch:
	bundle exec jekyll build --watch --incremental --safe

clean:
	rm -rf public

htmlproof:
	bundle exec htmlproof ./public --only-4xx --check-html --href-ignore "/#/,/\/foundry/,/\/register/,/APP_TOKEN/"

casperjs:
	casperjs --ssl-protocol=any --verbose --log-level=warning test _tests/*

casperdebug:
	casperjs --ssl-protocol=any --ignore-ssl-errors=true --verbose --log-level=debug test ./_tests/*

# Generates a build stamp and plugs it into a file in public
SHA=$(shell git rev-parse --short HEAD)
DATE=$(shell git show --pretty="format:%at" HEAD | head -n 1)
define STAMP
{
  "sha" : "$(SHA)",
  "href" : "https://github.com/socrata/dev.socrata.com/commit/$(SHA)",
  "date" : $(DATE)
}
endef
export STAMP
stamp:
	echo "Stamping with build.json..."
	@echo "$$STAMP" > ./public/build.json

done:
	if [[ -x /usr/local/bin/terminal-notifier && -x /usr/local/bin/reattach-to-user-namespace ]]; then \
		reattach-to-user-namespace terminal-notifier -message "Done!"; \
	fi

# Pushes updated taglines file. Since this requires my password, you (probably) can't run it...
taglines:
	curl --user chris.metcalf@socrata.com -X PUT --data @taglines.json --header "Content-type: application/json" --header "X-App-Token: bjp8KrRvAPtuf809u1UXnI0Z8" https://soda.demo.socrata.com/resource/etih-7ix2.json

surge:
	surge --project ./public --domain https://$(DOMAIN)

# Default: Build the site
all: clean jekyll stamp done

# Builds the site and runs linklint to check for bad links
test: clean jekyll stamp casperdebug htmlproof done
