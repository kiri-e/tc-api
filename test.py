import requests, json


states = ["NORMAL", "GOOD", "EXCELLENT", "POOR", "CENTERED", "STURDY", "PLIANT", "FAILED"]
sim_fails = ["UNSAFE", "DURA_ZERO", "NO_CP", "MISSING_LEVEL", "MISSING_STATS", "NOT_SPEC", "NO_INNER_QUIET"]
actions = ['BasicSynthesis', 'CarefulSynthesis', 'RapidSynthesis', 'Groundwork', 'FocusedSynthesis', 'MuscleMemory', 'BrandOfTheElements', 'IntensiveSynthesis', 'BasicTouch', 'StandardTouch', 'HastyTouch', 'ByregotsBlessing', 'PreciseTouch', 'FocusedTouch', 'PatientTouch', 'PrudentTouch', 'TrainedEye', 'PreparatoryTouch', 'Reflect', 'TricksOfTheTrade', 'MastersMend', 'Manipulation', 'InnerQuiet', 'WasteNot', 'WasteNotII', 'GreatStrides', 'Innovation', 'Veneration', 'NameOfTheElements', 'FinalAppraisal', 'Observe', 'DelicateSynthesis', 'RemoveFinalAppraisal',]
buff_names = ["Inner Quiet", "Waste Not", "Waste Not II", "Manipulation", "Great Strides", "Innovation", "Veneration", "Maker's Mark", "Name of the Elements", "Muscle Memory", "Final Appraisal", "Nameless"]

#no careful observation

stats = {"job_id":14,"craftsmanship":2721,"control":2927+42,"cp":641,"specialist":1,"level":80}
r = requests.post('http://127.0.0.1:3000/start', data = json.dumps(stats))

tag, sim = r.text.split("\n")
print(tag)
j = json.loads(sim)
pp = json.dumps(j, sort_keys = True, indent=4)
print(pp)
print("")

def do_action(tag, action, full = False):
    

    jdata = {"tag":tag,"action":action}
    r = requests.post('http://127.0.0.1:3000/step', data = json.dumps(jdata))
    #print(r.text)
    simres, sim = r.text.split("\n")
    j = json.loads(simres)
    pp = json.dumps(j, sort_keys = True, indent=4)
    
    success = j["success"]
    failed = j["failCause"] if "failCause" in j else None
    j = json.loads(sim)
    count    = len(j["steps"])
    bad_action = True if j["steps"][-1]["success"] is None else False
    if full: 
        print(f"step {count} -------------------------------------------------------------------")
        print(pp)
        print("")
    
    
    pp = json.dumps(j, sort_keys = True, indent=4)
    if full:
        print(pp)
        print("")
        
    max_dura = j["recipe"]["durability"]
    max_qual = j["recipe"]["quality"]
    max_prog = j["recipe"]["progress"]

    cur_dura = j["durability"]
    cur_qual = j["quality"]
    cur_prog = j["progression"]
    
    state    = j["state"]
    steps    = len(j["steps"])
    buffs    = j["buffs"]
    
    state_string = states[state]
    
    print(f"""prog: {cur_prog} / {max_prog}, qual: {cur_qual} / {max_qual}, dura: {cur_dura} / {max_dura} step: {steps} {state_string} done: {success} fail: {failed} bad action: {bad_action}""")
    if len(buffs) != 0:
        for buff in buffs:
            print(buff_names[buff['buff']], repr(buff))
            
do_action(tag, "HastyTouch")
do_action(tag, "HastyTouch")
do_action(tag, "Reflect", full = True)

do_action(tag, "BasicTouch")
do_action(tag, "BasicTouch")
do_action(tag, "Veneration")
do_action(tag, "MastersMend")
do_action(tag, "BasicTouch")
do_action(tag, "BasicTouch")
do_action(tag, "BasicTouch")
do_action(tag, "BasicTouch")
do_action(tag, "BasicTouch")
do_action(tag, "BasicTouch", full = True)

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