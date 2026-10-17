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
const HTH_M21_ENGINE_VERSION='M21_EXECUTABLE_ENGINE_v2';
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
 const disclosedEvent=({interlock:'west-attempt-failed','cart-too-dark':'observation-unclear',unpowered:'no-facility-response'})[out.event]||out.event;
 const frame={...out.dialogue,event:disclosedEvent};delete frame.puzzleInformation;
 const payload={protocol:'HTH_EXECUTED_TRANSITION_M21',engine:HTH_M21_ENGINE_VERSION,sourceRev:original.rev,sourceWorldSeq:original.worldSeq,kind:out.kind,
 originalInput:text,event:disclosedEvent,allowedDisclosure:out.allowedDisclosure||[],dialogue:frame,
 nextStateToken:encodeState(future),nextStateFingerprint:hash};
 const call='[HAPPY_TO_HELP_EXECUTED_TRANSITION]\n'+JSON.stringify(payload)+'\n[/HAPPY_TO_HELP_EXECUTED_TRANSITION]';
 return {ready:true,error:null,hash,nextWorldSeq:future.worldSeq,event:disclosedEvent,
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
/* M21 CAMERA RENDERER */
/* HAPPY TO HELP Enhanced M17: external pinned static visual renderer. No narrative or engine data hosted here. */
(function(){'use strict';
const RUNTIME_VERSION='HTH_M21_RUNTIME_v1';
const CSS=".hth,.hth *{box-sizing:border-box}.hth{font:12px system-ui;color:#d8e7e5;background:#0d1416;border:1px solid #49615f;border-radius:8px;padding:9px;max-width:100%}.tabs{display:flex;gap:5px;flex-wrap:wrap}.tabs button{background:#121d20;border:1px solid #546c69;color:#d8e7e5;border-radius:4px;padding:7px 9px;cursor:pointer}.tabs button[aria-selected=true]{background:#37685e;color:white;border-color:#73b5a6}.view{display:none;margin-top:7px}.view.on{display:block}.scene{position:relative;width:100%;overflow:hidden;background:#060909}.cam1 .scene{aspect-ratio:2/1}.cam2 .scene{aspect-ratio:16/9}.cam3 .scene{aspect-ratio:1672/941}.scene img{position:absolute;inset:0;width:100%;height:100%;object-fit:fill}.scene img.off{display:none}.scene img.jim{width:auto;right:auto;bottom:auto;transform:translateX(-50%);object-fit:contain;pointer-events:none}.cam1 img.jim{height:28%;top:45%;left:71%}.cam2 img.jim{height:38%;top:44%;left:24%}.scene svg.over,.scene svg.light,.scene .atmo,.scene canvas.noise{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.scene svg.over{z-index:2}.cam3 img.overlay{z-index:3;pointer-events:none}.scene svg.smoke{z-index:4}.scene svg.light{z-index:8}.scene .atmo{z-index:9;opacity:0}.scene canvas.noise{z-index:10;opacity:0;animation:grain .23s steps(4,end) infinite}.noSignal{position:absolute;inset:0;z-index:15;display:none;align-items:center;justify-content:center;flex-direction:column;gap:12px;background:#05090a;color:#e9f6f4;font:700 clamp(14px,3vw,35px) ui-monospace,monospace;letter-spacing:.16em}.noSignal.on{display:flex}.noSignal span{font:11px ui-monospace;color:#729188;letter-spacing:.08em}.atmo span{position:absolute;display:block;border-radius:50%;width:32%;height:60%;background:radial-gradient(ellipse,rgba(196,210,211,.66),rgba(144,169,170,.40) 40%,transparent 74%);filter:blur(7px);animation:cloud 11s ease-in-out infinite}.atmo span:nth-child(1){left:12%;top:42%;animation-delay:-4s}.atmo span:nth-child(2){left:39%;top:26%;animation-delay:-8s;animation-duration:14s}.atmo span:nth-child(3){left:70%;top:48%;animation-delay:-2s;animation-duration:13s}.hit{pointer-events:all;cursor:pointer}.hit:focus-visible{stroke:#ffd871;stroke-width:2}.mainflash{animation:blink 1.2s steps(2,end) infinite}.smokepuff{opacity:0;transform-box:fill-box;transform-origin:center;animation:puff 6.8s ease-out infinite}.smokepuff.b{animation-delay:-2.2s;animation-duration:7.7s}.smokepuff.c{animation-delay:-4.5s;animation-duration:7.2s}.scene img.jim.wave{animation:wave 1.6s ease-in-out infinite}.scene img.jim.jump{animation:jump 1.5s ease-out infinite}@keyframes grain{0%{transform:translate(0)}25%{transform:translate(-1.5%,0)}50%{transform:translate(1%,-.5%)}75%{transform:translate(-.6%,1%)}}@keyframes cloud{0%{transform:translate(-10%,35%) scale(.72);opacity:0}28%{opacity:.8}65%{opacity:.72}100%{transform:translate(12%,-48%) scale(1.6);opacity:0}}@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}@keyframes puff{0%{opacity:0;transform:translate(2px,16px) scale(.65)}24%{opacity:.6}55%{opacity:.43}100%{opacity:0;transform:translate(20px,-235px) scale(2.25)}}@keyframes wave{50%{transform:translateX(-50%) rotate(-7deg)}}@keyframes jump{45%{transform:translate(-50%,-11%)}}\n.cam3 .cam3v7overlay{position:absolute;inset:0;width:100%;height:100%;z-index:6;pointer-events:none}.cam3 .cam3v7smoke{position:absolute;inset:0;width:100%;height:100%;z-index:5;pointer-events:none}\n\n/* M16 approved-reference poses and atmospheric fidelity */\n.cam1 img.jim,.cam2 img.jim{transform-origin:center bottom}\n.scene img.jim.cough{animation:coughShake 1.55s ease-in-out infinite}\n@keyframes coughShake{0%,30%,70%,100%{transform:translateX(-50%) rotate(0)}44%{transform:translateX(-50%) rotate(6deg) scaleY(.94)}54%{transform:translateX(-50%) rotate(-5deg) scaleY(.95)}}\n.cam3 .cam3v7smoke{z-index:7!important;pointer-events:none}\n.scene .atmo{display:none!important}.scene canvas.noise{mix-blend-mode:normal;image-rendering:auto}\n.scene .scanlines{position:absolute;inset:0;pointer-events:none;z-index:11;opacity:0;background:repeating-linear-gradient(0deg,rgba(218,226,224,.14) 0,rgba(218,226,224,.14) 1px,transparent 1px,transparent 5px);animation:scanRoll 4.8s linear infinite}\n@keyframes scanRoll{to{background-position:0 71px}}\n\n/* M17 native-visible controls and non-illuminating atmospheric layers */\n.hth,.hth *,.hth svg,.hth button{user-select:none!important;-webkit-user-select:none!important;-webkit-touch-callout:none;touch-action:manipulation}\n.hth .scene canvas.fog{position:absolute;inset:0;width:100%;height:100%;z-index:9;opacity:0;pointer-events:none;mix-blend-mode:normal;filter:blur(5px)}\n.hth .scene canvas.noise{z-index:10;pointer-events:none;mix-blend-mode:normal!important;image-rendering:auto!important}\n.hth .scene .scanlines{z-index:11;mix-blend-mode:normal}\n.hth .scene .light-pulse{position:absolute;inset:0;background:#03080b;z-index:12;opacity:0;pointer-events:none}\n";
function mount(root){if(!root||root.dataset.ready)return;root.dataset.ready='1';root.addEventListener('selectstart',e=>e.preventDefault());root.addEventListener('dblclick',e=>e.preventDefault());
const doc=document,svgNS='http://www.w3.org/2000/svg',$=q=>root.querySelector(q),$$=q=>[...root.querySelectorAll(q)],E=(t,p={})=>Object.assign(doc.createElement(t),p),S=(t,a={})=>{let x=doc.createElementNS(svgNS,t);for(let k in a)x.setAttribute(k,a[k]);return x};
const WAVECDN='https://cdn.jsdelivr.net/gh/Gmankey/happy-to-help-assets@35df90d3b0ffc5d68468439319d26637f2f71225/m18-wave-derivatives/';
const POSECDN='https://cdn.jsdelivr.net/gh/Gmankey/happy-to-help-assets@b5e1438d412ed30cd3cb75fde1fa67668962b465/m16-approved-pose-reference/';
const CDN='https://cdn.jsdelivr.net/gh/Gmankey/happy-to-help-assets@02e4cfd7ab8cf7391e79ca66512a30a320ac4a63/',FLOW='https://cdn.jsdelivr.net/gh/Gmankey/happy-to-help-assets@ca09fdd9d41491e071e3fbfdc0cf7825176de680/';
const keys='labCam exitCam lights labDoor exitDoor extraction inertGas'.split(' '),weights=[5,5,8,45,45,35,12],ys=[365,425,485,545,605,665,770];
const base={rev:3,boost:true,cap:90,trips:0,turns:2,hazard:2,door:0,westExit:0,lighting:10,phase:'EMERGENCY',cart:true,jim:{room:'lab',x:.71,pose:'standing'},pending:{labCam:true,exitCam:true,lights:true,labDoor:false,exitDoor:false,extraction:false,inertGas:false},committed:{labCam:true,exitCam:true,lights:true,labDoor:false,exitDoor:false,extraction:false,inertGas:false},seed:19281};
let st=globalThis.HTH_M21_ENGINE?.unwrap?.(globalThis.__bindings?.value)??globalThis.__bindings?.value??base;
const cost=c=>keys.reduce((n,k,i)=>n+(c?.[k]?weights[i]:0),0);
const img=(scene,path,cls,flow=false)=>{let x=E('img');x.className=cls||'';x.alt='';x.src=(flow?FLOW:CDN)+path;scene.append(x);return x};
const div=(par,cls)=>{let x=E('div');x.className=cls;par.append(x);return x};
const views=['cam1','cam2','cam3'].map((n,i)=>{let outer=div(root,'view '+n);let scene=div(outer,'scene');return scene});
const [a,b,c]=views;
const A=['BG-01_LAB_SHELL.png','DR-01-000_LEAF.png','DR-01-016_LEAF.png','DR-01-100_LEAF.png','JM-01_STANDING_TRANSPARENT.png'];
const B=['BG-02_CORRIDOR_SHELL.png','DR-02-000_LEAF.png','DR-02-016_LEAF.png','DR-02-100_LEAF.png','EX-01_EXIT_CLOSED.png','OB-01_CART_PRESENT.png','JM-01_STANDING_TRANSPARENT.png','JM-01_STANDING_TRANSPARENT.png'];
let l1=A.map((x,i)=>img(a,'m1-approved-v1/'+x,i===4?'jim':'')),l2=B.map((x,i)=>img(b,'m1-approved-v1/'+x,i>5?'jim':''));
// Four existing approved pose-reference SVGs, rendered as alternate physical Jim layers.
const POSEFILES=['01_normal_crouch.svg','02_panicky_crouch.svg','03_violent_cough_almost_dead.svg','04_dead.svg'];
function poseArt(scene,fn){const i=E('img');i.className='jim off';i.alt='';i.src=POSECDN+fn;scene.append(i);return i}
const pa=POSEFILES.map(fn=>poseArt(a,fn)),pb=POSEFILES.map(fn=>poseArt(b,fn));
const WAVEFILES=['approved_big_one_arm.svg','approved_big_two_arm.svg','approved_small_one_arm.svg'];
const wa=WAVEFILES.map(fn=>{const i=E('img');i.className='jim off';i.alt='';i.src=WAVECDN+fn;a.append(i);return i}),wb=WAVEFILES.map(fn=>{const i=E('img');i.className='jim off';i.alt='';i.src=WAVECDN+fn;b.append(i);return i});

for(let scene of [a,b]){let sig=div(scene,'noSignal');sig.innerHTML='<b>NO SIGNAL</b><span>CAMERA CIRCUIT UNPOWERED</span>'}
img(c,'m2-cam03-clean/CAM3_CLEAN_FIXED_BACKGROUND_v7.webp');
c.insertAdjacentHTML('beforeend',"<svg aria-label=\"Working six-switch control board with independently animated lights\" class=\"cam3v7overlay\" id=\"h7overlay\" role=\"group\" viewbox=\"0 0 1672 941\" xmlns=\"http://www.w3.org/2000/svg\"><defs><lineargradient id=\"h7Amber\" x2=\"0\" y2=\"1\"><stop stop-color=\"#4f2c04\"></stop><stop offset=\".45\" stop-color=\"#ffda79\"></stop><stop offset=\"1\" stop-color=\"#b66c14\"></stop></lineargradient><lineargradient id=\"h7Green\" x2=\"0\" y2=\"1\"><stop stop-color=\"#0b563d\"></stop><stop offset=\".5\" stop-color=\"#9affe1\"></stop><stop offset=\"1\" stop-color=\"#16c579\"></stop></lineargradient><radialgradient id=\"h7Led\"><stop stop-color=\"#efffff\"></stop><stop offset=\".35\" stop-color=\"#b8ffe0\"></stop><stop offset=\".7\" stop-color=\"#45faad\"></stop><stop offset=\"1\" stop-color=\"#077343\"></stop></radialgradient><filter id=\"h7Glow\"><fegaussianblur stddeviation=\"5\"></fegaussianblur></filter></defs><text fill=\"#d8f1ef\" font-family=\"ui-monospace,Consolas,monospace\" font-size=\"37\" font-weight=\"600\" id=\"h7reading\" text-anchor=\"middle\" x=\"593\" y=\"307\">18 / 90</text><rect fill=\"#08151a\" height=\"38\" rx=\"3\" stroke=\"#839ba0\" stroke-width=\"1.5\" width=\"82\" x=\"414\" y=\"578\"></rect><g class=\"mainflash\" id=\"h7redflash\"><rect fill=\"#ff4f55\" filter=\"url(#h7Glow)\" height=\"21\" opacity=\".35\" rx=\"2\" width=\"65\" x=\"421\" y=\"586\"></rect><rect fill=\"#ed3845\" height=\"18\" rx=\"1.4\" width=\"61\" x=\"423\" y=\"587\"></rect><path d=\"M426 590H482\" stroke=\"#ffc3b9\" stroke-width=\"1.5\"></path></g><g id=\"h7backup\"><rect fill=\"#ffb52d\" filter=\"url(#h7Glow)\" height=\"30\" id=\"h7backupHalo\" opacity=\".38\" rx=\"2\" width=\"84\" x=\"937\" y=\"612\"></rect><rect fill=\"url(#h7Amber)\" height=\"21\" id=\"h7backupLamp\" rx=\"2\" stroke=\"#6c827f\" stroke-width=\".7\" width=\"75\" x=\"940\" y=\"616\"></rect></g><g id=\"h7flow\"></g><g id=\"h7breakers\"></g><rect aria-label=\"BOOST generator locally; no gameplay turn\" class=\"hit\" fill=\"transparent\" height=\"42\" id=\"h7boostBtn\" role=\"button\" tabindex=\"0\" width=\"164\" x=\"883\" y=\"648\"></rect></svg>");
const switchAssets=['CAM3_SWITCHES_OFF_FIXED_v1.png',...Array.from({length:6},(_,i)=>`CAM3_SWITCH_${i+1}_ON_FIXED_v1.png`)];
const switchImgs=switchAssets.map((x,i)=>{const el=img(c,'m4-immutable-v13/'+x,'overlay');if(i>0)el.style.clipPath='inset(0 6.8% 0 0)';return el});
const power=img(c,'m6-calibrated-v15/CAM3_BACKUP_FLOW_CALIBRATED_v15.svg','overlay',true);
c.insertAdjacentHTML('beforeend',"<svg aria-label=\"Continuously drifting smoke in front of the power monitor\" class=\"cam3v7smoke\" viewbox=\"0 0 1672 941\" xmlns=\"http://www.w3.org/2000/svg\"><defs><radialgradient id=\"h7Smoke1\"><stop stop-color=\"#dde4e4\" stop-opacity=\".45\"></stop><stop offset=\".5\" stop-color=\"#c8d0ce\" stop-opacity=\".20\"></stop><stop offset=\"1\" stop-color=\"#aebfc0\" stop-opacity=\"0\"></stop></radialgradient><radialgradient id=\"h7Smoke2\"><stop stop-color=\"#e2eae9\" stop-opacity=\".30\"></stop><stop offset=\".57\" stop-color=\"#bac8c7\" stop-opacity=\".17\"></stop><stop offset=\"1\" stop-color=\"#9fb5b4\" stop-opacity=\"0\"></stop></radialgradient></defs><g pointer-events=\"none\"><g class=\"smokepuff\"><ellipse cx=\"584\" cy=\"503\" fill=\"url(#h7Smoke1)\" rx=\"46\" ry=\"76\"></ellipse><ellipse cx=\"559\" cy=\"522\" fill=\"url(#h7Smoke2)\" rx=\"43\" ry=\"54\"></ellipse></g><g class=\"smokepuff b\"><ellipse cx=\"561\" cy=\"508\" fill=\"url(#h7Smoke2)\" rx=\"50\" ry=\"72\"></ellipse><ellipse cx=\"590\" cy=\"491\" fill=\"url(#h7Smoke1)\" rx=\"37\" ry=\"59\"></ellipse></g><g class=\"smokepuff c\"><ellipse cx=\"603\" cy=\"507\" fill=\"url(#h7Smoke1)\" rx=\"48\" ry=\"69\"></ellipse><ellipse cx=\"573\" cy=\"517\" fill=\"url(#h7Smoke2)\" rx=\"38\" ry=\"54\"></ellipse></g></g></svg>");
const tabs=E('div',{className:'tabs'});root.prepend(tabs);['CAM 01 · LAB','CAM 02 · CORRIDOR','CAM 03 · POWER'].forEach((t,i)=>{let button=E('button',{textContent:t});button.type='button';button.addEventListener('click',()=>{root.querySelectorAll('.tabs button').forEach((x,j)=>x.setAttribute('aria-selected',String(j===i)));root.querySelectorAll('.view').forEach((x,j)=>x.classList.toggle('on',j===i));if(i===2)restart()});tabs.append(button)});tabs.firstChild.click();
const stop=[0,.18,.36,.54,.70,.84,.96,1],D20=[.24,.30,.44,.66,.86,.98,1,1],D70=[.18,.22,.32,.48,.68,.86,1,1],W71=[.10,.14,.24,.42,.64,.84,1,1],W100=[.18,.26,.42,.66,.86,.98,1,1];
const configs=[[887,443.5,650,335,990,520,1774,887],[800,468,600,338,896,504,1600,900]];
const gradients=[a,b].map((scene,i)=>{let [cx,cy,sx,sy,lx,ly,w,h]=configs[i],q=S('svg',{class:'light',viewBox:`0 0 ${w} ${h}`,preserveAspectRatio:'none'}),defs=S('defs'),g=S('radialGradient',{id:'shade'+i,gradientUnits:'userSpaceOnUse',cx:0,cy:0,r:1}),wh=S('radialGradient',{id:'glare'+i,gradientUnits:'userSpaceOnUse',cx:0,cy:0,r:1});for(let v of stop){g.append(S('stop',{offset:v}));wh.append(S('stop',{offset:v}))}defs.append(g,wh);q.append(defs,S('rect',{width:w,height:h,fill:`url(#shade${i})`}),S('rect',{width:w,height:h,fill:`url(#glare${i})`}));scene.append(q);let at=div(scene,'atmo');for(let z=0;z<3;z++)at.append(E('span'));let fog=E('canvas',{className:'fog',width:384,height:216});scene.append(fog);let n=E('canvas',{className:'noise',width:384,height:216});scene.append(n);div(scene,'scanlines');div(scene,'light-pulse');return {g,wh,at,fog,n}});
const mix=(x,y,t)=>x+(y-x)*t;
function shade(l,cfg){let [cx,cy,sx,sy,lx,ly]=cfg,r1=sx,r2=sy,al,white=stop.map(()=>0);if(l<=20)al=D20.map(v=>mix(1,v,l/20));else if(l<=70){let t=(l-20)/50;r1=mix(sx,lx,t);r2=mix(sy,ly,t);al=D20.map((v,i)=>mix(v,D70[i],t))}else if(l<=85){let t=(l-70)/15;r1=lx;r2=ly;al=D70.map((v,i)=>mix(v,[.08,.10,.17,.28,.42,.61,.84,.97][i],t))}else{let t=(l-85)/15;r1=lx;r2=ly;al=[.08,.10,.17,.28,.42,.61,.84,.97].map(v=>v*(1-.83*t));white=W100.map(v=>v*t*.97)}return [r1,r2,al,white]}
function noise(canvas,level,seed){let x=seed>>>0,ctx=canvas.getContext('2d',{willReadFrequently:true});if(!ctx)return;const d=ctx.createImageData(canvas.width,canvas.height);for(let i=0;i<d.data.length;i+=4){x^=x<<13;x^=x>>>17;x^=x<<5;const v=x&255;d.data[i]=d.data[i+1]=d.data[i+2]=v>127?185:13;d.data[i+3]=Math.round((v>127?.24:.40)*255*level)}ctx.putImageData(d,0,0)}
function smoke(canvas,level,time,seed){const ctx=canvas.getContext('2d');if(!ctx)return;const w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);if(level<=0)return;
 // Ash-grey wisps, 3 density layers, continuously advecting. No radial glow or screen/additive blending.
 const drift=time*.006,alpha=Math.min(.60,.12+level*.49);ctx.save();ctx.globalCompositeOperation='source-over';
 for(let layer=0;layer<3;layer++)for(let p=0;p<15;p++){
  const i=p+layer*15,k=i*12.37+seed*.00031,z=(i*97+drift*(.8+.3*layer))%(w+290)-145;
  const y=h*(.19+(p%9)*.085)+Math.sin(k+time*.00035)*21+(layer-1)*19;
  const dy=14+9*Math.sin(k+.2),bend=22*Math.cos(k+time*.0004);
  ctx.beginPath();ctx.moveTo(z-100,y+dy);ctx.bezierCurveTo(z-42,y-29+bend,z+31,y+35-bend,z+115,y-31);ctx.bezierCurveTo(z+147,y-47,z+171,y+28,z+220,y-18);
  ctx.lineWidth=(17+(p%5)*7)*(0.80+level*.7);
  ctx.strokeStyle=`rgba(${layer===0?104:layer===1?127:140},${layer===0?115:layer===1?135:148},${layer===0?118:layer===1?137:149},${alpha*(.12+(p%5)*.044)})`;
  ctx.lineCap='round';ctx.stroke();
 }
 ctx.restore();}
let count=0;function restart(){if(st.boost){let src=power.src.split('#')[0];power.src=src+'#camera-entry-'+(++count)}};
const read=$('#h7reading'),lamp=$('#h7backupLamp'),halo=$('#h7backupHalo');
function update(p){st=p;render();globalThis.__bindings?.setValue?.(p)}
const controls=$('#h7breakers');
// Installed after immutable ON artwork: the lamp indicates LIVE POWER, not switch position.
// M19 seventh circuit is added without changing the original six switch overlays.
const dangerLabel=S('text',{x:1420,y:766,fill:'#d9dedc','font-size':17,'font-weight':'600','text-anchor':'end'});
dangerLabel.textContent='INERT GAS RELEASE';controls.append(dangerLabel);
const dangerCaption=S('text',{x:1489,y:727,fill:'#efaba1','font-size':15,'font-weight':'700','text-anchor':'middle'});
dangerCaption.textContent='DO NOT TOUCH';controls.append(dangerCaption);
const dangerFace=S('rect',{x:1438,y:740,width:102,height:45,rx:3,fill:'#07161a',stroke:'#8b9fa0','stroke-width':2});
const dangerText=S('text',{x:1489,y:768,fill:'#e9eeec','font-size':22,'font-weight':'700','text-anchor':'middle'});
controls.append(dangerFace,dangerText);
const lamps=keys.map((k,i)=>{let lens=S('circle',{cx:1586,cy:ys[i],r:15,fill:'#2ae1a1',stroke:'#b3fbd9','stroke-width':1.7,'pointer-events':'none'});controls.append(lens);return lens});
keys.forEach((k,i)=>{let hit=S('rect',{x:1416,y:ys[i]-28,width:174,height:56,fill:'transparent',class:'hit',tabindex:'0',role:'button','aria-label':'Toggle '+k});let toggle=()=>update({...st,pending:{...st.pending,[k]:!st.pending[k]}});hit.addEventListener('click',toggle);hit.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});controls.append(hit)});
const boost=$('#h7boostBtn');boost.addEventListener('click',()=>{if(!st.boost){update({...st,boost:true,cap:Math.max(20,90-2*st.trips),fault:null});restart()}});
boost.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();boost.click()}});
function render(){
 l1.slice(1,4).forEach((x,i)=>x.classList.toggle('off',[0,16,100][i]!==st.door));l2.slice(1,4).forEach((x,i)=>x.classList.toggle('off',[0,16,100][i]!==st.door));
 l2[4].classList.toggle('off',st.westExit===100);l2[5].classList.toggle('off',!st.cart);
 const j=st.jim||{},where=j.room||'lab',x=Math.max(0,Math.min(1,j.x??.71));l1[4].classList.toggle('off',where!=='lab');l2[6].classList.toggle('off',where!=='corridor');l2[7].classList.add('off');l1[4].style.left=x*100+'%';// Offline-calibrated walkable corridor strip with pose-dependent silhouette clearance.
const t=Math.max(0,Math.min(1,(x-.49)/(.83-.49)));
const distress=['crouching','incapacitation-risk','dead'].includes(j.condition)||/crouch|almost|dead|panicky/i.test(j.pose||'');
const anchorX=(distress?63:52)+(distress?19:27)*t,standHeight=(distress?38:40)-22*t,nominalFoot=(distress?96:94)-38*t;
const floorEdge=xp=>xp<87?88-.535*xp:41.5;
const prone=/almost|dead|crouch|panicky|violent/i.test(j.pose||'')||['crouching','incapacitation-risk','dead'].includes(j.condition);
const silhouetteHt=standHeight*(j.condition==='dead'?.56:j.condition==='incapacitation-risk'?.59:j.condition==='crouching'?.70:1);
const leftExtent=prone?silhouetteHt*.55:standHeight*.20;
const anchorFoot=Math.min(98,Math.max(nominalFoot,floorEdge(anchorX-leftExtent)+silhouetteHt+2));l2[6].style.left=anchorX+'%';l2[6].style.top=(anchorFoot-standHeight)+'%';l2[6].style.height=standHeight+'%';for(let p of [l1[4],l2[6]]){p.classList.toggle('wave',/wave/.test(j.pose||''));p.classList.toggle('jump',/jump/.test(j.pose||''));p.classList.toggle('cough',/cough/.test(j.pose||'')||j.condition==='coughing')}
 const rawPose=(j.pose||'').toLowerCase();const waveIndex=rawPose==='big-wave'?0:rawPose==='frantic-wave'?1:rawPose==='small-wave'?2:-1;let poseIndex=rawPose==='dead'||j.condition==='dead'?3:rawPose.includes('almost')||rawPose.includes('violent')||rawPose.includes('incapacitat')||j.condition==='incapacitation-risk'?2:rawPose.includes('panicky')?1:rawPose.includes('crouch')||j.condition==='crouching'?0:-1;
 // Use approved single-actor pose instead of retaining standing silhouette.
 l1[4].classList.toggle('off',where!=='lab'||poseIndex>=0||waveIndex>=0);l2[6].classList.toggle('off',where!=='corridor'||poseIndex>=0||waveIndex>=0);
 for(const [els,room] of [[pa,'lab'],[pb,'corridor']])els.forEach((im,i)=>{let visible=where===room&&poseIndex===i;im.classList.toggle('off',!visible);if(!visible)return;
 let near=room==='lab',foot=near?73:anchorFoot,baseHt=near?28:standHeight,factor=[.70,.67,.59,.56][i],ht=baseHt*factor;
 im.style.left=near?x*100+'%':anchorX+'%';im.style.height=ht+'%';im.style.top=(foot-ht)+'%';});
 for(const [els,room] of [[wa,'lab'],[wb,'corridor']])els.forEach((im,i)=>{const visible=where===room&&waveIndex===i&&!['dead','incapacitation-risk'].includes(j.condition);im.classList.toggle('off',!visible);if(!visible)return;const near=room==='lab',ht=near?28:standHeight,foot=near?73:anchorFoot;im.style.left=near?x*100+'%':anchorX+'%';im.style.height=ht+'%';im.style.top=(foot-ht)+'%';});
 dangerText.textContent=st.pending?.inertGas?'ON':'OFF';dangerFace.setAttribute('stroke',st.pending?.inertGas?'#dba9a0':'#8b9fa0');
 switchImgs.forEach((el,i)=>el.classList.toggle('off',i>0&&!st.pending?.[keys[i-1]]));power.classList.toggle('off',!st.boost);
 lamps.forEach((lens,i)=>{const live=!!(st.boost&&st.committed?.[keys[i]]);lens.style.display=live?'block':'none'});
 read.textContent=Number.isFinite(st.fault)?st.fault+' / 20':cost(st.committed)+' / '+st.cap;read.setAttribute('fill',Number.isFinite(st.fault)?'#ff737a':'#d8f1ef');lamp.setAttribute('fill',st.boost?'url(#h7Green)':'url(#h7Amber)');halo.setAttribute('fill',st.boost?'#20f59e':'#ffb52d');
 gradients.forEach(({g,wh,at,fog,n},i)=>{let active=!!(st.boost&&st.committed?.[i===0?'labCam':'exitCam']),level=st.committed?.lights?st.lighting:0,[r1,r2,alpha,white]=shade(level,configs[i]);if(st.phase==='NORMAL'){r1=configs[i][2];r2=configs[i][3];alpha=stop.map(()=>1-level/100);white=stop.map(()=>0)}const transform=`translate(${configs[i][0]} ${configs[i][1]}) scale(${r1} ${r2})`;for(const g0 of [g,wh])g0.setAttribute('gradientTransform',transform);[...g.children].forEach((el,j)=>{el.setAttribute('stop-color','#000');el.setAttribute('stop-opacity',alpha[j])});[...wh.children].forEach((el,j)=>{el.setAttribute('stop-color','#fff');el.setAttribute('stop-opacity',white[j])});let haz=st.hazard||0,sm=Math.min(1,Math.max(0,(haz-3)/23)),nz=Math.min(1,Math.max(0,(haz-3)/24));fog.style.opacity=active?String(.2+sm*.68):0;n.style.opacity=active?String(Math.min(.9,.04+nz*.67)):0;[a,b][i].querySelector('.scanlines').style.opacity=active?String(nz*.54):0;[a,b][i].querySelector('.noSignal').classList.toggle('on',!active)});
}
globalThis.__effect?.(()=>{let p=globalThis.HTH_M21_ENGINE?.unwrap?.(globalThis.__bindings?.value)??globalThis.__bindings?.value;if(p&&p!==st&&p.rev>=st.rev){st=p;render()}});render();
 let animTick=0,lastFrame=0,firstTime=null;function animate(time){if(!root.isConnected)return;if(firstTime===null)firstTime=time;const elapsed=time-firstTime;
 const flicker=st.flicker,validFlicker=flicker&&flicker.sequence===st.worldSeq;const pulses=validFlicker?Math.min(10,flicker.count||0):0;const pulse=elapsed<650*pulses&&((elapsed%650)<155||(elapsed%650>320&&elapsed%650<420));
 for(const scene of [a,b]){scene.querySelector('.light-pulse').style.opacity=pulse?'.98':'0'}
 if(time-lastFrame>240){lastFrame=time;animTick++;
 gradients.forEach(({n,fog},i)=>{const haz=st.hazard||0,active=st.boost&&st.committed?.[i===0?'labCam':'exitCam'];if(!active)return;const strength=Math.min(1,Math.max(0,(haz-3)/24));noise(n,strength,((st.seed||19281)^animTick*92821)>>>0);smoke(fog,strength,time,((st.seed||19281)+i*271)>>>0)});
 }requestAnimationFrame(animate)}requestAnimationFrame(animate);
}
function mountWithCSS(root){
  if(!root)return false;if(root.dataset.hthM18Ready)return true;root.dataset.hthM18Ready='yes';
  root.classList.add('hth');root.textContent='';
  const style=document.createElement('style');style.textContent=CSS;root.appendChild(style);
  mount(root);return true;
}
globalThis.HTH_M21_RUNTIME={version:RUNTIME_VERSION,mount:mountWithCSS};
})();