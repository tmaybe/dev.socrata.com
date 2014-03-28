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
