link_dir := $(shell mktemp -d /tmp/linkdoc.XXXX)

all:
	sass sass/local.sass:css/local.css common/sass/common.sass:common/css/common.css
	jekyll build
	cp public/search.json search.json
	terminal-notifier -title "Jekyll" -message "Build complete."

test: all
	linklint -doc ${link_dir} -root public /@
	open ${link_dir}/index.html
