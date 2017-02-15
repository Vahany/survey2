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
    thefilename = 'users//'+str(userid)+'//tutorial.json'
    if (os.path.isfile(thefilename)): 
        file = open(thefilename,'r')
        existing = json.load(file)
        logfile.write(json.dumps(existing['slide'][0]))
        existing['slide'].append({'number':input['slidenum'], 'duration':input['duration']})
        file.close()
        file = open(thefilename,'w')
        file.write(json.dumps(existing))
    else:
        file = open(thefilename,'w')
        file.write(json.dumps({'slide':[{'number':input['slidenum'], 'duration':input['duration']}]}))
    '''
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
    '''
elif (filename.find('tconnectivity') != -1):
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
            existing[filename].append({'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'iscorrect':input['correct'],'graph':input['graph']})
        else:
            existing[filename] = [{'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'iscorrect':input['correct'],'graph':input['graph']}]
        file.close()
        file = open('users//'+str(userid)+'//connectivity.json','w')
        file.write(json.dumps(existing))
    else:
        file = open('users//'+str(userid)+'//connectivity.json','w')
        file.write(json.dumps({filename:[{'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'iscorrect':input['correct'],'graph':input['graph']}]}))
elif (filename.find('matching') != -1):
    if (filename.find('tmatching') != -1):
        jsonname = 'users//'+str(userid)+'//training.json'
    else:
        jsonname = 'users//'+str(userid)+'//matching.json'
    if (os.path.isfile(jsonname)): 
        file = open(jsonname,'r')
        existing = json.load(file)
        if filename in existing:
            existing[filename].append({'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'refgraph':input['refgraph'],'graph1':input['graph1'],'graph2':input['graph2'],'graph3':input['graph3'],'iscorrect':input['correct'],'correctanswer':input['correctanswer']})
        else:
            existing[filename] = [{'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'refgraph':input['refgraph'],'graph1':input['graph1'],'graph2':input['graph2'],'graph3':input['graph3'],'iscorrect':input['correct'],'correctanswer':input['correctanswer']}]
        file.close()
        file = open(jsonname,'w')
        file.write(json.dumps(existing))
    else:
        file = open(jsonname,'w')
        file.write(json.dumps({filename:[{'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'refgraph':input['refgraph'],'graph1':input['graph1'],'graph2':input['graph2'],'graph3':input['graph3'],'iscorrect':input['correct'],'correctanswer':input['correctanswer']}]}))
elif (filename.find('dense') != -1):
    if (filename.find('tdense') != -1):
        jsonname = 'users//'+str(userid)+'//training.json'
    else:
        jsonname = 'users//'+str(userid)+'//dense.json'
    if (os.path.isfile(jsonname)): 
        file = open(jsonname,'r')
        existing = json.load(file)
        if filename in existing:
            existing[filename].append({'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'graph1':input['graph1'],'graph2':input['graph2'],'iscorrect':input['correct'],'correctanswer':input['correctanswer']})
        else:
            existing[filename] = [{'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'graph1':input['graph1'],'graph2':input['graph2'],'iscorrect':input['correct'],'correctanswer':input['correctanswer']}]
        file.close()
        file = open(jsonname,'w')
        file.write(json.dumps(existing))
    else:
        file = open(jsonname,'w')
        file.write(json.dumps({filename:[{'duration':input['duration'], 'answer':answers,'visrep':input['visrep'],'question':input['question'],'graph1':input['graph1'],'graph2':input['graph2'],'iscorrect':input['correct'],'correctanswer':input['correctanswer']}]}))
elif (filename.find('background') != -1):
    logfile.write('background\n')
    file = open('users//'+str(userid)+'//'+filename+'.json','w')
    file.write(json.dumps({'answers':answers, 'duration':input['duration']}))
elif (filename.find('email') != -1):
    logfile.write('email\n')
    file = open('users//'+str(userid)+'//background.json','r')
    existing = json.load(file)
    existing[filename] = input['answers']
    file = open('users//'+str(userid)+'//background.json','w')
    file.write(json.dumps(existing))

file.close()
logfile.close()

sys.stdout.write("Content-Type: application/json")
sys.stdout.write("\n\n")
sys.stdout.write(json.dumps({"status":"done"}))

