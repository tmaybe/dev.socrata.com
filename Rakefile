require 'colorize'

# Variables and setup
SHA = `git rev-parse --short HEAD`.strip
DATE = `git show --pretty="format:%at" HEAD | head -n 1`.strip
STAMP = <<-STAMP
define STAMP
{
  "sha" : "#{SHA}",
  "href" : "https://github.com/socrata/dev.socrata.com/commit/#{SHA}",
  "date" : #{DATE}
}
STAMP
URL = "https://dev-socrata-com-#{ENV['TRAVIS_BUILD_NUMBER'] || SHA}.surge.sh"

desc "clean up after ourselves"
task :clean do
  puts "Cleaning up after ourselves...".green
  sh "rm -rf public"
end


desc "perform a full jekyll site build"
task :jekyll do
  puts "Performing a full build...".green
  sh 'bundle exec jekyll build'
end

desc "perform an incremental jekyll build"
task :incremental do
  puts "Performing an incremental build...".green
  sh 'bundle exec jekyll build --incremental --safe'
end

desc "create a build and version build.json file"
task :stamp do
  puts "Stamping build.json for #{SHA}...".green
  File.open("public/build.json", 'w') { |f| f.write(STAMP) }
end

desc "perform a quick build with a stamp"
task :quick => [:incremental, :stamp] do
end

desc "test links with htmlproof"
task :htmlproof do
  # sh 'bundle exec htmlproof ./public --only-4xx --check-html --href-ignore "/#/,/\/foundry/,/\/register/,/APP_TOKEN/"'
  sh "bundle exec htmlproof #{URL}/ --only-4xx --check-html"
end

desc "stage site to #{URL}"
task :stage do
  puts "Staging content to #{URL}...".green
  sh "surge --project ./public --domain #{URL}"
end

desc "run casperjs tests on #{URL}"
task :casperjs do
  puts "Running casperjs tests on #{URL}...".green
  sh "BASE=#{URL} casperjs --verbose --log-level=warning test _tests/*"
end

desc "clean up the ROUTER file, so we can push staging sites to Surge.sh"
task :rm_router do
  sh "rm public/ROUTER"
end

desc "perform a full test cycle to #{URL}"
task :staging_test => [:clean, :jekyll, :stamp, :rm_router, :stage, :casperjs] do
  puts "Done!!!".on_green
end
