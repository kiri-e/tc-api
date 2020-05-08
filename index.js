const http = require('http');
const simulator = require('../simulator/dist/simulator.umd.js');
const hostname = '127.0.0.1';
const port = 3000;

//console.log(Object.keys(simulator));
reqObj = {"job_id":14,"craftsmanship":2487,"control":2609,"cp":623,"specialist":1,"level":80};
let stats = new simulator.CrafterStats(reqObj['job_id'], reqObj['craftsmanship'], reqObj['control'], reqObj['cp'], reqObj['specialist'], reqObj['level'], Array(8).fill(reqObj['level']));
console.log(stats);
let craft = {
              id: '3864',
              job: 14,
              rlvl: 481,
              durability: 60,
              quality: 64862,
              progress: 9181,
              lvl: 80,
              suggestedCraftsmanship: 2484,
              suggestedControl: 2206,
              hq: 1,
              quickSynth: 1,
              ingredients: [],
              expert: 1
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

sim.actions = [];
sim.actions.push(new simulator.HastyTouch);
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

/*
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
    
            let craft = {
              id: '3864',
              job: 14,
              rlvl: 481,
              durability: 60,
              quality: 64862,
              progress: 9181,
              lvl: 80,
              suggestedCraftsmanship: 2484,
              suggestedControl: 2206,
              hq: 1,
              quickSynth: 1,
              ingredients: [],
              expert: 1
            };
            let sim = simulation.Simulation(craft, [], stats);
            res.write(JSON.stringify(sim));
        } catch(e) {
            res.end("idk you fucked up " + e.toString() + " --- " + body);
        return;
        }

    });
    
    
  }  else if (req.url == '/step') {
  }  else {
      res.end("Unknown command")
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/