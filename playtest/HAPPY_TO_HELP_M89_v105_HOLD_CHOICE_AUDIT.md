# HAPPY TO HELP — M89 v105 — Hold-choice integration audit
Date: 24 November 2026
Contract authority: HAPPY_TO_HELP_CONTRACT_R2_8_29.txt; original approved M89 choice behavior and post-Hold flow.
Playtest: `playtest/HAPPY_TO_HELP_M89_v105_COMPLETE_10_STAGE_CHATGPT_PLAYTEST.md`
Immutable runtime: `m89-full-game/renderer_engine_compact_v5.js` at commit `8bf696567a50402e075491d0063acf3c2a2575a4`
Full-game integration commit: `65e2624eec2722c0eaccd1a61f45609c34dd4221`

## Bug found at active playtest checkpoint
At revision 25, the player selected `Keep West Exit Closed`, generating zero-time H84 receipt `H84:25>26;sw=n/n;b=1;ca=90;tr=0;cp;fcg=4;e=m;z=1`.
The v4 renderer displayed normal Talk/ACTION controls after the choice but `hthM84MakeDraft` rejected any normal input when `panel.finalChoice.held` was true. This contradicts explicit approved behavior: Hold restores ordinary talk/action, and the next exit attempt requires a new world-turn `ACTION: open west exit`, followed by a fresh Yes/No zero-time choice.

## Corrective source changes
- Change the input validator to enter final-choice mode only when `finalChoice.pending`, not when `finalChoice.held`.
- Restrict `choice-confirm` to actually pending final choice; a stale held state must never provide a free release bypass.
- No other reducer behavior, physics, cameras, lighting thresholds, gas rules, hazard rules, or assets intentionally modified.
- Full-game v105 pinned to the immutable new v5 engine and matching version marker.

## Runtime tests, executed using the actual source code in JS isolate
PASS: After Hold, normal Talk draft generates a valid H84 payload.
PASS: After Hold, ordinary ACTION `Open west exit` generates a valid H84 payload.
PASS: A direct `CONFIRM RELEASE JIM` in held-but-not-pending state is rejected.
PASS: A fresh `openWest` action after Hold re-offers final choice (does not open the exit).
PASS: The repeat action consumes one normal world turn and advances revision/world sequence.
PASS: One grace turn is consumed by the repeat action; hazard does not increase on a grace-protected turn.
PASS: Exported runtime version marker is `HTH_M89_FULL_NATIVE_COMPACT_v5`.
The prior M89 v104 integration audit documents 46/46 deterministic P-052–P-055 lighting and evidence cases for v4. The v5 update changes only the two choice-handling guards above, not pole/trolley semantics.

## Resumed game state, no invented turn
The validated Hold packet is **zero-time**: revision 26, world sequence 24, turns 24, hazard 26, exit shut, laboratory door shut, Jim crouched near West Exit at x=0.83, no rescue or death. Final-choice state: offered true, pending false, answered false, used true, held true, grace 4. The player may again talk or use ACTION, with no separate one-click rescue. Full visual reception still depends on the client.