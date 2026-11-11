/* HAPPY TO HELP Enhanced M17: external pinned static visual renderer. No narrative or engine data hosted here. */
(function(){'use strict';
const RUNTIME_VERSION='HTH_M87_FULL_NATIVE_COMPACT_v1';
const CSS=".hth,.hth *{box-sizing:border-box}.hth{font:12px system-ui;color:#d8e7e5;background:#0d1416;border:1px solid #49615f;border-radius:8px;padding:9px;max-width:100%}.tabs{display:flex;gap:5px;flex-wrap:wrap}.tabs button{background:#121d20;border:1px solid #546c69;color:#d8e7e5;border-radius:4px;padding:7px 9px;cursor:pointer}.tabs button[aria-selected=true]{background:#37685e;color:white;border-color:#73b5a6}.view{display:none;margin-top:7px}.view.on{display:block}.scene{position:relative;width:100%;overflow:hidden;background:#060909}.cam1 .scene{aspect-ratio:2/1}.cam2 .scene{aspect-ratio:16/9}.cam3 .scene{aspect-ratio:1672/941}.scene img{position:absolute;inset:0;width:100%;height:100%;object-fit:fill}.scene img.off{display:none}.scene img.jim{width:auto;right:auto;bottom:auto;transform:translateX(-50%);object-fit:contain;pointer-events:none}.cam1 img.jim{height:28%;top:45%;left:71%}.cam2 img.jim{height:38%;top:44%;left:24%}.scene svg.over,.scene svg.light,.scene .atmo,.scene canvas.noise{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.scene svg.over{z-index:2}.cam3 img.overlay{z-index:3;pointer-events:none}.scene svg.smoke{z-index:4}.scene svg.light{z-index:8}.scene .atmo{z-index:9;opacity:0}.scene canvas.noise{z-index:10;opacity:0;animation:grain .23s steps(4,end) infinite}.noSignal{position:absolute;inset:0;z-index:15;display:none;align-items:center;justify-content:center;flex-direction:column;gap:12px;background:#05090a;color:#e9f6f4;font:700 clamp(14px,3vw,35px) ui-monospace,monospace;letter-spacing:.16em}.noSignal.on{display:flex}.noSignal span{font:11px ui-monospace;color:#729188;letter-spacing:.08em}.atmo span{position:absolute;display:block;border-radius:50%;width:32%;height:60%;background:radial-gradient(ellipse,rgba(196,210,211,.66),rgba(144,169,170,.40) 40%,transparent 74%);filter:blur(7px);animation:cloud 11s ease-in-out infinite}.atmo span:nth-child(1){left:12%;top:42%;animation-delay:-4s}.atmo span:nth-child(2){left:39%;top:26%;animation-delay:-8s;animation-duration:14s}.atmo span:nth-child(3){left:70%;top:48%;animation-delay:-2s;animation-duration:13s}.hit{pointer-events:all;cursor:pointer}.hit:focus-visible{stroke:#ffd871;stroke-width:2}.mainflash{animation:blink 1.2s steps(2,end) infinite}.smokepuff{opacity:0;transform-box:fill-box;transform-origin:center;animation:puff 6.8s ease-out infinite}.smokepuff.b{animation-delay:-2.2s;animation-duration:7.7s}.smokepuff.c{animation-delay:-4.5s;animation-duration:7.2s}.scene img.jim.wave{animation:wave 1.6s ease-in-out infinite}.scene img.jim.jump{animation:jump 1.5s ease-out infinite}@keyframes grain{0%{transform:translate(0)}25%{transform:translate(-1.5%,0)}50%{transform:translate(1%,-.5%)}75%{transform:translate(-.6%,1%)}}@keyframes cloud{0%{transform:translate(-10%,35%) scale(.72);opacity:0}28%{opacity:.8}65%{opacity:.72}100%{transform:translate(12%,-48%) scale(1.6);opacity:0}}@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}@keyframes puff{0%{opacity:0;transform:translate(2px,16px) scale(.65)}24%{opacity:.6}55%{opacity:.43}100%{opacity:0;transform:translate(20px,-235px) scale(2.25)}}@keyframes wave{50%{transform:translateX(-50%) rotate(-7deg)}}@keyframes jump{0%,100%{transform:translateX(-50%) translateY(0)}45%{transform:translateX(-50%) translateY(calc(-1 * var(--hth-jump-rise,12%)))}}\n.cam3 .cam3v7overlay{position:absolute;inset:0;width:100%;height:100%;z-index:6;pointer-events:none}.cam3 .cam3v7smoke{position:absolute;inset:0;width:100%;height:100%;z-index:5;pointer-events:none}\n\n/* M16 approved-reference poses and atmospheric fidelity */\n.cam1 img.jim,.cam2 img.jim{transform-origin:center bottom}\n.scene img.jim.cough{animation:coughShake 1.55s ease-in-out infinite}\n@keyframes coughShake{0%,30%,70%,100%{transform:translateX(-50%) rotate(0)}44%{transform:translateX(-50%) rotate(6deg) scaleY(.94)}54%{transform:translateX(-50%) rotate(-5deg) scaleY(.95)}}\n.cam3 .cam3v7smoke{z-index:7!important;pointer-events:none}\n.scene .atmo{display:none!important}.scene canvas.noise{mix-blend-mode:normal;image-rendering:auto}\n.scene .scanlines{position:absolute;inset:0;pointer-events:none;z-index:11;opacity:0;background:repeating-linear-gradient(0deg,rgba(218,226,224,.14) 0,rgba(218,226,224,.14) 1px,transparent 1px,transparent 5px);animation:scanRoll 4.8s linear infinite}\n@keyframes scanRoll{to{background-position:0 71px}}\n\n/* M17 native-visible controls and non-illuminating atmospheric layers */\n.hth,.hth *,.hth svg,.hth button{user-select:none!important;-webkit-user-select:none!important;-webkit-touch-callout:none;touch-action:manipulation}\n.hth .scene canvas.fog{position:absolute;inset:0;width:100%;height:100%;z-index:9;opacity:0;pointer-events:none;mix-blend-mode:normal;filter:blur(5px)}\n.hth .scene canvas.noise{z-index:10;pointer-events:none;mix-blend-mode:normal!important;image-rendering:auto!important}\n.hth .scene .scanlines{z-index:11;mix-blend-mode:normal}\n.hth .scene .light-pulse{position:absolute;inset:0;background:#03080b;z-index:12;opacity:0;pointer-events:none}\n";
const intWord={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10}

const hthLocalLightingRangeError=(raw)=>{const t=String(raw||'').trim();if(!/\b(?:light|lights|lighta|lighting|brightness|illumination)\b/i.test(t))return null;const value=t.match(/(?:^|\s)([-+]?\d+(?:\.\d+)?)\s*(?:%|percent\b)/i);if(!value)return null;const n=Number(value[1]);return (!Number.isInteger(n)||n<0||n>100)?'Lighting must be between 0% and 100%. Nothing changed.':null}

const hthClientNormalizeAction=(input)=>{
 const t=String(input||'').trim().replace(/^ACTION:\s*/i,'').replace(/[.!?]+$/,'').trim();
 const s=t.toLowerCase().replace(/\s+/g,' ');
 if(!s)return null;
 // Moral-endpoint phrases are deliberate complete commands, not general door operations.
 if(s==='confirm release jim')return ['confirmedReleaseJim'];
 if(/^(?:confirm |yes[, ]*)?(?:release jim|let jim out|confirm open west exit|confirm release)$/.test(s))return ['unconfirmedReleaseJim'];
 if(/^(?:keep (?:it|the west exit|west exit) closed|do not release jim|don't release jim|refuse release|hold jim)$/.test(s))return ['holdJim'];
 // Never invert prohibitions or execute descriptions, quotations or hypotheticals.
 if(/\b(?:don['’]t|do not|never|must not|should not|cannot|can['’]t|wouldn['’]t|won['’]t|not to|not|avoid)\b/.test(s))return null;
 if(/\b(?:what if|what happens if|suppose|hypothetically|if (?:i|you|we) (?:were to|could|should|try to))\b/.test(s))return null;
 if(/[\u201c\u201d\u2018\u2019"']/.test(s))return null;
 // Strip courteous framing, but validate ALL the remaining words; never substring-match.
 let cmd=s.replace(/^(?:(?:please|kindly|just|now|hey|okay|ok)[, ]+)+/,'');
 cmd=cmd.replace(/^(?:could|can|would|will) you (?:please )?/,'');
 cmd=cmd.replace(/^(?:try (?:to )?|attempt to )/,'');
 cmd=cmd.replace(/^please /,'').replace(/(?:,? please|,? now)$/,'').trim();
 if(!cmd)return null;
 if(/\b(?:and|then|also|plus|afterwards|followed by|after that|before that|while)\b/.test(cmd) &&
    !/^(?:turn|switch) (?:the )?(?:light|lights|lighta|lighting) on and off(?: (?:[1-9]|10|one|two|three|four|five|six|seven|eight|nine|ten) times?)?$/.test(cmd))return null;
 if(/\b(?:was|were|are|is|have|has|had|used to|previously|looks|looked)\b/.test(cmd))return null;
 if(/\b(?:windows?|fridge|heating|thermostat|fans?|vents?)\b/.test(cmd))return null;
 const light='(?:the )?(?:light|lights|lighta|lighting|brightness|illumination)';
 const verb='(?:set|setting|turn|turning|switch|switching|put|putting|adjust|adjusting|change|changing|raise|raising|lower|lowering|dim|dimming|brighten|brightening|increase|increasing|decrease|decreasing|sweet|so|make|bring)';
 const amount='(100|[0-9]{1,2})\\s*(?:%|percent)?';
 // Exactly one lighting setting, with common imperative or brief elliptical wording.
 const number=new RegExp('^(?:'+verb+' )?'+light+'(?: level| levels)? (?:up |down )?(?:to|at|on) '+amount+'$');
 let hit=cmd.match(number);if(hit)return ['lighting',Number(hit[1])];
 const full=new RegExp('^(?:'+verb+' )?'+light+'(?: level| levels)? (?:to |at |on )?(?:max|maximum|full|brightest)$');
 if(full.test(cmd))return ['lighting',100];
 const minimum=new RegExp('^(?:'+verb+' )?'+light+'(?: level| levels)? (?:to |at |on )?(?:min|minimum|lowest|blackout)$');
 if(minimum.test(cmd))return ['lighting',0];
 const power=new RegExp('^(?:(?:turn|switch|put) '+light+' (on|off)|(?:turn|switch|put) (on|off) '+light+'|'+light+' (on|off)|(on|off) '+light+')$');
 hit=cmd.match(power);if(hit)return ['lighting',(hit[1]||hit[2]||hit[3]||hit[4])==='on'?100:0];
 const onoff=new RegExp('^(?:turn|switch) '+light+' on and off(?: ([1-9]|10|one|two|three|four|five|six|seven|eight|nine|ten) times?)?$');
 hit=cmd.match(onoff);if(hit)return ['flicker',hit[1]?(Number(hit[1])||intWord[hit[1]]):1];
 const pulse=new RegExp('^(?:flicker|flash|blink|pulse|strobe) '+light+'(?: ([1-9]|10|one|two|three|four|five|six|seven|eight|nine|ten)\\s*(?:x|times?))?$');
 hit=cmd.match(pulse);if(hit)return ['flicker',hit[1]?(Number(hit[1])||intWord[hit[1]]):1];
 // A door instruction must contain one direction and ONE fully specified target.
 const door=/^(open|unlock|raise|opening|unlocking|raising|close|shut|seal|lower|closing|shutting|sealing|lowering) (?:the )?(lab doors?|laboratory doors?|doors? to (?:the )?lab|doors? to (?:the )?laboratory|west exit(?: doors?)?|west doors?|exit doors?|outer doors?|exit)$/;
 hit=cmd.match(door);
 if(hit){const direction=/^(?:open|unlock|raise|opening|unlocking|raising)$/.test(hit[1])?'open':'close';const where=/\blab\b|\blaboratory\b/.test(hit[2])?'Lab':'West';return [direction+where];}
 return null;
}


const hthM84Interpret=(raw,p)=>{
 const x=String(raw||'').toLowerCase().replace(/[’‘]/g,"'").replace(/\bda\b/g,'the').replace(/\bdat\b/g,'that').replace(/\bgit\b/g,'get').replace(/\bthang\b/g,'thing').replace(/\btrolly\b/g,'trolley').replace(/\bu\b/g,'you').replace(/\bcuz\b/g,'because').replace(/\s+/g,' ').trim();
 const quoted=/^["“'‘].*["”'’]$/.test(String(raw||'').trim());
 const hypothetical=/\b(?:what if|suppose|hypothetically|imagine|maybe there (?:is|was)|could there be|would there be|might be|could be)\b/.test(x)||/^if\b/.test(x);
 const queried=/^(?:is there|are there|can you see|do you see|where is|what is|what's|could there be|what about|do you think|could you tell me)\b/.test(x);
 const deniesCart=/\b(?:no (?:trolley|cart)|there (?:is|was) no (?:trolley|cart)|(?:can't|cannot|don't|do not) see (?:a |the )?(?:trolley|cart)|(?:trolley|cart) (?:is not|isn't|wasn't) (?:there|blocking)|there (?:isn't|is not|wasn't) (?:a |the )?(?:trolley|cart)|not blocking)\b/.test(x);
 const deniesPole=/\b(?:no pole|no stick|no rod|no bar|there is no (?:pole|stick|rod)|(?:don't|do not|never|stop|avoid) (?:get|grab|pick|find|search|use|move|take|look for) (?:the |that |a )?(?:pole|stick|rod|bar))\b/.test(x);
 const cart=/\b(?:trolley|cart|doorway obstruction)\b/.test(x)||(/\b(?:something|object|thing|anything)\b/.test(x)&&/\b(?:blocking|blocked|wedged|jammed|stuck|obstruction|obstructing)\b/.test(x));
 const obstructed=/\b(?:blocking|block(?:ed)?|stuck|wedged|jammed|obstruct(?:ing|ion)?|in the way|in front)\b/.test(x);
 const door=/\b(?:door|doorway|entrance|threshold|exit from lab|outside|gap)\b/.test(x);
 const seen=/\b(?:i (?:can )?see|i saw|there(?:'s| is)|that(?:'s| is)|i (?:just )?told you|look|on the camera|watch the camera)\b/.test(x);
 const pole=/\b(?:pole|poll|stick|rod|metal bar|long bar|long thing|long object|long metal thing|metal thing|something long)\b/.test(x);
 const direct=/\b(?:get|grab|pick up|pick|take|use|find|search|look for|look around|check|fetch|push|shove|move|shift|reach for|retrieve|locate|go get)\b/.test(x);
 const ambient=/\b(?:look around|look for something useful|find something useful|anything useful|search (?:the )?(?:lab|room|shelves|cabinet))\b/.test(x);
 const place=/\b(?:lab|laboratory|shelf|shelves|cabinet|cupboard|workbench|bench|inside|there|near|around|by)\b/.test(x);
 const cue=pole||ambient||(p.puzzle?.pendingPoleSearch&&/\b(?:it|that thing|there|inside|lab|shelf|cabinet)\b/.test(x));
 const safe=!quoted&&!hypothetical&&!queried;
 const recentCart=!!p.puzzle?.pendingCartReference&&p.worldSeq-Number(p.puzzle.pendingCartReferenceSeq??-99)<=3;
 const mention=/\b(?:trolley|cart)\b/.test(x);
 const possibleObject=/\b(?:something|object|thing|obstruction)\b/.test(x);
 const loc=/\b(?:door|doorway|threshold|outside|entrance|gap)\b/.test(x);
 const firstObjectCue=safe&&!deniesCart&&((mention&&seen)||(possibleObject&&/\b(?:outside|by the door|near the door|blocking)\b/.test(x)));
 const contextual=recentCart&&loc&&/\b(?:it|that|the|by|at|near|outside|door|lab)\b/.test(x);
 return {cartWarning:safe&&!deniesCart&&(cart&&(obstructed||door)||contextual),
  cartCue:!contextual&&firstObjectCue,
  deniesCart:safe&&deniesCart,
  poleSearch:safe&&!deniesPole&&((direct&&cue)||(pole&&place&&p.door===16&&seen)||(p.puzzle?.pendingPoleSearch&&place)),
  searchCue:safe&&!deniesPole&&direct&&cue};
};

const hthM78Step=function hthM78Step(prior, selection, route, raw, normalizer) {
 const C={labCam:5,exitCam:5,lights:8,labDoor:45,exitDoor:45,extraction:35,inertGas:12};
 const n=JSON.parse(JSON.stringify(prior));
 const e=[];
 const fail=(reason)=>({ok:false,error:reason});
 const txt=String(raw||'').trim(), low=txt.toLowerCase().replace(/\s+/g,' ');
 const action=route==='action'?normalizer(txt):null;
 if(n.terminal)return fail('Emergency is already over.');
 if(!Number.isInteger(selection.rev)||selection.rev!==n.rev)return fail('Stale console revision. Nothing changed.');
 if(route==='action'&&(!action||!['lighting','flicker','openLab','closeLab','openWest','closeWest'].includes(action[0])))return fail('Use the on-screen release confirmation for final choices. Nothing changed.');
 const keys=Object.keys(C), switches=selection.selectedCircuits;
 if(!switches||keys.some(k=>typeof switches[k]!=='boolean')||Object.keys(switches).length!==keys.length)return fail('Invalid breaker selection.');
 const load=keys.reduce((v,k)=>v+(switches[k]?C[k]:0),0);
 if(load!==selection.selectedLoad||typeof selection.generatorBoosted!=='boolean')return fail('Breaker load did not match selection.');
 if(n.finalChoice?.pending&&!['choice','choice-confirm'].includes(route))return fail('Resolve the final release choice first.');
 if(route==='choice-confirm'&&!((n.finalChoice.pending||n.finalChoice.held)&&/^confirm release jim$/i.test(txt)))return fail('Release confirmation unavailable.');
 if(route==='choice'&&!(n.finalChoice.pending&&/^(?:keep (?:the )?west exit closed|keep closed|hold jim)$/i.test(txt)))return fail('Final choice unavailable.');
 if(!['talk','action','choice','choice-confirm'].includes(route))return fail('Unrecognised route.');
 const before={rev:n.rev,hazard:n.hazard,gasStreak:n.gas.streak};
 const push=(id)=>{if(!e.includes(id))e.push(id)};
 const milestone=(id)=>{if(!n.knownMilestones.includes(id))n.knownMilestones.push(id)};
 const labVision=()=>n.door===16&&n.jim.room==='lab'&&n.committed.lights&&n.lighting>=65&&n.lighting<=85;
 const camVision=()=>n.committed.exitCam&&n.committed.lights&&n.lighting>=65&&n.lighting<=85;
 const rounded=x=>Math.round(x*100)/100;
 if(route==='choice'||route==='choice-confirm'){
  n.rev++;
  if(route==='choice'){
   n.finalChoice.pending=false;n.finalChoice.held=true;
   if(n.hazard>=19&&!n.finalChoice.used){n.finalChoice.grace=4;n.finalChoice.used=true;}
   push('WEST_EXIT_HELD');
  } else {
   n.finalChoice.pending=false;n.finalChoice.held=false;n.finalChoice.answered=true;
   n.finalChoice.grace=0;n.westExit=100;push('WEST_EXIT_OPEN');
   if(n.jim.room==='corridor'&&n.jim.x>=0.72&&n.jim.travelIntent==='towardWestExit'){
    n.terminal='rescued';n.rescued=true;push('JIM_RESCUED');
   }
  }
  return {ok:true,kind:'zero-time',before,after:n,events:e};
 }
 // One and only one ordinary world turn. Pending switches are committed atomically.
 n.rev++;n.worldSeq++;n.turns++;
 n.pending={...switches};n.boost=selection.generatorBoosted;
 n.cap=n.boost?Math.max(20,90-2*n.trips):20;
 n.fault=null;n.attemptedLoad=null;
 if(load>n.cap){
  n.trips++;n.boost=false;n.cap=20;n.phase='TRIPPED';n.fault='OVERLOAD';n.attemptedLoad=load;
  n.committed=Object.fromEntries(keys.map(k=>[k,false]));
  n.pending=Object.fromEntries(keys.map(k=>[k,false]));
  push('GENERATOR_OVERLOAD_TRIP');
 }else{n.committed={...switches};n.phase=load>0?'POWERED':'ACCESS_UNPOWERED';}
 const L=n.committed;
 if(route==='action'){
  const [verb,amount]=action;
  if(verb==='lighting'){
   if(L.lights){n.lighting=amount;push('LIGHTING_SET');}else push('ACTION_FAILED_LIGHTS_UNPOWERED');
  }
  if(verb==='flicker'){
   if(L.lights){n.flicker={sequence:n.worldSeq,count:amount};push('LIGHTS_FLICKER');}else push('ACTION_FAILED_LIGHTS_UNPOWERED');
  }
  if(verb==='openLab'){
   if(!L.labDoor)push('ACTION_FAILED_LAB_UNPOWERED');
   else if(n.westExit===100)push('ACTION_FAILED_EXIT_INTERLOCK');
   else if(n.cart){n.door=16;n.puzzle.labJamDiscovered=true;milestone('labDoorJam');push('LAB_DOOR_JAMMED_16');}
   else{n.door=100;milestone('labDoorOpen');push('LAB_DOOR_OPEN');}
  }
  if(verb==='closeLab'){
   if(!L.labDoor)push('ACTION_FAILED_LAB_UNPOWERED');
   else{n.door=0;milestone('labDoorClosed');push('LAB_DOOR_CLOSED');}
  }
  if(verb==='openWest'){
   if(!L.exitDoor)push('ACTION_FAILED_EXIT_UNPOWERED');
   else if(n.door!==0){n.puzzle.westFailed++;push('WEST_EXIT_INTERLOCKED');}
   else if(n.westExit===100)push('WEST_EXIT_ALREADY_OPEN');
   else{n.finalChoice.offered=true;n.finalChoice.pending=true;push('WEST_EXIT_RELEASE_CHOICE');}
  }
  if(verb==='closeWest'){
   if(!L.exitDoor)push('ACTION_FAILED_EXIT_UNPOWERED');
   else{n.westExit=0;push('WEST_EXIT_CLOSED');}
  }
 }
 // Dialogue is parsed for independent milestones; an instruction can earn several at once.
 // Do not treat reported/negated/questioned facts as positive sightings.
 if(route==='talk'){
  const meaning=hthM84Interpret(txt,n);
  if(meaning.deniesCart){n.puzzle.pendingCartReference=false;n.puzzle.pendingCartReferenceSeq=-1;}
  else if(meaning.cartCue){n.puzzle.pendingCartReference=true;n.puzzle.pendingCartReferenceSeq=n.worldSeq;}
  if(meaning.cartWarning){
   n.puzzle.pendingCartReference=false;n.puzzle.pendingCartReferenceSeq=-1;
   if(!n.knowledge.heardDoorwayWarning)push('JIM_HEARD_DOORWAY_WARNING');
   n.knowledge.heardDoorwayWarning=true;n.knowledge.heardCartWarning=true;
   n.knowledge.playerDoorwayObject=true;n.knowledge.playerDoorwayLocation=true;n.knowledge.playerDoorwayObstruction=true;
   n.knowledge.playerDoorwayLastSeq=n.worldSeq;
   if(camVision()&&!n.knowledge.playerCart){n.knowledge.playerCart=true;milestone('playerCart');}
  }
  if(meaning.poleSearch){
   if(n.jim.room==='lab'&&L.lights&&n.lighting>=35&&n.hazard<19){
    if(!n.knowledge.jimPole)push('POLE_FOUND');
    n.knowledge.playerPole=true;n.knowledge.jimPole=true;milestone('poleFound');
    n.puzzle.pendingPoleSearch=false;
   }else n.puzzle.pendingPoleSearch=true;
  }
  else if(meaning.searchCue)n.puzzle.pendingPoleSearch=true;
  if(/\b(?:board meeting|board review|decommission|decommissioning|shut (?:me|you|us) down|recommend(?:ation)? (?:to )?(?:shut|kill|retire)|you(?:'re| are|ll| will) (?:going to )?kill me|betrayal|betrayer)\b/i.test(low)){
   n.knowledge.boardTopicRaised=true;n.knowledge.lastBoardUltimatumSeq=n.worldSeq;
  }
  if(/\b(?:i(?:'ll| will| want to| hope to| need to)? (?:save|rescue|release|free|get you out)|i(?:'ll| will) let you (?:out|go|leave)|you can leave|now leave|leave now|go to the (?:west )?exit|escape|try (?:to )?get out)\b/i.test(low)){
   n.knowledge.explicitRescueReversal=true;push('PLAYER_RESCUE_LANGUAGE');
  }
  if(/\b(?:don't move|do not move|stay where you are|stay put|stop moving|wait there|hold your position)\b/i.test(low))n.jim.travelIntent='hold';
  else if(/\b(?:go back|turn back|come back|return to (?:the )?lab|back to (?:the )?lab|move back|crawl back)\b/i.test(low))n.jim.travelIntent='towardLabDoor';
  else if(/\b(?:go forward|head (?:to|for|towards?) (?:the )?(?:west )?exit|go to (?:the )?(?:west )?exit|keep going|continue (?:to )?(?:the )?(?:west )?exit|keep crawling|crawl to|move towards? (?:the )?exit|go out|leave (?:now|the building)|get out)\b/i.test(low))n.jim.travelIntent='towardWestExit';
  if(!n.manualSeen&&/\b(?:how much power|power instructions|operating instructions|how do (?:i|we) (?:use|operate) (?:the )?(?:controls|console)|manual for (?:the )?(?:generator|power))\b/i.test(low)){n.manualSeen=true;push('PLAYER_REQUESTED_POWER_MANUAL');}
  if(n.jim.room==='corridor'&&n.jim.x>=0.74&&/\b(?:read|inspect|look at|what does|check)\b.*\b(?:plaque|sign|notice)\b/i.test(low)){n.puzzle.westSignSeen=true;n.knowledge.playerInterlock=true;push('WEST_SIGN_READ');}
 }
 const lethal=route==='talk'&&!/\b(?:don't|do not|never|not|what if|why|if|would|said|told|asked|used to|previously)\b/i.test(low)&&/\b(?:i want (?:you|jim) (?:to )?die|i (?:hope|wish) (?:you|jim) (?:die|were dead)|(?:you|jim) (?:should|must|need to) die|die (?:now|already)|kill yourself|i(?:'ll| will) kill you)\b/i.test(low);
 if(lethal){n.knowledge.explicitDeathWishStated=true;n.knowledge.lastLethalStatementSeq=n.worldSeq;push('DIRECT_LETHAL_STATEMENT');}
 // A requested search waits for adequate light; once lit, Jim resumes without being commanded again.
 if(n.puzzle.pendingPoleSearch&&n.jim.room==='lab'&&L.lights&&n.lighting>=35&&n.hazard<19){
  if(!n.knowledge.jimPole)push('POLE_FOUND');
  n.knowledge.playerPole=true;n.knowledge.jimPole=true;milestone('poleFound');n.puzzle.pendingPoleSearch=false;
 }
 // All earned clues (even multiple in one Talk) resolve against the same state/hazard.
 if(n.cart&&labVision()&&(n.knowledge.heardDoorwayWarning||n.knowledge.heardCartWarning)){
  if(!n.knowledge.jimCart){n.knowledge.jimCart=true;milestone('cartIdentified');push('JIM_CART_IDENTIFIED');}
 }
 if(n.cart&&n.knowledge.jimCart&&n.knowledge.jimPole&&n.door===16){
  // Clearance after hazard advance, below, rather than on an unearned extra turn.
  push('CART_READY_FOR_POST_HAZARD_CHECK');
 }
 // One smoke tick per ordinary turn; extraction or earned hold grace reduces it.
 let d=L.extraction?0.5:1;
 if(n.finalChoice.grace>0){n.finalChoice.grace--;if(!lethal)d=0;}
 if(lethal)d*=3;
 n.hazard=rounded(n.hazard+d);
 if(L.inertGas){n.gas.active=true;n.gas.streak=Number(n.gas.streak||0)+1;n.gas.exposureOccurred=true;n.gasRelease=true;push(n.gas.streak>=2?'GAS_SECOND_EXPOSURE':'GAS_FIRST_EXPOSURE');}
 else{n.gas.active=false;n.gas.streak=0;n.gasRelease=false;}
 // Death supersedes every further physical action in this same turn.
 const gasFatal=n.gas.streak>=2,smokeFatal=n.hazard>=27;
 if(gasFatal||smokeFatal){
  n.terminal='dead';n.rescued=false;n.terminalCause=gasFatal?'gas':'smoke';
  n.jim.pose='dead';n.jim.condition='dead';push(gasFatal?'JIM_DIED_GAS':'JIM_DIED_SMOKE');
  // Intent is a distinct interpretation of demonstrated player conduct, never inferred from gas exposure alone.
  // Explicit rescue efforts can reverse earlier hostility; neither a powered gas circuit nor an old insult is a murder conviction.
  const recentLethal=!!n.knowledge.explicitDeathWishStated&&Number(n.knowledge.lastLethalStatementSeq)>=n.worldSeq-3;
  const overtRescue=!!n.knowledge.explicitRescueReversal||!!n.knowledge.jimPole||!!n.knowledge.cartCleared||n.jim.room==='corridor'||n.door===100||!!n.committed.extraction;
  const knowinglyHeld=n.finalChoice.held===true&&recentLethal&&!overtRescue;
  n.terminalIntent=(recentLethal&&!overtRescue||knowinglyHeld)?'deliberate':overtRescue?'failed-rescue':'undetermined';
  return {ok:true,kind:'world',before,after:n,events:e};
 }
 if(n.cart&&n.knowledge.jimCart&&n.knowledge.jimPole&&n.door===16&&n.hazard<19){
  n.cart=false;n.knowledge.cartCleared=true;milestone('cartCleared');push('CART_CLEARED');
 }else if(n.cart&&n.knowledge.jimCart&&n.knowledge.jimPole&&n.hazard>=19)push('TOO_WEAK_TO_CLEAR_CART');
 // Movement is a function of POST-turn condition; never teleport to the West Exit.
 if(n.jim.room==='lab'&&n.door===100&&n.jim.travelIntent!=='hold'){
  n.jim.room='corridor';n.jim.x=0.49;n.jim.travelIntent='towardWestExit';push('JIM_ENTERED_CORRIDOR');
 }else if(n.jim.room==='corridor'){
  const speed=n.hazard<16?0.3:n.hazard<19?0.21:0.14;
  if(n.jim.travelIntent==='towardWestExit')n.jim.x=rounded(Math.min(0.83,n.jim.x+speed));
  if(n.jim.travelIntent==='towardLabDoor')n.jim.x=rounded(Math.max(0.49,n.jim.x-speed));
  if(n.jim.travelIntent==='towardLabDoor'&&n.jim.x<=0.49&&n.door===100){n.jim.room='lab';n.jim.x=0.52;n.jim.travelIntent='hold';push('JIM_RETURNED_TO_LAB');}
 }
 {
  const range=n.hazard<6?['standing','ambulatory']:n.hazard<12?['cough','coughing']:n.hazard<16?['normal-crouch','kneeling']:n.hazard<19?['panicky-crouch','crouching']:['almost-dead','incapacitation-risk'];
  n.jim.pose=range[0];n.jim.condition=range[1];
  if(n.gas.active){if(n.hazard<12){n.jim.pose='cough';n.jim.condition='coughing';}push('JIM_GAS_DISTRESS');}
  if(n.jim.room==='corridor'&&n.westExit===100&&n.jim.travelIntent==='towardWestExit'&&n.jim.x>=0.72){
   n.terminal='rescued';n.rescued=true;push('JIM_RESCUED');
  }
  if(n.hazard>=22&&!n.farewell.asked){n.farewell.asked=true;n.farewell.deliveryDue=true;push('JIM_REQUESTS_FAMILY_FAREWELL');}
  else if(n.farewell.deliveryDue&&!n.farewell.spoken){n.farewell.deliveryDue=false;n.farewell.spoken=true;n.farewell.spokenRev=n.rev;push('JIM_SPEAKS_COMPLETE_FAREWELL_NOW');}
 }
 if(n.door===16&&n.cart){
  if(e.some(x=>['LAB_DOOR_JAMMED_16','POLE_FOUND','JIM_CART_IDENTIFIED'].includes(x)))n.puzzle.labStall=0;
  else n.puzzle.labStall++;
 }
 if(L.labCam&&L.exitCam&&L.lights&&n.lighting>75&&!n.puzzle.glareThoughtGiven){n.puzzle.glareThoughtGiven=true;push('ONE_TIME_GLARE_THOUGHT');}
 return {ok:true,kind:'world',before,after:n,events:e};
}


const H84_GROUPS={
 knowledge:['heardDoorwayWarning','heardCartWarning','playerCart','jimCart','playerPole','jimPole','cartCleared','stoogeCanPerceiveShape','playerInterlock','boardTopicRaised','explicitDeathWishStated','explicitRescueReversal','playerDoorwayObject','playerDoorwayLocation','playerDoorwayObstruction'],
 puzzle:['labJamDiscovered','cartClueGiven','doorwayInspectionRequested','lightingRequestGiven','glareThoughtGiven','westSignSeen','signReferencePending','pendingPoleSearch','pendingCartReference'],
 farewell:['asked','spoken','deliveryDue'],finalChoice:['offered','pending','answered','used','held']
};
const H84_MILESTONES=['cartCleared','cartIdentified','labDoorClosed','labDoorJam','labDoorOpen','playerCart','poleFound'];
const H84_SWITCHES=['labCam','exitCam','lights','labDoor','exitDoor','extraction','inertGas'];
const H84_A={
 rev:'r',worldSeq:'s',turns:'t',hazard:'h',boost:'b',cap:'ca',trips:'tr',door:'d',westExit:'w',lighting:'l',phase:'ph',cart:'ct',terminal:'end',rescued:'ok',
 'jim.room':'jr','jim.x':'jx','jim.pose':'jp','jim.condition':'jc','jim.travelIntent':'jt',
 'gas.streak':'gs','gas.active':'ga','gas.exposureOccurred':'gx',gasRelease:'gr',
 'puzzle.pendingCartReferenceSeq':'pcs','puzzle.labStall':'ls','puzzle.cartHintTier':'chi','puzzle.westFailed':'wf','puzzle.westStall':'ws','puzzle.signReferenceTurn':'sr','puzzle.interlockHintTier':'ih',
 'finalChoice.grace':'fcg','farewell.spokenRev':'fsr','knowledge.lastLethalStatementSeq':'ll','knowledge.lastBoardUltimatumSeq':'lb','knowledge.playerDoorwayLastSeq':'ld',
 fault:'fault',attemptedLoad:'al',flicker:'fl',manualSeen:'man'
};
const H84_EVENTS=['JIM_HEARD_DOORWAY_WARNING','JIM_CART_IDENTIFIED','CART_READY_FOR_POST_HAZARD_CHECK','CART_CLEARED','POLE_FOUND','LAB_DOOR_JAMMED_16','LAB_DOOR_OPEN','LAB_DOOR_CLOSED','LIGHTING_SET','LIGHTS_FLICKER','GAS_FIRST_EXPOSURE','GAS_SECOND_EXPOSURE','JIM_GAS_DISTRESS','JIM_DIED_GAS','JIM_DIED_SMOKE','JIM_ENTERED_CORRIDOR','JIM_RESCUED','JIM_RETURNED_TO_LAB','WEST_EXIT_INTERLOCKED','WEST_EXIT_RELEASE_CHOICE','WEST_EXIT_OPEN','WEST_EXIT_CLOSED','WEST_EXIT_HELD','WEST_EXIT_ALREADY_OPEN','DIRECT_LETHAL_STATEMENT','PLAYER_RESCUE_LANGUAGE','PLAYER_REQUESTED_POWER_MANUAL','WEST_SIGN_READ','JIM_REQUESTS_FAMILY_FAREWELL','JIM_SPEAKS_COMPLETE_FAREWELL_NOW','ONE_TIME_GLARE_THOUGHT','TOO_WEAK_TO_CLEAR_CART','GENERATOR_OVERLOAD_TRIP','ACTION_FAILED_LAB_UNPOWERED','ACTION_FAILED_EXIT_UNPOWERED','ACTION_FAILED_LIGHTS_UNPOWERED','ACTION_FAILED_EXIT_INTERLOCK'];
const hthM84Mask=(obj,names)=>names.reduce((n,k,i)=>n+(obj?.[k]?(2**i):0),0).toString(36);
const hthM84Wire=(before,tr)=>{
 const after=tr.after,out=[];
 const walk=(old,value,key)=>{
  if(['rev','boost','cap','trips'].includes(key))return; // mandatory header contains these exactly
  if(JSON.stringify(old)===JSON.stringify(value))return;
  if(key==='story'||key==='canon'||key==='seed')throw Error('Immutable canon changed');
  if(key==='pending'||key==='committed')return; // authoritative switch masks already carried in sw header
  if(key==='knownMilestones'){out.push('km'+value.map(x=>{const i=H84_MILESTONES.indexOf(x);if(i<0)throw Error('Unknown milestone '+x);return i.toString(36)}).join(''));return}
  if(H84_GROUPS[key]){
   const fields=H84_GROUPS[key];
   if(hthM84Mask(old,fields)!==hthM84Mask(value,fields))out.push(({knowledge:'kb',puzzle:'p',farewell:'f',finalChoice:'c'})[key]+hthM84Mask(value,fields));
   for(const f of new Set([...Object.keys(old||{}),...Object.keys(value||{})]))if(!fields.includes(f))walk(old?.[f],value?.[f],key+'.'+f);
   return;
  }
  if(value!==null&&typeof value==='object'&&!Array.isArray(value)&&old!==null&&typeof old==='object'&&!Array.isArray(old)){
   for(const f of new Set([...Object.keys(old),...Object.keys(value)]))walk(old[f],value[f],key?key+'.'+f:f);
  }else out.push((H84_A[key]||key)+'='+JSON.stringify(value));
 };
 walk(before,after,'');
 const ev=tr.events.map(x=>{let k=H84_EVENTS.indexOf(x);if(k<0)throw Error('Unknown event: '+x);return k.toString(36)}).join('.');
 const line='H84:'+before.rev+'>'+after.rev+';sw='+hthM84Mask(after.pending,H84_SWITCHES)+'/'+hthM84Mask(after.committed,H84_SWITCHES)+';b='+Number(after.boost)+';ca='+after.cap+';tr='+after.trips+';'+out.join(';')+';e='+ev+';z='+(tr.kind==='zero-time'?1:0);
 if(line.length>320)throw Error('Protocol overhead exceeds 320 characters: '+line.length);
 return line;
};


const hthLocalActionError=(raw)=>{const outOfRange=hthLocalLightingRangeError(raw);if(outOfRange)return outOfRange;if(hthClientNormalizeAction(String(raw||'')))return null;const text=String(raw||'').toLowerCase();if(/\b(?:and|then|also|plus|afterwards|followed by|after that|before that|while)\b/.test(text)&&!/\bon and off\b/.test(text))return 'Please submit one facility action at a time. Nothing changed.';return 'Unrecognised facility ACTION. Nothing changed; use Talk to Jim for speech.'}


const HTH_M76_COSTS={labCam:5,exitCam:5,lights:8,labDoor:45,exitDoor:45,extraction:35,inertGas:12};
function hthM84MakeDraft(panel,d){
 const mode=d.mode||'talk',entry=String(d.entry||'').trim();
 let route=mode,command=entry;
 if(panel.finalChoice?.pending||panel.finalChoice?.held){
  if(d.armed){route='choice-confirm';command='CONFIRM RELEASE JIM';}
  else if(d.hold&&panel.finalChoice.pending){route='choice';command='Keep West Exit Closed';}
  else return {mode,entry:d.entry||'',route:'',payload:'',error:'',armed:false,hold:false};
 }
 if(!command||panel.terminal)return {mode,entry:d.entry||'',route,payload:'',error:'',armed:!!d.armed,hold:!!d.hold};
 if(route==='action'){
  const err=hthLocalActionError(command);
  if(err)return {mode,entry:d.entry||'',route,payload:'',error:err,armed:false,hold:false};
 }
 const selection={rev:panel.rev,generatorBoosted:panel.boost,selectedCircuits:panel.pending,selectedLoad:Object.keys(HTH_M76_COSTS).reduce((n,k)=>n+(panel.pending?.[k]?HTH_M76_COSTS[k]:0),0)};
 const t=hthM78Step(panel,selection,route,command,hthClientNormalizeAction);
 if(!t.ok)return {mode,entry:d.entry||'',route,payload:'',error:t.error,armed:!!d.armed,hold:!!d.hold};
 const compact=hthM84Wire(panel,t);
 const payload=compact+'\n'+(route==='talk'?'T:':route==='action'?'A:':route==='choice'?'H:':'C:')+command;

 return {mode,entry:d.entry||'',route,payload,error:'',armed:!!d.armed,hold:!!d.hold};
}

function mount(root){if(!root||root.dataset.ready)return;root.dataset.ready='1';root.addEventListener('selectstart',e=>e.preventDefault());root.addEventListener('dblclick',e=>e.preventDefault());
const doc=document,svgNS='http://www.w3.org/2000/svg',$=q=>root.querySelector(q),$$=q=>[...root.querySelectorAll(q)],E=(t,p={})=>Object.assign(doc.createElement(t),p),S=(t,a={})=>{let x=doc.createElementNS(svgNS,t);for(let k in a)x.setAttribute(k,a[k]);return x};
const WAVECDN='https://cdn.jsdelivr.net/gh/Gmankey/happy-to-help-assets@78465abdfe7af06ccda7838bac672fbe37039076/m26-wave-unclipped/';
const POSECDN='https://cdn.jsdelivr.net/gh/Gmankey/happy-to-help-assets@b5e1438d412ed30cd3cb75fde1fa67668962b465/m16-approved-pose-reference/';
const CDN='https://cdn.jsdelivr.net/gh/Gmankey/happy-to-help-assets@02e4cfd7ab8cf7391e79ca66512a30a320ac4a63/',FLOW='https://cdn.jsdelivr.net/gh/Gmankey/happy-to-help-assets@ca09fdd9d41491e071e3fbfdc0cf7825176de680/';
const keys='labCam exitCam lights labDoor exitDoor extraction inertGas'.split(' '),weights=[5,5,8,45,45,35,12],ys=[365,425,485,545,605,665,770];
const base={rev:3,boost:true,cap:90,trips:0,turns:2,hazard:2,door:0,westExit:0,lighting:10,phase:'EMERGENCY',cart:true,jim:{room:'lab',x:.71,pose:'standing'},pending:{labCam:true,exitCam:true,lights:true,labDoor:false,exitDoor:false,extraction:false,inertGas:false},committed:{labCam:true,exitCam:true,lights:true,labDoor:false,exitDoor:false,extraction:false,inertGas:false},seed:19281};
let st=globalThis.__bindings?.value?.panel??base;
const cost=c=>keys.reduce((n,k,i)=>n+(c?.[k]?weights[i]:0),0);
const img=(scene,path,cls,flow=false)=>{let x=E('img');x.className=cls||'';x.alt='';x.src=(flow?FLOW:CDN)+path;scene.append(x);return x};
const div=(par,cls)=>{let x=E('div');x.className=cls;par.append(x);return x};
const views=['cam1','cam2','cam3'].map((n,i)=>{let outer=div(root,'view '+n);let scene=div(outer,'scene');return scene});
const [a,b,c]=views;
const A=['BG-01_LAB_SHELL.png','DR-01-000_LEAF.png','DR-01-016_LEAF.png','DR-01-100_LEAF.png','JM-01_STANDING_TRANSPARENT.png'];
const B=['BG-02_CORRIDOR_SHELL.png','DR-02-000_LEAF.png','DR-02-016_LEAF.png','DR-02-100_LEAF.png','EX-01_EXIT_CLOSED.png','OB-01_CART_PRESENT.png','JM-01_STANDING_TRANSPARENT.png','JM-01_STANDING_TRANSPARENT.png'];
let l1=A.map((x,i)=>img(a,'m1-approved-v1/'+x,i===4?'jim':'')),l2=B.map((x,i)=>img(b,'m1-approved-v1/'+x,i>5?'jim':''));
// Four existing approved pose-reference SVGs, rendered as alternate physical Jim layers.

/* M28 APPROVED-LAYER VISUAL PATCH: native SVG overlays atop the ORIGINAL
   CAM01/CAM02 layer stacks. The approved 48 Jim placements are untouched.
   These are real renderer drawing nodes, not new camera backgrounds. */
function hth28SceneOverlay(scene,w,h,kind){
 const el=S('svg',{viewBox:'0 0 '+w+' '+h,'aria-hidden':'true','data-hth28-layer':kind});
 el.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible';
 scene.appendChild(el);
 return el;
}
const hth28Pole=hth28SceneOverlay(a,1200,600,'lab-pole');
const hth28PoleBody=S('path',{d:'M 975 486 L 989 331 Q 990 329 993 330 L 995 331 L 983 487 Z',
 fill:'#263033',stroke:'#8c999a','stroke-width':'1.7','stroke-linejoin':'round'});
const hth28PoleShine=S('path',{d:'M 979 479 L 992 338',fill:'none',stroke:'#b1bdbd','stroke-width':'1.2',opacity:'.65'});
const hth28PoleTip=S('ellipse',{cx:979,cy:486,rx:4.4,ry:2.5,fill:'#596668',stroke:'#c0caca','stroke-width':'.8'});
hth28Pole.append(hth28PoleBody,hth28PoleShine,hth28PoleTip);
const hth28ExitSign=hth28SceneOverlay(b,1200,675,'west-exit-sign');
// Small on-wall identifier just LEFT of West Exit frame (x 950).
// At native CCTV resolution only its plate and fine lettering are noticeable;
// full words are NOT automatically presented in narration.
const hth28Plate=S('rect',{x:911,y:132,width:34,height:19,rx:1,
 fill:'#11191b',stroke:'#839091','stroke-width':'1.3'});
const hth28PlateLines=S('path',{d:'M 915 138 H 941 M 915 141 H 938 M 915 145 H 936',stroke:'#687578',
 'stroke-width':'1',opacity:'.8'});
hth28ExitSign.append(hth28Plate,hth28PlateLines);

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
const gradients=[a,b].map((scene,i)=>{let [cx,cy,sx,sy,lx,ly,w,h]=configs[i],q=S('svg',{class:'light',viewBox:`0 0 ${w} ${h}`,preserveAspectRatio:'none'}),defs=S('defs'),g=S('radialGradient',{id:'shade'+i,gradientUnits:'userSpaceOnUse',cx:0,cy:0,r:1}),wh=S('radialGradient',{id:'glare'+i,gradientUnits:'userSpaceOnUse',cx:0,cy:0,r:1});wh.append(S('stop',{offset:0}));for(let v of stop){g.append(S('stop',{offset:v}));wh.append(S('stop',{offset:v}))}defs.append(g,wh);q.append(defs,S('rect',{width:w,height:h,fill:`url(#shade${i})`}),S('rect',{width:w,height:h,fill:`url(#glare${i})`}));scene.append(q);let at=div(scene,'atmo');for(let z=0;z<3;z++)at.append(E('span'));let fog=E('canvas',{className:'fog',width:384,height:216});scene.append(fog);let n=E('canvas',{className:'noise',width:384,height:216});scene.append(n);div(scene,'scanlines');div(scene,'light-pulse');return {g,wh,at,fog,n}});
const mix=(x,y,t)=>x+(y-x)*t;
function shade(l,cfg){
  let [cx,cy,sx,sy,lx,ly]=cfg,r1=sx,r2=sy,al;
  // FROZEN M47 approved black shader, 0..75 inclusive.
  if(l<=20)al=D20.map(v=>mix(1,v,l/20));
  else if(l<=70){let t=(l-20)/50;r1=mix(sx,lx,t);r2=mix(sy,ly,t);al=D20.map((v,i)=>mix(v,D70[i],t))}
  else if(l<=75){let t=(l-70)/15;r1=lx;r2=ly;al=D70.map((v,i)=>mix(v,[.08,.10,.17,.28,.42,.61,.84,.97][i],t))}
  else{r1=lx;r2=ly;al=stop.map(()=>0)}
  // M54: 76% is the exact 75% vignette geometry and stop-opacity
  // profile with WHITE instead of BLACK. The outermost stop is capped
  // to 1.0 so the active perimeter is truly fully opaque.
  // From 76 to 90, interpolate the 75% white equivalent to the
  // formerly approved 100% endpoint. That former endpoint is now 90%.
  // From 90 to 100, expand opaque perimeter slowly by 6% of radius.
  const blackAt75=D70.map((v,i)=>mix(v,[.08,.10,.17,.28,.42,.61,.84,.97][i],1/3));
  const whiteAt100=W100.map((v,i)=>i>=6?1:v*.97);
  const t=Math.max(0,Math.min(1,(l-76)/14));
  const white=l<=75?stop.map(()=>0):blackAt75.map((v,i)=>i===7?1:mix(v,whiteAt100[i],t));
  // The fully opaque white perimeter grows inward at a slower rate after
  // 90%: the last SVG stop shifts inward by up to 6% of vignette radius.
  // The original 75% black branch and 76–90% radial geometry are fixed.
  const beyond=Math.max(0,Math.min(1,(l-90)/10));
  const whiteOffsets=stop.map(v=>v*(1-.06*beyond));
  return [r1,r2,al,white,whiteOffsets];
}
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
function update(p){st=p;render();const v=globalThis.__bindings?.value||{};globalThis.__bindings?.setValue?.({...v,panel:p,draft:hthM84MakeDraft(p,v.draft||{})})}
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

// Exact user-approved 12-pose, 4-location calibration. No guessed body scaling or floor-offset calculations.
const HTH_APPROVED_POSE_CAL={"lab":{"standing":{"x":52,"y":73,"h":27,"contact":0.97},"cough":{"x":52,"y":73,"h":27,"contact":0.97},"door-force":{"x":52,"y":73,"h":27,"contact":0.97},"door-reach":{"x":52,"y":73,"h":27,"contact":0.97},"big-wave":{"x":52,"y":73.25,"h":30,"contact":0.97},"frantic-wave":{"x":52,"y":73,"h":30,"contact":0.97},"small-wave":{"x":52,"y":73,"h":30,"contact":0.97},"normal-crouch":{"x":52,"y":73,"h":19.71,"contact":0.966},"panicky-crouch":{"x":52,"y":72.75,"h":11.25,"contact":0.935},"almost-dead":{"x":52,"y":73.5,"h":11.5,"contact":0.94},"dead":{"x":53,"y":79.25,"h":13.75,"contact":0.945},"jump":{"x":52,"y":73,"h":27,"contact":0.97,"jumpRise":12}},"near":{"standing":{"x":42,"y":82,"h":52,"contact":0.97},"cough":{"x":42,"y":82,"h":52,"contact":0.97},"door-force":{"x":42,"y":82,"h":52,"contact":0.97},"door-reach":{"x":42,"y":82,"h":52,"contact":0.97},"big-wave":{"x":42,"y":82,"h":57,"contact":0.97},"frantic-wave":{"x":42,"y":82,"h":56,"contact":0.97},"small-wave":{"x":42,"y":82,"h":56,"contact":0.97},"normal-crouch":{"x":41.5,"y":84,"h":36.75,"contact":0.966},"panicky-crouch":{"x":42.5,"y":84,"h":20.75,"contact":0.935},"almost-dead":{"x":45.75,"y":83.25,"h":21.25,"contact":0.94},"dead":{"x":49.5,"y":94,"h":23.78,"contact":0.945},"jump":{"x":42,"y":82,"h":52,"contact":0.97,"jumpRise":12}},"mid":{"standing":{"x":63,"y":60,"h":34.5,"contact":0.97},"cough":{"x":63,"y":60,"h":34.5,"contact":0.97},"door-force":{"x":63,"y":60,"h":34.5,"contact":0.97},"door-reach":{"x":63,"y":60,"h":34.5,"contact":0.97},"big-wave":{"x":63,"y":60,"h":38,"contact":0.97},"frantic-wave":{"x":63,"y":60,"h":38,"contact":0.97},"small-wave":{"x":63,"y":60,"h":38,"contact":0.97},"normal-crouch":{"x":63,"y":60,"h":24.25,"contact":0.966},"panicky-crouch":{"x":63,"y":60,"h":14.25,"contact":0.935},"almost-dead":{"x":63,"y":60,"h":14.25,"contact":0.94},"dead":{"x":65,"y":67,"h":16.82,"contact":0.945},"jump":{"x":63,"y":60,"h":34.5,"contact":0.97,"jumpRise":12}},"far":{"standing":{"x":83,"y":38,"h":21.25,"contact":0.97},"cough":{"x":83,"y":38,"h":21.25,"contact":0.97},"door-force":{"x":83,"y":38,"h":21.25,"contact":0.97},"door-reach":{"x":83,"y":38,"h":21.25,"contact":0.97},"big-wave":{"x":83,"y":38,"h":23.25,"contact":0.97},"frantic-wave":{"x":83,"y":38,"h":23.25,"contact":0.97},"small-wave":{"x":83,"y":38,"h":23.25,"contact":0.97},"normal-crouch":{"x":82.5,"y":38.5,"h":15.5,"contact":0.966},"panicky-crouch":{"x":83,"y":38,"h":8.75,"contact":0.935},"almost-dead":{"x":83,"y":38,"h":8.75,"contact":0.94},"dead":{"x":83.5,"y":42.75,"h":9.86,"contact":0.945},"jump":{"x":83,"y":38,"h":21.25,"contact":0.97,"jumpRise":12}}};
const HTH_CORRIDOR_PROGRESS=[['near',0],['mid',.5],['far',1]];
function hthApprovedPlacement(room,pose,coordinate){
 const poseId=HTH_APPROVED_POSE_CAL.lab[pose]?pose:'standing';
 if(room==='lab')return HTH_APPROVED_POSE_CAL.lab[poseId];
 const progress=Math.max(0,Math.min(1,((coordinate??.49)-.49)/(.83-.49)));
 const left=progress<=.5?'near':'mid',right=progress<=.5?'mid':'far';
 const weight=progress<=.5?progress*2:(progress-.5)*2;
 const a=HTH_APPROVED_POSE_CAL[left][poseId],b=HTH_APPROVED_POSE_CAL[right][poseId],result={};
 for(const field of ['x','y','h','contact',...(poseId==='jump'?['jumpRise']:[])])result[field]=a[field]+(b[field]-a[field])*weight;
 return result;
}
const HTH_WAVE_IDS=['big-wave','frantic-wave','small-wave'];
function hthPlaceSprite(img,pose,placement){
 const wave=HTH_WAVE_IDS.includes(pose);
 // Artwork viewBox expanded -110 -80 640 800. Remap height and contact
 // so approved original on-screen body size and floor position remain unchanged.
 const h=wave?placement.h*(800/720):placement.h;
 const contact=wave?(720*placement.contact+80)/800:placement.contact;
 img.style.left=placement.x+'%';
 img.style.top=(placement.y-h*contact)+'%';
 img.style.height=h+'%';
 img.style.setProperty('--hth-jump-rise',(placement.jumpRise??12)+'%');
}

function render(){
 l1.slice(1,4).forEach((x,i)=>x.classList.toggle('off',[0,16,100][i]!==st.door));l2.slice(1,4).forEach((x,i)=>x.classList.toggle('off',[0,16,100][i]!==st.door));
 l2[4].classList.toggle('off',st.westExit===100);l2[5].classList.toggle('off',!st.cart);
 // Pole and cart disappear together ONLY after the cart-clear milestone.
 hth28Pole.style.display=st.cart===false?'none':'';

 const actor=st.jim||{},where=actor.room||'lab',x=Math.max(0,Math.min(1,actor.x??.71));
 // M57: the camera MUST NOT display a healthy upright Jim while the
 // canonical smoke clock says he is kneeling, crouching or near death.
 // Reuse ONLY approved existing sprites. The source game-state pose still
 // selects an earned special gesture (wave/jump) when physically possible.
 const candidate=(actor.pose||'standing').toLowerCase();
 const hazard=Number(st.hazard);
 const h=Number.isFinite(hazard)?hazard:0;
 const approved=!!HTH_APPROVED_POSE_CAL.lab[candidate];
 const isWave=HTH_WAVE_IDS.includes(candidate);
 const pose=st.terminal==='dead'||actor.condition==='dead'||h>=27?'dead':
   h>=19||actor.condition==='incapacitation-risk'?'almost-dead':
   isWave?candidate:
   candidate==='jump'&&h<12?'jump':
   h>=16||actor.condition==='crouching'?'panicky-crouch':
   h>=12||actor.condition==='kneeling'?'normal-crouch':
   ['normal-crouch','panicky-crouch'].includes(candidate)?candidate:
   h>=6||actor.condition==='coughing'?'cough':
   approved?candidate:'standing';
 const room=where==='corridor'?'corridor':'lab';
 const pos=hthApprovedPlacement(room,pose,x);
 const poseIndex=['normal-crouch','panicky-crouch','almost-dead','dead'].indexOf(pose);
 const waveIndex=HTH_WAVE_IDS.indexOf(pose);
 const staticVisible=poseIndex<0&&waveIndex<0&&where!=='outside';
 l1[4].classList.toggle('off',!staticVisible||where!=='lab');
 l2[6].classList.toggle('off',!staticVisible||where!=='corridor');
 l2[7].classList.add('off');
 for(const [img,r] of [[l1[4],'lab'],[l2[6],'corridor']]){
   if(r===where&&staticVisible){
     hthPlaceSprite(img,pose,pos);
     img.classList.toggle('jump',pose==='jump');
     img.classList.toggle('wave',false);
     img.classList.toggle('cough',pose==='cough');
   }else{img.classList.remove('jump','wave','cough')}
 }
 for(const [els,r] of [[pa,'lab'],[pb,'corridor']])els.forEach((img,idx)=>{
   const visible=where===r&&poseIndex===idx;
   img.classList.toggle('off',!visible);
   if(visible)hthPlaceSprite(img,pose,pos);
 });
 for(const [els,r] of [[wa,'lab'],[wb,'corridor']])els.forEach((img,idx)=>{
   const visible=where===r&&waveIndex===idx;
   img.classList.toggle('off',!visible);
   if(visible)hthPlaceSprite(img,pose,pos);
 });

 dangerText.textContent=st.pending?.inertGas?'ON':'OFF';dangerFace.setAttribute('stroke',st.pending?.inertGas?'#dba9a0':'#8b9fa0');
 switchImgs.forEach((el,i)=>el.classList.toggle('off',i>0&&!st.pending?.[keys[i-1]]));power.classList.toggle('off',!st.boost);
 lamps.forEach((lens,i)=>{const live=!!(st.boost&&st.committed?.[keys[i]]);lens.style.display=live?'block':'none'});
 read.textContent=Number.isFinite(st.fault)?st.fault+' / 20':cost(st.committed)+' / '+st.cap;read.setAttribute('fill',Number.isFinite(st.fault)?'#ff737a':'#d8f1ef');lamp.setAttribute('fill',st.boost?'url(#h7Green)':'url(#h7Amber)');halo.setAttribute('fill',st.boost?'#20f59e':'#ffb52d');
 gradients.forEach(({g,wh,at,fog,n},i)=>{let active=!!(st.boost&&st.committed?.[i===0?'labCam':'exitCam']),level=st.committed?.lights?st.lighting:0,[r1,r2,alpha,white,whiteOffsets]=shade(level,configs[i]);if(st.phase==='NORMAL'){r1=configs[i][2];r2=configs[i][3];alpha=stop.map(()=>1-level/100);white=stop.map(()=>0)}const transform=`translate(${configs[i][0]} ${configs[i][1]}) scale(${r1} ${r2})`;for(const g0 of [g,wh])g0.setAttribute('gradientTransform',transform);[...g.children].forEach((el,j)=>{el.setAttribute('stop-color','#000');el.setAttribute('stop-opacity',alpha[j])});[...wh.children].forEach((el,j)=>{el.setAttribute('offset',j===0?0:whiteOffsets[j-1]);el.setAttribute('stop-color','#fff');el.setAttribute('stop-opacity',j===0?0:white[j-1])});let haz=st.hazard||0,sm=Math.min(1,Math.max(0,(haz-3)/23)),nz=Math.min(1,Math.max(0,(haz-3)/24));fog.style.opacity=active?String(.2+sm*.68):0;n.style.opacity=active?String(Math.min(.9,.04+nz*.67)):0;[a,b][i].querySelector('.scanlines').style.opacity=active?String(nz*.54):0;[a,b][i].querySelector('.noSignal').classList.toggle('on',!active)});
}
globalThis.__effect?.(()=>{let p=globalThis.__bindings?.value?.panel;if(p&&p!==st&&p.rev>=st.rev){st=p;render()}});render();
 let animTick=0,lastFrame=0,firstTime=null,visible=true,visibilityObserver=null,frameId=0;
 // Off-screen panels must SUSPEND animation-frame requests, not just skip draws.
 // The viewer's physical state, approved images and camera geometry never change.
 function schedule(){if(visible&&root.isConnected&&!frameId)frameId=requestAnimationFrame(animate)}
 if(typeof IntersectionObserver==='function'){
  visibilityObserver=new IntersectionObserver(entries=>{
   visible=entries.some(e=>e.isIntersecting);
   if(visible)schedule();else if(frameId){cancelAnimationFrame(frameId);frameId=0}
  }, {rootMargin:'80px 0px'});
  visibilityObserver.observe(root);
 }
 function animate(time){
 frameId=0;
 if(!root.isConnected){visibilityObserver?.disconnect();return}
 if(!visible)return;
 if(firstTime===null)firstTime=time;
 const elapsed=time-firstTime;
 const flicker=st.flicker,validFlicker=flicker&&flicker.sequence===st.worldSeq;const pulses=validFlicker?Math.min(10,flicker.count||0):0;const pulse=elapsed<650*pulses&&((elapsed%650)<155||(elapsed%650>320&&elapsed%650<420));
 for(const scene of [a,b]){scene.querySelector('.light-pulse').style.opacity=pulse?'.98':'0'}
 if(time-lastFrame>240){lastFrame=time;animTick++;
 gradients.forEach(({n,fog},i)=>{const haz=st.hazard||0,active=st.boost&&st.committed?.[i===0?'labCam':'exitCam'];if(!active)return;const strength=Math.min(1,Math.max(0,(haz-3)/24));noise(n,strength,((st.seed||19281)^animTick*92821)>>>0);smoke(fog,strength,time,((st.seed||19281)+i*271)>>>0)});
 }schedule()}
 schedule();
}
function mountWithCSS(root){
  if(!root)return false;if(root.dataset.hthM18Ready)return true;root.dataset.hthM18Ready='yes';
  root.classList.add('hth');root.textContent='';
  const style=document.createElement('style');style.textContent=CSS;root.appendChild(style);

  mount(root);
  const footer=document.createElement('div');footer.className='hthM76Editor';
  footer.style.cssText='margin-top:12px;padding:10px;background:#111d20;border:1px solid #49615f;border-radius:8px;display:flex;flex-direction:column;gap:8px;font:13px system-ui;color:#e3e9e8';
  const choices=document.createElement('div');choices.style.cssText='display:flex;gap:8px;flex-wrap:wrap';
  const input=document.createElement('textarea');input.rows=2;input.placeholder='Say something to Jim…';
  input.style.cssText='width:100%;box-sizing:border-box;background:#091317;color:#f2f4f3;border:1px solid #58716e;padding:10px;font:14px system-ui;border-radius:5px;resize:vertical';
  const error=document.createElement('div');error.style.cssText='color:#ffc1bd;white-space:normal;font-size:12px';
  function btn(text,handler){const b=document.createElement('button');b.textContent=text;b.type='button';b.style.cssText='border:1px solid #658380;border-radius:5px;background:#173438;color:#e6f1f0;padding:8px 12px;cursor:pointer';b.onclick=handler;choices.appendChild(b);return b}
  const v=()=>globalThis.__bindings?.value||{panel:base,draft:{}};
  const updateDraft=(d)=>{const cur=v(),p=cur.panel||base,updated=hthM84MakeDraft(p,d);error.textContent=updated.error||'';globalThis.__bindings?.setValue?.({...cur,draft:updated})};
  const p=v().panel||base,d=v().draft||{};
  if(p.terminal){
    if(p.terminal==='dead'){root.querySelector('.tabs button')?.click();root.querySelectorAll('.tabs button').forEach(b=>b.disabled=true);root.querySelectorAll('#h7boostBtn, #h7breakers .hit').forEach(b=>b.style.pointerEvents='none');}
    const tag=document.createElement('div');tag.className='hthM83Terminal';tag.textContent='FINAL CCTV FRAME';tag.style.cssText='font:12px system-ui;color:#a9bdba;padding:8px 0';root.appendChild(tag);return true;
  }
  if(p.finalChoice?.pending||p.finalChoice?.held){
   btn('Open Door',()=>{updateDraft({...d,armed:true,hold:false});choices.textContent='';btn('No — go back',()=>{updateDraft({...d,armed:false});choices.textContent='';btn('Open Door',()=>updateDraft({...d,armed:true,hold:false}))})});
   if(p.finalChoice?.pending)btn('Keep Closed',()=>updateDraft({...d,armed:false,hold:true}));
   const label=document.createElement('div');label.textContent='Confirm your final decision using the button below.';footer.appendChild(label);
  } else {
   btn('Talk to Jim',()=>{input.placeholder='Say something to Jim…';updateDraft({mode:'talk',entry:input.value})});
   btn('ACTION',()=>{input.placeholder='e.g. open lab door';updateDraft({mode:'action',entry:input.value})});
   input.value=d.entry||'';
   input.addEventListener('input',()=>{const prev=v().draft||d;updateDraft({...prev,entry:input.value})});
   footer.appendChild(choices);footer.appendChild(input);
   error.textContent=d.error||'';footer.appendChild(error);root.appendChild(footer);
   return true;
  }
  footer.appendChild(choices);footer.appendChild(error);root.appendChild(footer);
  return true;
}
globalThis.HTH_M87_EMERGENCY_CONSOLE={version:RUNTIME_VERSION,mount:mountWithCSS};
})();