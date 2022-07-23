const http = require('http');
const simulator = require('../simulator/dist/simulator.umd.js');
const hostname = '127.0.0.1';
const port = 3000;

//console.log(Object.keys(simulator));
reqObj = {"job_id":14,"craftsmanship":2721,"control":2927+42,"cp":641,"specialist":1,"level":80};
let stats = new simulator.CrafterStats(reqObj['job_id'], reqObj['craftsmanship'], reqObj['control'], reqObj['cp'], reqObj['specialist'], reqObj['level'], Array(8).fill(reqObj['level']));
console.log(stats);
let craft = {
              id: '36692',
              job: 14,
              rlvl: 590,
              durability: 70,
              quality: 12800,
              progress: 4300,
              lvl: 90,
              suggestedCraftsmanship: 3240,
              suggestedControl: 3130,
              hq: 1,
              quickSynth: 1,
              ingredients: [],
              expert: 0
            };
/*            
let sim = new simulator.Simulation(craft, [], stats);
console.log(sim);
console.log("idk");
sim.run(true);
console.log(sim);
sim.runAction(new simulator.MuscleMemory);
console.log(sim);
sim.runAction(new simulator.Observe);
console.log(sim);
sim.runAction(new simulator.Observe);
console.log(sim);sim.runAction(new simulator.Observe);
console.log(sim);sim.runAction(new simulator.Observe);
console.log(sim);sim.runAction(new simulator.Observe);
console.log(sim);sim.runAction(new simulator.Observe);
console.log(sim);
*/

/*
let sim = new simulator.Simulation(craft, [], stats);
//console.log(sim);
//sim.run(false);
//console.log(sim);
sim.actions = [];
sim.actions.push(new simulator.MuscleMemory);
sim.run(false)
console.log(sim);

sim.actions = [];
sim.actions.push(new simulator.Veneration);
sim.run(false)
console.log(sim);

sim.actions = [];
sim.actions.push(new simulator.HastyTouch);
sim.run(false)
console.log(sim);
*/
/*
sim.actions = [];
sim.actions.push(new simulator.HastyTouch);
sim.run(false)
console.log(sim);
*/
/*
sim.actions = [];
sim.actions.push(new simulator.RapidSynthesis);
sim.run(false)
console.log(sim);

sim.actions = [];
sim.actions.push(new simulator.RapidSynthesis);
sim.run(false)
console.log(sim);

sim.actions = [];
sim.actions.push(new simulator.MastersMend);
sim.run(false)
console.log(sim);

sim.actions = [];
sim.actions.push(new simulator.RapidSynthesis);
sim.run(false)
console.log(sim);

sim.actions = [];
sim.actions.push(new simulator.RapidSynthesis);
sim.run(false)
console.log(sim);
*/
let sims = {};
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url == '/start') {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
        }).on('end', () => {
        body = Buffer.concat(body).toString();
        
        try {
            let reqObj = JSON.parse(body);
            let stats = new simulator.CrafterStats(reqObj['job_id'], reqObj['craftsmanship'], reqObj['control'], reqObj['cp'], reqObj['specialist'], reqObj['level'], Array(8).fill(reqObj['level']));
               
            let sim = new simulator.Simulation(craft, [], stats);
            let tag = "" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            res.write(tag + "\n");
            sims[tag] = sim;
            res.write("" + JSON.stringify(sim));
            res.end("");
        } catch(e) {
            res.end("idk you fucked up /start\n" + e.stack + "\n" + e.toString() + "\n --- " + body);
        return;
        }

    });
    
    
  }  else if (req.url == '/step') {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
        }).on('end', () => {
        body = Buffer.concat(body).toString();
        
        try {
            let reqObj = JSON.parse(body);
            
            let sim = sims[reqObj['tag']];
            let req_action = reqObj['action'];
            sim.actions = [];
            let temp_action = simulator.CraftingActionsRegistry.ALL_ACTIONS.find(el => {
                    return el.name === req_action;
            });
            console.log(temp_action.action);
            sim.actions.push(temp_action.action);
            let sim_res = sim.run(false);
            sims[reqObj['tag']] = sim
            res.write(JSON.stringify(sim_res) + "\n");
            res.write(JSON.stringify(sim));
            res.end("");
        } catch(e) {
            res.end("idk you fucked up /step\n" + e.stack + "\n" + e.toString() + "\n --- " + body);
        return;
        }

    });
  
  } else if (req.url == '/done') {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
        }).on('end', () => {
        body = Buffer.concat(body).toString();
        
        try {
            let reqObj = JSON.parse(body);
            
            delete sims[reqObj['tag']];
            res.write("k done");
            res.end("");
        } catch(e) {
            res.end("idk you fucked up /done\n" + e.stack + "\n" + e.toString() + "\n --- " + body);
        return;
        }

    });
  } else {
      res.end("Unknown command")
  }
  console.log(Object.keys(sims));
  //res.end("");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
