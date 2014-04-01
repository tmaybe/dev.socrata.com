link_dir := $(shell mktemp -d /tmp/linkdoc.XXXX)

all:
	sass sass/local.sass:css/local.css common/sass/common.sass:common/css/common.css
	-rm search.json
	jekyll build
	cp public/search.json search.json
	-terminal-notifier -title "Jekyll" -message "Build complete."

test: all
	linklint -doc ${link_dir} -root public /@
	open ${link_dir}/index.html

# Builds sass locally directly to ./public so you con't have to run a full jekyll build when hacking sass
sasslocal:
	sass --watch sass/local.sass:css/local.css common/sass/common.sass:common/css/common.css

# Copies JS resources locally so you don't have to do a full jekyll build when hacking JS
jslocal:
	cp js/* public/js/
	cp common/js/* public/common/js/

# Pushes updated taglines file
taglines:
	curl --user chris.metcalf@socrata.com -X PUT --data @taglines.json --header "Content-type: application/json" --header "X-App-Token: bjp8KrRvAPtuf809u1UXnI0Z8" https://soda.demo.socrata.com/resource/etih-7ix2.json

