#!/usr/bin/env ruby

require 'soda'

client = SODA::Client.new(:domain => "data.cityofchicago.org", :app_token => "CGxaHQoQlgQSev4zyUh5aR5J3")
response = client.get("crimes", { "$select" => "primary_type, count(id)",
                                  "$where" => "within_circle(location, 41.88, -87.63, 50)",
                                  "$group" => "primary_type" })

response.each { |bucket| 
  puts "#{bucket.primary_type}: #{bucket.count}"
}
