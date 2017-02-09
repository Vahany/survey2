import sys
import json
import os

logfile = open("log.txt","w")

input = json.load(sys.stdin)

userid = input['userid']
filename = input['filename']
answers = input['answers']
logfile.write(json.dumps(input))
if (filename.find('tute') != -1):
    if (filename == 'tute1'): 
        file = open('users//'+str(userid)+'//tutorial.json','w')
        file.write(json.dumps({'tute1':input['duration']}))
    else:
        file = open('users//'+str(userid)+'//tutorial.json','r')
        existing = json.load(file)
        if filename in existing:
            existing[filename] = existing[filename]+input['duration']
        else:
            existing[filename] = input['duration']
        file.close()
        file = open('users//'+str(userid)+'//tutorial.json','w')
        file.write(json.dumps(existing))
elif (filename.find('tconnectivity1') != -1):
    if (os.path.isfile('users//'+str(userid)+'//training.json')): 
        file = open('users//'+str(userid)+'//training.json','r')
        existing = json.load(file)
        if filename in existing:
            existing[filename].append({'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'graph':input['graph']})
        else:
            existing[filename] = [{'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'graph':input['graph']}]
        file.close()
        file = open('users//'+str(userid)+'//training.json','w')
        file.write(json.dumps(existing))
    else:
        file = open('users//'+str(userid)+'//training.json','w')
        file.write(json.dumps({filename:[{'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'graph':input['graph']}]}))
#has to be after tconnectivity
elif (filename.find('connectivity') != -1):
    if (os.path.isfile('users//'+str(userid)+'//connectivity.json')): 
        file = open('users//'+str(userid)+'//connectivity.json','r')
        existing = json.load(file)
        if filename in existing:
            existing[filename].append({'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'graph':input['graph']})
        else:
            existing[filename] = [{'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'graph':input['graph']}]
        file.close()
        file = open('users//'+str(userid)+'//connectivity.json','w')
        file.write(json.dumps(existing))
    else:
        file = open('users//'+str(userid)+'//connectivity.json','w')
        file.write(json.dumps({filename:[{'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'graph':input['graph']}]}))
elif (filename.find('tmatching') != -1):
    if (os.path.isfile('users//'+str(userid)+'//training.json')): 
        file = open('users//'+str(userid)+'//training.json','r')
        existing = json.load(file)
        if filename in existing:
            existing[filename].append({'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'refgraph':input['refgraph'],'graph1':input['graph1'],'graph2':input['graph2'],'graph3':input['graph3']})
        else:
            existing[filename] = [{'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'refgraph':input['refgraph'],'graph1':input['graph1'],'graph2':input['graph2'],'graph3':input['graph3']}]
        file.close()
        file = open('users//'+str(userid)+'//training.json','w')
        file.write(json.dumps(existing))
    else:
        file = open('users//'+str(userid)+'//training.json','w')
        file.write(json.dumps({'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'refgraph':input['refgraph'],'graph1':input['graph1'],'graph2':input['graph2'],'graph3':input['graph3']}))
else:
    logfile.write('not tutorial\n')
    file = open('users//'+str(userid)+'//'+filename+'.json','w')
    file.write(json.dumps({'answers':answers, 'duration':input['duration']}))

file.close()
logfile.close()

sys.stdout.write("Content-Type: application/json")

