jekyll:
	bundle exec jekyll build

clean:
	rm -rf public

# Default: Build the site
all: jekyll done

htmlproof:
	bundle exec htmlproof ./public --only-4xx --check-html --href-ignore "/#/,/\/register/,/APP_TOKEN/"

# Builds the site and runs linklint to check for bad links
test: clean jekyll htmlproof done
	bundle exec htmlproof ./public --only-4xx --check-html --href-ignore "/#/,/\/register/,/APP_TOKEN/"

stage: clean jekyll stamp test done
	surge -d https://dev-socrata-staging.surge.sh public

# Pushes updated taglines file. Since this requires my password, you (probably) can't run it...
taglines:
	curl --user chris.metcalf@socrata.com -X PUT --data @taglines.json --header "Content-type: application/json" --header "X-App-Token: bjp8KrRvAPtuf809u1UXnI0Z8" https://soda.demo.socrata.com/resource/etih-7ix2.json

# Generates a build stamp and plugs it into a file in public
stamp:
	echo "SHA: `git rev-parse HEAD`" > ./public/build.txt
	echo "Date: `date`" >> ./public/build.txt

done:
	if [[ -x /usr/local/bin/terminal-notifier && -x /usr/local/bin/reattach-to-user-namespace ]]; then \
		reattach-to-user-namespace terminal-notifier -message "Done!"; \
	fi ;

