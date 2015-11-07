#encoding: utf8
import json
import sys

# 1020098   Benoni  Benoni  Benoni,Бенони,Беноні    -26.18848   28.32078    P   PPL ZA      06  EKU EKU     605344      1641    Africa/Johannesburg 2012-07-12
def parse_line(line):
    data = line.split('\t')
    return [el for el in data if el != '']

def parse_cities(line):
    data = line.split(',')
    return [el for el in data if el != '']

def read_file(filename):
    with open(filename, 'r', 1000) as f:
        for line in iter(lambda: f.readline(), ''):
            yield line

if __name__ == '__main__':
    input_filename = 'cities15000.txt'
    json_filename = 'cities.json'
    if len(sys.argv) > 1: 
        print sys.argv[1]
        input_filename = sys.argv[1]

    if len(sys.argv) > 2:
        print sys.argv[2]
        json_filename = sys.argv[2]

    print input_filename
    print json_filename
    print __file__

    cities_data = []

    for i in read_file(input_filename):
        parsed_line = parse_line(i)
        city_obj = {
            'city': parse_cities(parsed_line[3]),
            'attitude': parsed_line[4],
            'latitude': parsed_line[5]
        }
        cities_data.append(city_obj)

    result = {
        'cities': cities_data
    }

    with open(json_filename, 'w+t') as f:
        f.write(json.dumps(result, sort_keys=True, indent=4, separators=(',', ': ')))
