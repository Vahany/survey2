import sys
import json
import os

input = json.load(sys.stdin)
file = open("data/users.json", "w")
file.write(json.dumps(input))
file.close()


