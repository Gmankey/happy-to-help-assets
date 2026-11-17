# HAPPY TO HELP — M90 v8 NATIVE PLAYER RESPONSE CONTRACT
<!-- HTH_M90_V8_PLAYER_RESPONSE_TEMPLATE_OK -->

**Purpose:** This is a developer-only output template for Stage 9. It is not itself a game turn. Preserve complete actual panel values when filling __FULL_PANEL_JSON__, never an invented state. The approved CCTV renderer is sourced only from pinned GitHub commit 2b5ed8e7f3a55d10279e1f6c423642f7a1a3fe70. This Stage 9 prototype is not the full ten-stage integrated master.

## Hard rules — no exceptions

1. Output **only** one JIM audible speech, one AI first-person THOUGHT PROCESS, one approved CCTV widget, and the correct live player input/decision controls. On terminal death use the contract's final-words/frozen-camera sequence. The spoken/text fields below are the ONLY authored prose in an ordinary living turn.
2. Never show DEV/QA metadata, rev, world sequence, hazard number, x coordinate, door percentage, cart/pole flags, reducer event, private failure cause, diagnostic status strip, red guessed errors, extra banners, or hints. State stays in DIL local bindings and deterministic reducer, not printed as prose.
3. Before authoring the turn, run hthM90Step or H90_CHOICE's hthM90ApplyChoicePacket with the prior full panel and validate hthM90Present(jimSpeech, thought, events). Never invent physics or display diagnostic event labels. Stage 9 silent physics and voice are independently checked.
4. Approved CCTV art/positions and its 7 switch controls are immutable. Pending switches are local zero-time edits. Only accepted normal Talk/ACTION causes ordinary smoke progression.
5. If finalChoice.pending=true, the ChatGPT-native **Yes — Open Door** and **No — Keep Closed** buttons appear adjacent immediately under CCTV, and there is no normal Send button. If finalChoice.held=true after No, restore Talk/ACTION and show reversible **Open Door — Release Jim**.
6. Final decisions use H90_CHOICE packet, validated by the exact v7 engine helper; the final choice is zero-time and never commits new circuitry. The "yes" branch never overrides a missing powered West Exit circuit or an open Lab Door.
7. Do not prepend or append any developer commentary or interface instructions to a game turn. Any invalid/lost renderer mounts report only real load errors inside the widget, not invented gameplay errors. If final/terminal, preserve original story stopping rituals and no unsolicited reports.

## Canonical DIL response — fill only three placeholders

Replace __FULL_PANEL_JSON__ with exactly the complete previous panel plus latest deterministic transition. Replace __JIM_SPOKEN__ with validated, audible Jim speech and __AI_PRIVATE_THOUGHT__ with a validated single first-person thought. Both are JavaScript string literals escaped correctly. The fatal-turn exception also fills __JIM_FINAL_WORDS__. Do not insert visible metadata.

~~~dil
{@body const [ui,setUi]=DIL.useState({panel:__FULL_PANEL_JSON__,draft:{mode:"talk",entry:"",payload:"",error:""}})}
{@body const hthDraft={jim:__JIM_SPOKEN__,stooge:__AI_PRIVATE_THOUGHT__,lastWords:__JIM_FINAL_WORDS__}}
{@body const hthM90ChoicePacket=(p,choice)=>{
 const costs={labCam:5,exitCam:5,lights:8,labDoor:45,exitDoor:45,extraction:35,inertGas:12};
 const load=Object.entries(costs).reduce((sum,[key,cost])=>sum+(p.pending?.[key]?cost:0),0);
 return 'H90_CHOICE:'+JSON.stringify({rev:p.rev,choice,boost:p.boost,switches:p.pending,load});
}}
{#if !ui.panel.terminal}
**JIM:** {hthDraft.jim}

<text strong>{ui.panel.story?.AI_NAME || "AI"} // THOUGHT PROCESS</text> {hthDraft.stooge}
{/if}
{#if ui.panel.terminal==='dead'}
**JIM:** {hthDraft.lastWords}
{/if}
{#if !ui.panel.terminal || ui.panel.terminal==='dead'}
<AppBlock title="HAPPY TO HELP — CCTV" bind={{value:ui,setValue:setUi}}>
<div class="hth" data-hth-m83-root data-hth-boot="pending" style="background:#0d1416;color:#d8e7e5;border:1px solid #49615f;padding:10px;border-radius:8px;font:12px system-ui">Emergency CCTV loading…</div>
<script>
(()=>{const r=document.currentScript?.previousElementSibling;if(!r)return;
 const ver='HTH_M90_MEANING_FIRST_v8';
 const urls=['https://cdn.jsdelivr.net/gh/Gmankey/happy-to-help-assets@2b5ed8e7f3a55d10279e1f6c423642f7a1a3fe70/m90-semantic-poc/renderer_meaning_first_v1.js','https://raw.githubusercontent.com/Gmankey/happy-to-help-assets/2b5ed8e7f3a55d10279e1f6c423642f7a1a3fe70/m90-semantic-poc/renderer_meaning_first_v1.js'];
 const mark=s=>r.dataset.hthBoot=s;
 function fail(reason){mark(reason);r.textContent='CCTV LOAD ERROR — '+reason+'. No game turn consumed.';const b=document.createElement('button');b.textContent='Retry CCTV';b.onclick=()=>{delete r.dataset.hthM18Ready;delete r.dataset.ready;load(0)};r.appendChild(b)}
 function mount(){try{
  const runtime=globalThis.HTH_M90_EMERGENCY_CONSOLE;
  if(runtime?.version!==ver||!runtime.mount(r))return fail('mount-failed');
  const state=globalThis.__bindings?.value?.panel;
  const expected=state?.terminal?'.hthM83Terminal':state?.finalChoice?.pending?'.tabs':'.hthM76Editor';
  if(!r.querySelector(expected))return fail('controls-missing');
  mark('ready');
 }catch(e){fail('mount-threw')}}
 function load(i){mark('loading');if(globalThis.HTH_M90_EMERGENCY_CONSOLE?.version===ver)return mount();if(i>=urls.length)return fail('script-unavailable');
  const script=document.createElement('script');script.src=urls[i];script.async=true;script.onload=mount;script.onerror=()=>load(i+1);document.head.appendChild(script);
 }
 load(0);
})();
</script>
</AppBlock>
{/if}
{#if ui.panel.finalChoice?.pending && !ui.panel.terminal}
<box border radius="lg" padding={3} gap={2}>
  <text strong>WEST EXIT — CONFIRM YOUR DECISION</text>
  <text size="sm">Jim is waiting at the sealed exit. Either choice takes effect immediately, without another smoke turn.</text>
  <row align="center" gap={2} wrap>
    <button onClick={()=>GenUI.issueNewTurn(hthM90ChoicePacket(ui.panel,'yes'))}>Yes — Open Door</button>
    <button color="secondary" variant="outline" onClick={()=>GenUI.issueNewTurn(hthM90ChoicePacket(ui.panel,'no'))}>No — Keep Closed</button>
  </row>
</box>
{:else if ui.panel.finalChoice?.held && !ui.panel.terminal}
<box border radius="lg" padding={3} gap={2}>
  <text size="sm">The exit remains closed. You can still release Jim while he is alive, or continue speaking through the console.</text>
  <row align="center" gap={2}>
    <button onClick={()=>GenUI.issueNewTurn(hthM90ChoicePacket(ui.panel,'yes'))}>Open Door — Release Jim</button>
  </row>
</box>
{/if}
{#if !ui.panel.terminal && !ui.panel.finalChoice?.pending}
<row align="center" gap={2}>
  <button onClick={()=>GenUI.issueNewTurn(ui.draft.payload)} disabled={!ui.draft?.payload}>{ui.draft?.mode==='action'?'Submit ACTION':'Send to Jim'}</button>
  {#if ui.draft?.error}<text color="danger" size="xs">{ui.draft.error}</text>{/if}
</row>
{/if}
~~~

## Terminal story envelope (developer only)

The frozen CCTV and Jim's final fragment appear on the **fatal world turn** before SYSTEM // CONNECTION LOST. Then one AI first-person thought, then the original no-active-user / shutdown-required ritual, and stop. That beats the ordinary living response template; do not let ordinary Jim speech or Talk/ACTION buttons reappear after death. Survivor release instead follows the original no-active-user shutdown, later Jim-only decommission conversation, override/countdown and quiet end. Neither terminal route may show a test report, credit, hazard strip or ending category. Both paths use the full M89 integrated storytelling contract, which is separate from this Stage 9 control template.

## Transport handling (developer only)

Upon a user message starting H90_CHOICE:, load the last accepted full state; fetch/use the pinned M90 v8 reducer. Call hthM90ApplyChoicePacket(lastPanel, verbatimUserMessage). The helper checks revision, payload, circuit values/load, physically powered West Exit, Lab Door closure, pending/held choice, and no extra world time/hazard. If rejected, leave the full state unchanged and do not produce a fiction turn or spoil the reason. If successful, display exactly one response using the new full panel. Normal H90_INPUT continues using semantic interpretation + hthM90Step, never a client keyword parser. The original M89 full game still uses H84; this template does **not** silently change it.

## Preflight static rejection checks

Reject any response containing a visible panel metadata row; the words REV, HAZARD (followed by number), JIM X, door percent, WEST_EXIT_INTERLOCKED, ACTION_FAILED_EXIT_INTERLOCK, "West Exit interlocked", "Something else is blocking it" as an unsolicited diagnostic, or any extra game-state card. Ensure the AppBlock title does not contain a developer revision label. Ensure the current response has exactly one AppBlock and that the conditionals above govern Yes/No/held controls, and the send button is absent on pending decision. Check voice against post-turn hazard and board/spoiler knowledge gates. Use exactly the same CAMERA renderer version pinned in this template; never manipulate the approved geometry.
