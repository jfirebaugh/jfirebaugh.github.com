require 'csv'

weather = CSV.read('weather.csv')
headers = weather.shift

CSV.open('weather-new.csv', 'w') do |csv|
  csv << ['date', 'tmin', 'tmax']
  
  weather.each do |row|
    date = DateTime.strptime(row[1], '%Y%m%d')
    if (3..5) === date.month
      csv << [date.strftime('%Y-%m-%d'), Float(row[10]) / 10, Float(row[9]) / 10]
    end
  end
end
