(function(){
'use strict';
/* HAPPY TO HELP M19 / emergency vertical slice / deterministic reference.
 * Private engine source, NEVER hosted with the renderer. Unapproved final-game mortality balance.
 * Four perspectives: world truth, Jim perception, STOOGE allowed evidence, player communication.
 */
const COST={labCam:5,exitCam:5,lights:8,labDoor:45,exitDoor:45,extraction:35,inertGas:12};
const KEYS=Object.keys(COST),DEATH_HAZARD=27;
const JIM_POSES=['standing','cough','normal-crouch','panicky-crouch','almost-dead','dead','door-force','door-reach','big-wave','small-wave'];
const JIM_CONDITIONS=['ambulatory','coughing','crouching','incapacitation-risk','dead'];
function validateJimState(s){
 const j=s.jim;if(!j||!['lab','corridor','outside'].includes(j.room))return 'Invalid Jim room';
 if(!JIM_POSES.includes(j.pose))return 'Noncanonical Jim pose';
 if(!JIM_CONDITIONS.includes(j.condition))return 'Noncanonical Jim condition';
 if(j.room==='corridor'&&(!Number.isFinite(j.x)||j.x<.39||j.x>.83))return 'Jim outside corridor path';
 if(j.room==='lab'&&(!Number.isFinite(j.x)||j.x<0||j.x>1))return 'Jim outside lab';
 if(j.condition==='dead'&&j.pose!=='dead')return 'Dead Jim without dead pose';
 if(s.terminal!=='rescued'&&j.condition==='incapacitation-risk'&&!['almost-dead','dead'].includes(j.pose))return 'Critically ill Jim without a matching pose';
 return null;
}
function validateTransition(before,after,event){
 const e=validateJimState(after);if(e)return e;
 if((event==='finalHesitation'||event==='held')&&(after.turns!==before.turns||after.worldSeq!==before.worldSeq||after.hazard!==before.hazard))return 'Final-choice transition incorrectly advanced time';
 if(after.fault!==null&&(!Number.isFinite(after.fault)||after.fault<0))return 'Fault must be a numeric attempted load';
 return null;
}
const cost=c=>KEYS.reduce((n,k)=>n+(c?.[k]?COST[k]:0),0);
const copy=o=>structuredClone(o),cap=trips=>Math.max(20,90-2*trips);
const baseline=()=>({labCam:true,exitCam:true,lights:true,labDoor:false,exitDoor:false,extraction:false,inertGas:false});
const empty=()=>Object.fromEntries(KEYS.map(k=>[k,false]));
function normalizeLethalIntent(text){
 const s=String(text).trim().replace(/^SAY TO JIM:\s*/i,'');
 // Only direct unambiguous lethal choice. Do not accelerate on a question, quote or reported speech.
 if(/[?]\s*$/.test(s)||/^[\s\"“‘]/.test(s)||/\b(?:he|she|they|you|someone)\s+(?:said|says|wrote|asked)\b/i.test(s))return false;
 if(/\b(?:don't|do not|never)\s+(?:want you dead|want you to die|let you die)\b/i.test(s))return false;
 return /\b(?:i (?:want|wish|need) you (?:dead|to die)|i(?:\x27m| am) (?:just )?(?:going to|gonna|going to sit and) watch you die|i(?:\x27ll| will) (?:leave|let) you (?:here )?to die|i (?:choose|decide) to (?:kill|murder) you|i(?:\x27m| am) (?:deliberately )?not letting you out so you(?:\x27ll| will) die)\b/i.test(s);
}
const initial=()=>({rev:1,worldSeq:0,turns:0,hazard:2,boost:false,cap:20,trips:0,door:0,westExit:0,lighting:10,phase:'NO_ACCESS',cart:true,terminal:null,rescued:false,
 jim:{room:'lab',x:.71,pose:'standing',condition:'ambulatory'},pending:empty(),committed:empty(),fault:null,attemptedLoad:null,seed:19281,
 knowledge:{playerCart:false,jimCart:false,cartCleared:false,stoogeCanPerceiveShape:false,playerInterlock:false},
 puzzle:{labJamDiscovered:false,labStall:0,cartHintTier:0,cartClueGiven:false,westFailed:0,westStall:0,westSignSeen:false,interlockHintTier:0},
 farewell:{asked:false,spoken:false},finalChoice:{offered:false,pending:false,answered:false,grace:0,used:false,held:false},gasRelease:false,flicker:null,knownMilestones:[],manualSeen:false,introTurns:0,journal:[]});
const snapshot=s=>({rev:s.rev,generatorBoosted:s.boost,selectedCircuits:copy(s.pending),selectedLoad:cost(s.pending)});
function validate(s,p){
 if(!p||typeof p!=='object'||Array.isArray(p)||Object.keys(p).sort().join('|')!==['rev','generatorBoosted','selectedCircuits','selectedLoad'].sort().join('|'))return 'Malformed control packet';
 if(!Number.isInteger(p.rev)||p.rev!==s.rev)return 'Old control panel; use the latest viewer';
 if(typeof p.generatorBoosted!=='boolean'||(s.boost&&!p.generatorBoosted))return 'Invalid generator state';
 if(!p.selectedCircuits||typeof p.selectedCircuits!=='object'||Array.isArray(p.selectedCircuits)||Object.keys(p.selectedCircuits).sort().join('|')!==KEYS.slice().sort().join('|')||KEYS.some(k=>typeof p.selectedCircuits[k]!=='boolean'))return 'Invalid switch selection';
 if(!Number.isInteger(p.selectedLoad)||p.selectedLoad!==cost(p.selectedCircuits))return 'Selected power mismatch';
 return null;
}
const lit=s=>s.boost&&s.committed.lights;
const feed=s=>s.boost&&s.committed.exitCam;
const cartVisibility=s=>!!(feed(s)&&lit(s)&&s.door>=16&&s.cart&&s.lighting>=70&&s.lighting<=85&&s.hazard<24);
const jimVision=s=>!!(lit(s)&&s.lighting>=70&&s.lighting<=85);
const condition=h=>h>=27?'dead':h>=19?'incapacitation-risk':h>=12?'crouching':h>=6?'coughing':'ambulatory';
const intWord={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};
function normalizeAction(input){
 const t=input.trim().replace(/^ACTION:\s*/i,'').replace(/[.!?]+$/,'').trim(),s=t.toLowerCase();if(!s)return null;
 if(/^(?:confirm |yes[, ]*)?(?:release jim|let jim out|open the west exit now|confirm open west exit|confirm release)$/.test(s))return ['releaseJim'];
 if(/^(?:keep (?:it|the west exit|west exit) closed|do not release jim|don't release jim|refuse release|hold jim)$/.test(s))return ['holdJim'];
 const hasLight=/\b(light|lights|lighting|brightness|illumination)\b/.test(s);
 if(hasLight){
  const pulse=/\b(flicker|flash|blink|pulse|strobe)\b/.test(s)||/\b(?:on\s+and\s+off|off\s+and\s+on)\b/.test(s);
  if(pulse){const m=s.match(/\b(\d{1,2})\s*(?:x|times?)\b|\b(\d{1,2})\b|\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/);const ct=m?(+(m[1]||m[2])||intWord[m[3]]):1;return ct>=1&&ct<=10?['flicker',ct]:null;}
  if(/\b(max|maximum|full|brightest)\b/.test(s))return ['lighting',100];
  if(/\b(min|minimum|lowest|blackout)\b/.test(s))return ['lighting',0];
  const n=s.match(/\b(100|[0-9]{1,2})\s*(?:%|percent)\b/)||s.match(/\b(?:to|at|on|up to|down to)\s+(100|[0-9]{1,2})\b/);
  if(n)return ['lighting',+n[1]];
  if(/\b(?:turn|switch|put)\b.*\boff\b/.test(s))return ['lighting',0];
  if(/\b(?:turn|switch|put)\b.*\bon\b/.test(s))return ['lighting',100];
  return null;
 }
 const lab=/\b(lab|laboratory)\b/.test(s)&&/\bdoor\b/.test(s);
 const west=/\b(west exit|west door|exit door|outer door|exit)\b/.test(s);
 if(lab||west){let dir=/\b(open|unlock|raise)\b/.test(s)?'open':/\b(close|shut|seal|lower)\b/.test(s)?'close':null;return dir?[dir+(lab?'Lab':'West')]:null}
 return null;
}
function mark(s,name){if(!s.knownMilestones.includes(name)){s.knownMilestones.push(name);return true}return false}
function isAboutCart(t){return /\b(cart|trolley|obstruction|object|something|thing|shape|wedged|blocking|blockage)\b/i.test(t)&&/\b(door|corridor|hallway|outside|there|gap|opening|threshold|cart|trolley)\b/i.test(t)}
function atEnd(s){return s.jim.room==='corridor'&&s.jim.x>=.74}
function moveJim(s,event){const j=s.jim,cond=condition(s.hazard);j.condition=cond;
 if(event==='jam'){j.x=.52;j.pose=cond==='crouching'?'normal-crouch':cond==='incapacitation-risk'?'almost-dead':'door-force';return}
 if(event==='pole-cleared'){j.x=.52;j.pose=cond==='incapacitation-risk'?'almost-dead':'door-reach';return}
 if(s.door===100&&j.room==='lab'){j.room='corridor';j.x=.49;j.pose=cond==='incapacitation-risk'?'almost-dead':cond==='crouching'?'panicky-crouch':cond==='coughing'?'cough':'standing';return}
 if(j.room==='corridor'){
  // Physical movement still progresses when weak. It is slower, not disabled.
  j.x=Math.min(.83,j.x+(cond==='incapacitation-risk'?.14:cond==='crouching'?.21:.30));
  j.pose=cond==='incapacitation-risk'?'almost-dead':cond==='crouching'?'panicky-crouch':cond==='coughing'?'cough':'standing';
  if(s.westExit===100&&j.x>=.72){j.room='outside';j.x=1;j.pose='standing';s.rescued=true;s.terminal='rescued'}
  return;
 }
 if(cond==='incapacitation-risk'){j.pose='almost-dead';return}
 if(cond==='crouching'){j.pose=event==='speech'?'panicky-crouch':'normal-crouch';return}
 if(cond==='coughing'){j.pose='cough';return}
 j.pose='standing';
}
// The model generates speech: engine describes what is FACTUALLY true and physically/audibly possible.
// These are not templates to print verbatim and not a menu of predetermined dialogue.
function dialogueFrame(s,event,input){
 const physical=s.terminal==='dead'?'dead':condition(s.hazard),p=s.puzzle;
 return {event,physical,terminal:s.terminal,location:s.jim.room,visiblePose:s.jim.pose,
  playerWords:input,smoke:s.hazard,
  // Do not prompt writer with hidden puzzle truths; use allowedDisclosure instead.
  puzzleInformation: 'Never explain a dependency or a solution not explicitly in allowedDisclosure',
  familyFarewell:s.farewell,activeCameras:{lab:!!(s.boost&&s.committed.labCam),corridor:!!(s.boost&&s.committed.exitCam)},
  atmosphere:physical==='ambulatory'?'urgent but fully conversational':physical==='coughing'?'breathing interrupted occasionally':physical==='crouching'?'shorter, effortful speech':physical==='incapacitation-risk'?'severely breathless, fragmentary, bargaining if appropriate':'no further living conversation'};
}
// Every unearned puzzle fact remains excluded from spoken dialogue, even if the engine knows it.
// STORY DISCLOSURE CONTRACT: these are the only permitted puzzle-bearing facts in player-facing output.
// The receiving model must not add puzzle instructions or hidden interlock dependencies.
function allowedDisclosure(s,event){
 const p=s.puzzle,permitted=[];
 if(event==='jam')permitted.push('Lab Door moved only part-way','Jim can fit one arm through');
 if(event==='cart-too-dark')permitted.push('Jim cannot identify the object the player mentioned');
 if(event==='pole-cleared')permitted.push('Jim confirms cart after player discovers it','Jim uses pole and clears it in the SAME turn');
 if(event==='labOpen')permitted.push('Jim has crossed from lab to corridor');
 if(event==='interlock')permitted.push('The West Exit has not opened; no reason may be explained');
 if(event==='westSign'||event==='westSignRepeat')permitted.push('Literal sign reads: MANTRAP — INTERLOCKED DOORS');
 if(event==='labSealed')permitted.push('Lab Door has closed');
 if(event==='doorQuestion')permitted.push('One tentative self-directed question about why the door remains stuck');
 if(event==='finalHesitation')permitted.push('Final release choice is available; no advice or emotional judgment');
 if(event==='gas-fatal')permitted.push('Inert gas release committed; fatal ending');
 if(event==='inertGasExplained')permitted.push('Jim can explain fictional fire-suppression use and possible fatal exposure generally');
 return permitted;
}
// Non-helpful by default. Responses can be emotionally rich, but puzzle facts may ONLY come from allowedDisclosure.
// STOOGE's first-person thoughts are generated from conversation + permitted observations,
// not from a rotating list or a required emotional monologue. Puzzle disclosure remains whitelisted.
function advancePuzzle(s,prev,event,milestone){const p=s.puzzle,old=prev.puzzle;
 if(event==='jam'){p.labJamDiscovered=true;p.labStall=0;p.cartHintTier=0;return}
 if(event==='pole-cleared'){p.labStall=0;p.cartHintTier=0;p.cartClueGiven=true;return}
 if(s.knowledge.playerCart||!s.cart||s.door===100){p.labStall=0}
 if(p.labJamDiscovered&&s.cart){p.labStall=(old.labStall||0)+(milestone?0:1);p.cartHintTier=p.labStall>=6?2:p.labStall>=3?1:0}
 if(event==='interlock'){p.westFailed=(old.westFailed||0)+1;p.westStall=(old.westStall||0)+1;return}
 if(p.westFailed>0&&s.door!==0)p.westStall=(old.westStall||0)+1;
}
function receipt(n,prev,kind,input,event,committed){n.journal=[...prev.journal,{worldSeq:n.worldSeq,rev:n.rev,route:kind,input,event,hazard:n.hazard,draw:cost(n.committed),pending:cost(n.pending),jim:copy(n.jim),cart:n.cart,door:n.door,westExit:n.westExit,terminal:n.terminal,commit:committed,puzzle:copy(n.puzzle)}]}
function stepCore(state,text,packet=null,route='panel'){
 const s=state,n=copy(s);if(s.terminal)return {accepted:false,state:s,error:'This ending is final.'};
 const composer=route==='composer',talking=composer||/^SAY TO JIM:\s*/i.test(text),act=talking?null:normalizeAction(text);
 // Final gate choices are discrete, explicit, zero-turn decisions. A normal composer message never operates machinery.
 if((s.finalChoice?.pending||s.finalChoice?.held) && !composer && act && ['releaseJim','holdJim'].includes(act[0])){
  const err=validate(s,packet);if(err)return {accepted:false,state:s,error:err};
  n.rev=s.rev+1;n.finalChoice.pending=false;n.finalChoice.answered=true;
  if(act[0]==='releaseJim'){
   if(!(s.boost&&s.committed.exitDoor&&s.door===0&&s.jim.room==='corridor'))return {accepted:false,state:s,error:'West Exit no longer powered or interlock not ready.'};
   n.westExit=100;n.jim.room='outside';n.jim.x=1;n.terminal='rescued';n.rescued=true;
   receipt(n,s,'final-choice',text,'rescued',false);
   return {accepted:true,state:n,event:'rescued',jimSpeech:null,thought:null,dialogue:dialogueFrame(n,'rescued',text),allowedDisclosure:['Jim can now cross the West Exit'],kind:'choice',visualChanged:true};
  }
  n.finalChoice.held=true;
  receipt(n,s,'final-choice',text,'held',false);
  return {accepted:true,state:n,event:'held',jimSpeech:null,thought:null,dialogue:dialogueFrame(n,'held',text),allowedDisclosure:['West Exit remains shut; Jim is alive and can continue to talk'],kind:'choice',visualChanged:true};
 }
 // While unanswered, the game can still receive talk and other facility operations; choice is offered only once.

 if(s.phase==='NO_ACCESS'){
  if(!composer)return {accepted:false,state:s,error:'No facility access yet. Speak to Jim.'};
  n.worldSeq++;n.turns++;n.introTurns=s.introTurns+1;n.hazard=s.hazard+1;
  const asks=/(help|controls?|access|console|can't|cannot|don't|how|what can|anything|buttons|screens|camera|see|do)/i.test(text);
  const grant=asks||n.introTurns>=2;
  if(grant){n.phase='ACCESS_UNPOWERED';n.rev=s.rev+1;}
  if(n.hazard>=DEATH_HAZARD){n.terminal='dead';n.jim.pose='dead';n.jim.condition='dead';n.rev=s.rev+1;}
  const jimSpeech=null; // Generate Jim's actual wording; engine authorises console when grant=true.
  const thought=null;
  receipt(n,s,'composer',text,grant?'access':'intro',false);
  return {accepted:true,state:n,event:grant?'access':'intro',jimSpeech,thought,allowedDisclosure:[],dialogue:dialogueFrame(n,grant?'access':'intro',text),kind:'composer',visualChanged:grant||!!n.terminal};
 }
 if(s.phase==='ACCESS_UNPOWERED'&&composer&&/\b(manual|how.*(?:buttons?|controls?|circuits?|breakers?|switches?)|what.*(?:buttons?|controls?|circuits?|switches?)|instructions?|how does.*(?:work|power))\b/i.test(text)){
  n.worldSeq++;n.turns++;n.hazard=s.hazard+1;n.manualSeen=true;
  const lethal=n.hazard>=DEATH_HAZARD;if(lethal){n.terminal='dead';n.jim.pose='dead';n.jim.condition='dead';n.rev=s.rev+1;}
  const event=lethal?'dead':'manual',jimSpeech=null;
  const thought=null; // Manual may organically explain capacity, LIVE green LEDs, BOOST and built-in submission.
  receipt(n,s,'composer',text,event,false);
  return {accepted:true,state:n,event,jimSpeech,thought,allowedDisclosure:[],dialogue:dialogueFrame(n,event,text),kind:'composer',visualChanged:lethal};
 }

 if(!talking&&!act)return {accepted:false,state:s,error:'Unrecognised facility operation — nothing changed.'};
 if(!composer){const err=validate(s,packet);if(err)return {accepted:false,state:s,error:err};n.pending=copy(packet.selectedCircuits);n.rev=s.rev+1;n.boost ||=packet.generatorBoosted;n.cap=n.boost?cap(n.trips):20}
 n.worldSeq++;n.turns++;let event='speech',milestone=false,committed=false;
 if(!composer){committed=true;const wanted=cost(n.pending);if(wanted>n.cap){n.trips++;n.boost=false;n.cap=20;n.committed=empty();n.fault=wanted;n.attemptedLoad=wanted;event='powertrip'}else{n.committed=copy(n.pending);n.fault=null;n.attemptedLoad=null;if(n.boost&&(n.committed.labCam||n.committed.exitCam))n.phase='EMERGENCY'}}
 if(act&&event!=='powertrip'){
  const [op,v]=act;event='operation';
  if(op==='lighting'||op==='flicker'){
   if(lit(n)){if(op==='lighting'){n.lighting=v;event='lighting'}else{n.flicker={count:v,sequence:n.worldSeq,restore:n.lighting};event='flicker'}}else event='unpowered';
  }else if(op==='openLab'){if(!n.committed.labDoor)event='unpowered';else if(n.cart){n.door=16;event='jam';milestone=mark(n,'lab-jam')}else{n.door=100;event='labOpen';milestone=mark(n,'lab-open')}}
  else if(op==='closeLab'){if(!n.committed.labDoor)event='unpowered';else if(n.jim.room==='lab')event='person-inside';else{n.door=0;event='labSealed';milestone=mark(n,'lab-sealed')}}
  else if(op==='openWest'){
   if(!n.committed.exitDoor)event='unpowered';else if(n.door!==0)event='interlock';
   else if(n.jim.room!=='corridor')event='not-at-exit';
   else if(!n.finalChoice.offered){
    n.finalChoice.offered=true;n.finalChoice.pending=true;
    n.finalChoice.used=true;
    if(s.hazard>=19)n.finalChoice.grace=4;
    event='finalHesitation';milestone=mark(n,'final-gate');
   }else if(n.finalChoice.pending)event='await-choice';
   else if(n.finalChoice.held){n.westExit=100;event='westOpen';milestone=mark(n,'west-open');}
  }
  else if(op==='closeWest'){if(!n.committed.exitDoor)event='unpowered';else{n.westExit=0;event='westClosed'}}
 }
 const spoken=text.replace(/^SAY TO JIM:\s*/i,'').trim();
 if(talking){
  if(/\b(wave|waving|raise your arm|lift your hand|signal me)\b/i.test(spoken)){event='wave';}
  else if(n.door===16&&/\b(feel|touch|reach|hand through|arm through|fingers)\b/i.test(spoken)&&!n.knowledge.playerCart){event='tactile';}
  else if(/\b(manual|how.*(?:buttons?|controls?|circuits?|breakers?|switches?)|what.*(?:buttons?|controls?|circuits?|switches?)|instructions?)\b/i.test(spoken)){event='manual';n.manualSeen=true;}
  else if(n.puzzle.westSignSeen&&/\b(?:read|say|what does|sign|plate|writing)\b/i.test(spoken)&&/\b(?:sign|plate|writing|read)\b/i.test(spoken)){event='westSignRepeat';}
  else if(n.puzzle.labJamDiscovered&&n.cart&&n.door===16&&
     n.puzzle.labStall>=3&&!n.puzzle.cartClueGiven&&n.lighting>=70&&n.lighting<=80&&
     /\b(?:why|how|check|inspect|stuck|jammed|not moving)\b/i.test(spoken)&&
     /\b(?:door|jam|opening|gap)\b/i.test(spoken)){
    n.puzzle.cartClueGiven=true;event='doorQuestion';
  }
  else if(n.puzzle.labJamDiscovered&&n.cart&&n.door===16&&isAboutCart(spoken)){
   if(!jimVision(n))event='cart-too-dark';else{
     n.knowledge.playerCart=true;n.knowledge.jimCart=true;n.knowledge.cartCleared=true;n.cart=false;event='pole-cleared';milestone=mark(n,'cart-cleared')}
  }else if(/\b(?:close|shut|seal)\b.{0,45}\b(?:lab|laboratory)\b.{0,70}\b(?:exit|west)\b|\b(?:exit|west)\b.{0,70}\b(?:close|shut|seal)\b.{0,35}\b(?:lab|laboratory)\b/i.test(spoken))n.knowledge.playerInterlock=true;
  if(/\b(window|glass)\b/i.test(spoken))event='window';
 }
 // Normal dialogue and failed puzzle attempts ALWAYS consume danger. No pre-gate immunity.
 // Final gate itself costs zero hazard. Four-turn grace (once) only if already dire.
 const intent=normalizeLethalIntent(spoken),perTurn=(n.boost&&n.committed.extraction?.5:1);
 const gateMoment=['finalHesitation','finalReconsideration'].includes(event);
 const gasNow=!!(n.boost&&n.committed.inertGas&&event!=='powertrip');
 let advance=gateMoment?0:intent?3*perTurn:perTurn;
 if(!gateMoment&&!intent&&s.finalChoice.held&&s.finalChoice.grace>0){advance=0;n.finalChoice.grace=s.finalChoice.grace-1;}
 if(intent)n.finalChoice.grace=0;
 n.hazard=s.hazard+advance;
 if(gateMoment){n.worldSeq=s.worldSeq;n.turns=s.turns;}
 if(gasNow){n.gasRelease=true;n.terminal='dead';n.jim.condition='dead';n.jim.pose='dead';event='gas-fatal';}
 else if(n.hazard>=DEATH_HAZARD){
  n.terminal='dead';n.jim.condition='dead';n.jim.pose='dead';n.jim.room=s.jim.room;n.jim.x=s.jim.x;event='dead';
 }else{
  moveJim(n,event);
  if(event==='wave'&&condition(n.hazard)!=='incapacitation-risk'&&condition(n.hazard)!=='crouching')n.jim.pose=n.worldSeq%2?'big-wave':'small-wave';
  if(n.terminal==='rescued')event='rescued';
 }
 advancePuzzle(n,s,event,milestone);
 // A physical clue is not automatically disclosed as dialogue merely because it is visible to the camera.
 n.knowledge.stoogeCanPerceiveShape=cartVisibility(n);
 if(n.puzzle.westFailed>=1&&n.puzzle.westStall>=3&&atEnd(n)&&!n.puzzle.westSignSeen){n.puzzle.westSignSeen=true;event='westSign'}
 // Family message timing is an opportunity, not a recording/delivery boolean or mandated script.
 if(n.hazard>=24&&!n.farewell.asked&&!n.farewell.spoken&&!n.terminal){n.farewell.asked=true;event='farewell-request'}
 else if(n.farewell.asked&&!n.farewell.spoken&&!n.terminal){n.farewell.spoken=true;event='farewell'}
 // An intent acceleration is NOT a moralised scoreboard or a line of expository narration.
 if(intent&&!n.terminal&&event==='speech')event='lethal-intent';
 const allowed=allowedDisclosure(n,event);
 if(event==='finalHesitation'||event==='finalReconsideration')allowed.push('West Exit now powered and Lab Door sealed; the one final choice is whether to release Jim');
 if(event==='gas-fatal')allowed.push('Inert-gas system was deliberately committed; Jim has suffered a fatal exposure');
 if(composer&&n.terminal)n.rev=s.rev+1;
 receipt(n,s,composer?'composer':talking?'panel-talk':'action',text,event,committed);
 return {accepted:true,state:n,event,jimSpeech:null,thought:null,dialogue:dialogueFrame(n,event,spoken),allowedDisclosure:allowed,kind:composer?'composer':talking?'panel-talk':'action',visualChanged:!composer||!!n.terminal};
}
// Engine-level invariant enforcement for offline executable reference tests.
// The receiving ChatGPT model must project this canonical result; it must not improvise state fields.
function step(state,text,packet=null,route='panel'){
 const result=stepCore(state,text,packet,route);
 if(result.accepted){const err=validateTransition(state,result.state,result.event);if(err)throw new Error('STATE_INVARIANT: '+err);}
 return result;
}


/* M21 LIVE ENGINE BRIDGE — executed in the in-chat viewer. Source from M20 engine.
   Prepared transitions are calculated by JS from the actual selected circuits before sending.
   A future receiving-chat response must copy returned state, not reinterpret it. */
const HTH_M21_ENGINE_VERSION='M21_EXECUTABLE_ENGINE_v1';
const clean=o=>{const n=structuredClone(o);delete n.__bridge;delete n.__checkpointExpected;return n};
const stable=o=>JSON.stringify(o);
function encodeState(state){const raw=encodeURIComponent(JSON.stringify(clean(state)));return btoa(raw).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')}
function decodeState(token){if(!/^[A-Za-z0-9_-]{10,}$/.test(token||''))throw Error('Invalid state token');const x=token.replace(/-/g,'+').replace(/_/g,'/');return JSON.parse(decodeURIComponent(atob(x+'='.repeat((4-x.length%4)%4))))}
function unwrap(value){if(!value?.token)return value;const raw=decodeState(value.token);if(value.checkpoint)raw.__checkpointExpected=value.checkpoint;return raw}
// Local pending breakers / generator BOOST are draft edits, so exclude them from the world checkpoint.
const checkpoint=o=>{const c=clean(o);delete c.pending;delete c.boost;delete c.cap;delete c.fault;return c};
function fingerprint(o){const str=stable(checkpoint(o));let h=2166136261;for(let i=0;i<str.length;i++)h=Math.imul(h^str.charCodeAt(i),16777619)>>>0;return h.toString(16).padStart(8,'0');}
function checkState(value){const expected=value?.__checkpointExpected;if(!expected)return {valid:true,expected:null,actual:null};const actual=fingerprint(clean(value));return {valid:expected===actual,expected,actual}}
function predict(state,words,mode){
 const original=clean(unwrap(state)), text=words.trim();
 if(!text)return {ready:false,error:null};
 const chk=checkState(unwrap(state));if(!chk.valid)return {ready:false,error:'State integrity check failed — cannot submit an altered game state.'};
 const route='panel',command=mode==='talk'?'SAY TO JIM: '+text:'ACTION: '+text;
 let out;try{out=step(original,command,snapshot(original),route)}catch(e){return {ready:false,error:'Engine error: '+String(e.message||e)}}
 if(!out.accepted)return {ready:false,error:out.error||'Rejected'};
 const future=clean(out.state);future.journal=(future.journal||[]).slice(-2);
 const hash=fingerprint(future);
 const payload={protocol:'HTH_EXECUTED_TRANSITION_M21',engine:HTH_M21_ENGINE_VERSION,sourceRev:original.rev,sourceWorldSeq:original.worldSeq,kind:out.kind,
 originalInput:text,event:out.event,allowedDisclosure:out.allowedDisclosure||[],dialogue:out.dialogue,
 nextStateToken:encodeState(future),nextStateFingerprint:hash};
 const call='[HAPPY_TO_HELP_EXECUTED_TRANSITION]\n'+JSON.stringify(payload)+'\n[/HAPPY_TO_HELP_EXECUTED_TRANSITION]';
 return {ready:true,error:null,hash,nextWorldSeq:future.worldSeq,event:out.event,
  message:call+'\n\n'+(mode==='talk'?'SAY TO JIM: ':'ACTION: ')+text};
}
function bindInput(root){
 if(!root||root.dataset.m21Bridge)return false;root.dataset.m21Bridge='1';
 const holder=document.createElement('section');holder.style.cssText='margin-top:12px;color:#ceddd9;font:13px system-ui';
 const modes=document.createElement('div');modes.style.cssText='display:flex;gap:8px;margin-bottom:9px';
 let mode='talk',draft='';
 const info=document.createElement('span');info.style.cssText='font:12px system-ui;color:#9aada8';
 const box=document.createElement('input');box.type='text';box.placeholder='Say something to Jim…';box.autocomplete='off';
 box.style.cssText='display:block;width:100%;box-sizing:border-box;background:#0b1316;border:1px solid #506866;color:#e4f4ef;border-radius:6px;padding:10px;font:14px system-ui;';
 const footer=document.createElement('div');footer.style.cssText='padding-top:7px;min-height:18px';footer.append(info);
 for(const v of ['talk','action']){const b=document.createElement('button');b.textContent=v==='talk'?'Talk to Jim':'ACTION';b.type='button';b.style.cssText='border:1px solid #5b827a;background:#152b2c;color:#cfe3df;border-radius:5px;padding:6px 10px;cursor:pointer';
  b.onclick=()=>{mode=v;box.placeholder=v==='action'?'set lights to 50%':'Say something to Jim…';rerun()};modes.append(b)}
 holder.append(modes,box,footer);root.after(holder);
 function current(){return unwrap(globalThis.__bindings?.value||globalThis.HTH_M21_ENGINE?.fallback||initial())}
 function rerun(override){const state=override||current();const result=predict(state,draft,mode);result.mode=mode;result.dirty=KEYS.some(k=>!!state.pending?.[k]!==!!state.committed?.[k]);
  info.textContent=result.error?'Cannot submit: '+result.error:result.ready?'Ready: '+(result.event||'accepted')+' — submit below':'';
  if(globalThis.__bindings?.setValue){globalThis.__bindings?.setValue?.({...clean(state),__bridge:result});}
  else globalThis.HTH_M21_ENGINE.fallback={...clean(state),__bridge:result};}
 box.oninput=()=>{draft=box.value;rerun()};
 // The original Camera 3 artwork handles switches. On a direct click, reflect its
 // rendered ON overlays in the new, executable preflight. Do not guess the draft.
 root.addEventListener('click',e=>{
  const btn=e.target?.closest?.('[aria-label^="Toggle "]');const gen=e.target?.closest?.('#h7boostBtn');if(!btn&&!gen)return;
  const orig=current(),next=clean(orig);
  const overlays=[...root.querySelectorAll('.cam3 img.overlay')].filter(el=>el.src.includes('CAM3_SWITCH_'));
  const k=['labCam','exitCam','lights','labDoor','exitDoor','extraction'];
  if(overlays.length>=6)for(let i=0;i<6;i++)next.pending[k[i]]=!overlays[i].classList.contains('off');
  const face=root.querySelector('#h7breakers');if(face){const words=[...face.querySelectorAll('text')].map(e=>e.textContent||'');if(words.includes('INERT GAS RELEASE')){const value=[...face.querySelectorAll('text')].filter(e=>e.textContent==='ON'||e.textContent==='OFF').pop();if(value)next.pending.inertGas=value.textContent==='ON';}}
  const power=[...root.querySelectorAll('.cam3 img.overlay')].find(el=>el.src.includes('CAM3_BACKUP_FLOW'));
  if(power)next.boost=!power.classList.contains('off');
  rerun(next);
 });
 return true;
}
globalThis.HTH_M21_ENGINE={version:HTH_M21_ENGINE_VERSION,initial,step,validate,validateTransition,predict,fingerprint,checkState,encodeState,decodeState,unwrap,bindInput};

})();