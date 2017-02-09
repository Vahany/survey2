import sys
import json
import os

logfile = open("log.txt","w")
logfile.write("meow")
file = open("data/users.json", "r")
logfile.write(str(231))
usersjson = json.load(file)
file.close()
thecount = usersjson['usercount']
logfile.write(str(thecount))

theerror = 0
directory = "users/"+str(thecount+1)
if not os.path.exists(directory):
    os.makedirs(directory)
else:
    theerror = 1

if (theerror == 0):
    usersjson['usercount'] = usersjson['usercount'] + 1
    file = open("data/users.json", "w")
    file.write(json.dumps(usersjson))
    jsonresponse = {'user':(thecount+1)}
else:
    jsonresponse = {'user':0}

sys.stdout.write("Content-Type: application/json")
sys.stdout.write("\n\n")
sys.stdout.write(json.dumps(jsonresponse))

