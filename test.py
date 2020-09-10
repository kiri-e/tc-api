import requests, json

stats = {"job_id":14,"craftsmanship":2721,"control":2927+42,"cp":641,"specialist":1,"level":80}
r = requests.post('http://127.0.0.1:3000/start', data = json.dumps(stats))

tag, sim = r.text.split("\n")
print(tag)
j = json.loads(sim)
pp = json.dumps(j, sort_keys = True, indent=4)
print(pp)
print("")

print("step 1 --------------------------------------------")

jdata = {"tag":tag,"action":"hasty"}
r = requests.post('http://127.0.0.1:3000/step', data = json.dumps(jdata))
j = json.loads(r.text)
pp = json.dumps(j, sort_keys = True, indent=4)
print(pp)
print("")

print("step 2 --------------------------------------------")
jdata = {"tag":tag,"action":"hasty"}
r = requests.post('http://127.0.0.1:3000/step', data = json.dumps(jdata))
j = json.loads(r.text)
pp = json.dumps(j, sort_keys = True, indent=4)
print(pp)
print("")

jdata = {"tag":tag}
r = requests.post('http://127.0.0.1:3000/done', data = json.dumps(jdata))
print(r.text)
print("")

jdata = {"tag":tag}
r = requests.post('http://127.0.0.1:3000/done', data = json.dumps(jdata))
print(r.text)
print("")

jdata = {"tag":tag}
r = requests.post('http://127.0.0.1:3000/done', data = json.dumps(jdata))
print(r.text)
print("")