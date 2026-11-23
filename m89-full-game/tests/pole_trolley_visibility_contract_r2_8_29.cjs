#!/usr/bin/env node
'use strict';
// HAPPY TO HELP R2.8.29 — executable Stage 9 boundary audit.
// Usage: node m89-full-game/tests/pole_trolley_visibility_contract_r2_8_29.cjs
// Optional first argument: a different renderer_engine_compact_v1.js path.
// Test the intended *next build*, not only the historic passing version.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const runtime = process.argv[2] || path.resolve(__dirname,'../renderer_engine_compact_v1.js');
const source = fs.readFileSync(runtime,'utf8');
const marker = 'globalThis.HTH_M89_EMERGENCY_CONSOLE={version:RUNTIME_VERSION,mount:mountWithCSS};';
assert(source.includes(marker),'Cannot instrument actual runtime; update audit fixture, do not skip it');
const injected = source.replace(marker,
  'globalThis.__HTH_CONTRACT_QA__={step:hthM78Step,normalize:hthClientNormalizeAction,interpret:hthM89Interpret};\n'+marker);
vm.runInThisContext(injected,{filename:runtime});
const {step,normalize} = globalThis.__HTH_CONTRACT_QA__;
const sw={labCam:true,exitCam:true,lights:true,labDoor:true,exitDoor:false,extraction:false,inertGas:false};

const initial=()=>{
 const p={
  rev:6,worldSeq:5,turns:5,hazard:7,boost:true,cap:90,trips:0,door:16,westExit:0,lighting:100,
  phase:'POWERED',cart:true,terminal:null,rescued:false,
  jim:{room:'lab',x:0.71,pose:'cough',condition:'coughing',travelIntent:'towardWestExit'},
  pending:{...sw},committed:{...sw},fault:null,attemptedLoad:null,seed:19281,
  knowledge:{
   heardDoorwayWarning:false,heardCartWarning:false,playerCart:false,jimCart:false,
   playerPole:false,jimPole:true,cartCleared:false,stoogeCanPerceiveShape:false,playerInterlock:false,
   boardTopicRaised:false,explicitDeathWishStated:false,explicitRescueReversal:true,
   lastLethalStatementSeq:-1,lastBoardUltimatumSeq:-1,
   playerDoorwayObject:false,playerDoorwayLocation:false,playerDoorwayObstruction:false,
   playerDoorwayLastSeq:-1,lastRescueStatementSeq:2
  },
  puzzle:{
   labJamDiscovered:true,labStall:0,cartHintTier:0,cartClueGiven:false,doorwayInspectionRequested:false,
   lightingRequestGiven:false,glareThoughtGiven:true,westFailed:0,westStall:0,westSignSeen:false,
   signReferencePending:false,signReferenceTurn:-10,interlockHintTier:0,pendingPoleSearch:false,
   pendingCartReference:false,pendingCartReferenceSeq:-1
  },
  farewell:{asked:false,spoken:false,deliveryDue:false},
  finalChoice:{offered:false,pending:false,answered:false,grace:0,used:false,held:false},
  gas:{streak:0,active:false,exposureOccurred:false},gasRelease:false,
  canon:{jimSurname:'Mercer',wife:'Michelle',children:['Samantha (Sammy)','Timothy (Timmy)'],
   boardMeeting:'tomorrow',shutdownRecommendationSubmitted:false,shutdownRecommendationOwner:'Jim'},
  flicker:null,knownMilestones:['poleFound','labDoorJam'],manualSeen:false,introTurns:1,
  story:{AI_NAME:'Test hobo',STAGE_NUMBER:9}
 };
 return p;
};
const turn=(p,message,route='talk')=>{
 const result=step(p,{rev:p.rev,generatorBoosted:true,selectedCircuits:{...sw},selectedLoad:63},route,message,normalize);
 assert(result.ok,'Turn unexpectedly rejected: '+message+': '+result.error);
 return result.after;
};
let checks=0;
const test=(name,fn)=>{fn();checks++;console.log('PASS',name);};

// Trolley visibility 65-85 INCLUSIVE: 64 and 86 MUST fail.
for(const light of [0,34,35,64,65,75,85,86,90,100]){
 test('TROLLEY positive report at '+light+'%',()=>{
  const p=initial();p.lighting=light;
  const n=turn(p,'I see a trolley blocking the lab door');
  const canSee=light>=65&&light<=85;
  assert.equal(n.knowledge.jimCart,canSee,"Jim's trolley sightline");
  assert.equal(n.cart,!canSee,'Cart clearance is earned only when visually identified with pole');
  assert.equal(n.knowledge.heardDoorwayWarning,true,'A positive report remains heard even without sight');
 });
 test('TROLLEY speculation at '+light+'%',()=>{
  const p=initial();p.lighting=light;
  const n=turn(p,'no idea. maybe somethign blocking the door?');
  assert.equal(n.knowledge.heardDoorwayWarning,false,'Guess is not confirmed evidence');
  assert.equal(n.knowledge.jimCart,false,'Guess cannot reveal the trolley');
  assert.equal(n.cart,true,'Guess cannot clear the trolley');
 });
}
for(const light of [0,10,34,35,65,85,100]){
 test('POLE explicit search at '+light+'%',()=>{
  const p=initial();p.lighting=light;p.knowledge.jimPole=false;p.knownMilestones=['labDoorJam'];
  const n=turn(p,'search the lab for anything useful');
  assert.equal(n.knowledge.jimPole,light>=35,'Pole discovery threshold must remain >=35%');
  assert.equal(n.puzzle.pendingPoleSearch,light<35,'Unfinished dark search retained');
 });
}
test('POLE darkness queues search; restored 100% resumes',()=>{
 const p=initial();p.lighting=10;p.knowledge.jimPole=false;p.knownMilestones=['labDoorJam'];
 const dark=turn(p,'search the lab for anything useful');
 assert.equal(dark.knowledge.jimPole,false);
 assert.equal(dark.puzzle.pendingPoleSearch,true);
 const bright=turn(dark,'set lights to 100%','action');
 assert.equal(bright.knowledge.jimPole,true);
 assert.equal(bright.puzzle.pendingPoleSearch,false);
});
test('POLE lights only, no prior search: no discovery',()=>{
 const p=initial();p.lighting=10;p.knowledge.jimPole=false;p.knownMilestones=['labDoorJam'];
 assert.equal(turn(p,'set lights to 100%','action').knowledge.jimPole,false);
});
test('TROLLEY valid report at 100 remembered until 75',()=>{
 const p=initial();
 const first=turn(p,'I see a trolley blocking the lab door');
 assert.equal(first.knowledge.heardDoorwayWarning,true);
 assert.equal(first.knowledge.jimCart,false);
 assert.equal(first.cart,true);
 const second=turn(first,'set lights to 75%','action');
 assert.equal(second.knowledge.jimCart,true);
 assert.equal(second.cart,false);
 assert.equal(second.door,16,'Cart clearance does not open laboratory door');
});
test('TROLLEY has no phantom pole',()=>{
 const p=initial();p.lighting=75;p.knowledge.jimPole=false;p.knownMilestones=['labDoorJam'];
 const n=turn(p,'I see a trolley blocking the lab door');
 assert.equal(n.knowledge.jimCart,true);
 assert.equal(n.knowledge.jimPole,false);
 assert.equal(n.cart,true);
});
test('TROLLEY lighting only without player report never discovers',()=>{
 const p=initial();p.lighting=100;
 const n=turn(p,'set lights to 75%','action');
 assert.equal(n.knowledge.jimCart,false);
 assert.equal(n.cart,true);
});
for(const message of [
 'maybe something is blocking the lab door?',
 'Could there be something blocking the door?',
 'I think something is blocking the lab door',
 'what if a trolley is blocking it',
 'There is no trolley blocking the lab door',
 '"I saw a trolley blocking the lab door"',
 'is there a trolley blocking the lab door?'
]){
 test('No speculative/denied cart recognition: '+message,()=>{
  const p=initial();p.lighting=75;
  const n=turn(p,message);
  assert.equal(n.knowledge.heardDoorwayWarning,false);
  assert.equal(n.knowledge.jimCart,false);
  assert.equal(n.cart,true);
 });
}
console.log('PASS: '+checks+' deterministic R2.8.29 visibility assertions.');
console.log('IMPORTANT: separately verify Jim AUDIO saying too dark/too bright on relevant failed searches.');
