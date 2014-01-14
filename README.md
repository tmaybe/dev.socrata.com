This is the [Github Pages](http://pages.github.com/) source code for the [Socrata Developer Portal](http://dev.socrata.com) (currently deployed to <http://beta.dev.socrata.com>.

## Contributing

We love pull requests! If you'd like to contribute, feel free to [fork this repo](https://github.com/socrata/dev.socrata.com/fork) and send us pull requests.

### Setting Up

The site is a fairly standard [Jekyll](http://jekyllrb.com/) site, but there are a few steps you'll want to make first to ensure that everything compiles properly:

1. Make sure you have the `gh-pages` branch checked out: `git checkout -b gh-pages origin/gh-pages`
2. Pull in the site templates and CSS/SASS, which come from submodules: `git submodule update --init`
3. Make sure you have the `jekyll` RubyGem installed
  * A `.rvmrc` [RVM](http://rvm.io/) configuration file is included if that's your thing
  * Install the `bundler gem` and then install the gems from the Gemfile: `gem install bundler && bundle`
4. Build the site and run the local server: `jekyll serve --watch`

You can now view your local server at <http://localhost:4000> (unless you changed the port number).

### Modifying CSS/SASS

Site styling is controlled via `sass/local.sass`, but since Github doesn't compile SASS files you'll need to compile it into `css/local.css` first: `sass sass/local.sass:sass/local.css`. Include the .css file in your commit and pull request.
