require 'csv'
require 'active_support/json'

rates = CSV.read("debt.csv")
rates = rates.chunk {|e| e[0]}
rates = rates.map do |country, history|
  history = history.map {|f| {date: Time.parse(f[1]), rating: f[2]}}

  first = history[0]
  if first[:rating] == '-'
    first[:rating] = history[1][:rating]
  else
    history.unshift(date: Time.parse("28 Jul 2011"), rating: first[:rating])
  end

  { country: country, history: history.reverse }
end

puts ({ratings: ["AAA", "AA+", "AA", "AA-", "A+", "A", "A-",
         "BBB+", "BBB", "BBB-", "BB+", "BB", "BB-", "B+", "B", "B-",
         "CCC+", "CCC", "CCC-", "CC", "C",
         "DDD", "DD", "RD", "D"],
       data: rates}).to_json
