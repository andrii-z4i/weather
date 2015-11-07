#encoding: utf8
import json
import sys

# 1020098   Benoni  Benoni  Benoni,Бенони,Беноні    -26.18848   28.32078    P   PPL ZA      06  EKU EKU     605344      1641    Africa/Johannesburg 2012-07-12
def parse_line(line):
    data = line.split('\t')
    print data

def read_file(filename):
    with open(filename, 'r', 1000) as f:
        for line in iter(lambda: f.readline(), ''):
            yield line

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

for i in read_file(input_filename):
    parse_line(i)