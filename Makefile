link_dir := $(shell mktemp -d /tmp/linkdoc.XXXX)

# Builds SASS->CSS, compiles the site, and ensures that search.json is updated
# If you've changed content, always commit search.json
all:
	bundle exec jekyll build

# Builds the site and runs linklint to check for bad links
test: all
	bundle exec htmlproof ./public --only-4xx --check-html --href-ignore "/#/,/\/register/,/APP_TOKEN/"

stage: all stamp test
	surge -d https://dev-socrata-staging.surge.sh public

# Pushes updated taglines file. Since this requires my password, you (probably) can't run it...
taglines:
	curl --user chris.metcalf@socrata.com -X PUT --data @taglines.json --header "Content-type: application/json" --header "X-App-Token: bjp8KrRvAPtuf809u1UXnI0Z8" https://soda.demo.socrata.com/resource/etih-7ix2.json

# Generates a build stamp and plugs it into a file in public
stamp:
	echo "SHA: `git rev-parse HEAD`" > ./public/build.txt
	echo "Date: `date`" >> ./public/build.txt
