require 'csv'

rates = CSV.read("rates.csv")[2..-1]

grouped = Hash.new {|h, k| h[k] = []}

rates.each do |r|
  grouped[r[1]] << r
end

puts "var rates = {"

grouped.each do |area, area_rates|
  puts %{  "#{area}": \{}
  area_rates.each do |x|
    puts %{    "#{x[0]}": [#{[2, 6, 10, 14, 18, 22].map {|p| x[p] }.join(", ") }],}
  end
  puts %{  \},}
end

puts "};"