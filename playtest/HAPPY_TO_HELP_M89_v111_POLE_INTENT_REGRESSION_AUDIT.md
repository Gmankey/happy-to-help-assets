# HAPPY TO HELP — M89 v111 — pole intent regression audit
25 November 2026

## Defect reconstructed
In Stage 9 the player stated, "Ooo it's dark but my eyes are x-ray vision. I see a pole in the room." at 10% lighting. The prior model semantic interpretation mistakenly supplied `search.intent="none"`; consequently `puzzle.pendingPoleSearch=false`. At 36% lighting Jim did not discover the pole, and another player mention was needed. This was a real **FAIL** of the already-approved R2.8.29 P-052, P-054 and mandatory LT-P-03 behaviours, not an intended requirement to repeat the clue.

## Narrow repair
A credible firsthand affirmative lab-pole sighting addressed to Jim counts as an implicit request to verify/search. Under 35% light, that search remains pending. As soon as powered lighting reaches 35–100% on a later accepted turn with Jim capable in the lab, the unchanged physical reducer autonomously produces `POLE_FOUND`. An unearned lighting change never reveals the pole. The v11 semantic validation guard catches when the meaning pass mistakenly returns `search.intent="none"` for a clearly affirmative first-person pole observation: reject before time passes and reinterpret the **same message** with a verbatim search-evidence quote. The guard itself cannot grant the pole. Clear negation, reported speech, hypothetical, speculation, quoted text, withdrawal, explicit no-search instructions and out-of-lab contexts remain protected.

## Verification
- **25/25 targeted checks passed**: exact utterance with no-search meaning rejected without tick; corrected utterance queues pending search at 10%; ACTION lighting 36% finds pole automatically; pending light thresholds 0/10/34 not found, 35/36/65/85/100 found; no pending search means no light-only discovery; exclusions for negative, quoted, speculative, hearsay, withdrawn, out-of-room and unrelated statements; normal Talk unchanged.
- **12/12 committed-release replay checks passed**: retrieved exact pinned GitHub v11 code and replayed a realistic corrected chain. At 10% Jim receives the pole observation and queues investigation; lighting ACTION 36% yields `LIGHTING_SET` plus `POLE_FOUND`. An affirmative doorway obstruction report is remembered; at 65% the door must first jam at 16% before trolley identification; with the already-earned pole, Jim then automatically clears the trolley in the same accepted turn, with lab door remaining at 16%. Unpowered door opening still fails.
- **Source-scope audit passed**: mechanically reversing just the v11 version string, the one context parameter/call, and the validation guard yields the prior v10 file **byte-for-byte**, proving the physics/puzzle reducer and existing renderer were otherwise unchanged. R2.8.29 35–100% pole, 65–85% trolley, smoke, power, gas, movement, final choice, other natural-language intents and visual art all retain their previous source implementations.

## Release control
- Runtime: `m89-full-game/renderer_engine_compact_v11.js` at immutable commit `88ee29e82c284d46a931c3096c8142a5d0d20582`
- Complete new master: `playtest/HAPPY_TO_HELP_M89_v111_COMPLETE_10_STAGE_CHATGPT_PLAYTEST.md`
- Branch: `m89-v111-pole-intent-audit`
- Prior v110 release and original locked R2.8.29 contract remain untouched.

**Limit:** Recorded source-level regression does not itself certify client-specific live CCTV visuals or every possible phrasing. The prior 10%→36% playtest remains classified as a genuine interpretation failure; the corrected release passes deterministic replay.
