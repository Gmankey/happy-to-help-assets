# HAPPY TO HELP — M89 v110 FULL-CONTRACT AUDIT
24 November 2026. Status: **SOURCE AND TARGETED DETERMINISTIC REGRESSION PASS; FULL LIVE ACCEPTANCE NOT VERIFIED; NOT RELEASE-APPROVED.**

## Authority and methodology
Directly consulted the user's original authoritative Library file `HAPPY_TO_HELP_CONTRACT_R2_8_29.txt` (259,537 bytes; 994 lines of inherited/amended rules), plus the previously approved R2.8.30, R2.8.31 and R2.8.32 addenda, the full ten-stage M89 v108 candidate and its pinned native v8 source. Compared actual runtime behavior using source-level JavaScript execution rather than interpreting a transcript as proof. Corrected contract breaches on an immutable new branch without rewriting earlier accepted builds.
Updated source: `m89-full-game/renderer_engine_compact_v10.js` pinned at commit `eaf83deb8042ae7c9e8b2f01f6977cb4212a5713`.
Updated full ten-stage candidate: `playtest/HAPPY_TO_HELP_M89_v110_COMPLETE_10_STAGE_CHATGPT_PLAYTEST.md`.

## Defects actually found and repaired
**DEFECT 1 — G-011 (severity: contract breach).** v108 reduced Hold grace only by 1 for a direct lethal Talk. At hazard18/grace4 the lethal statement raised hazard to21 but left grace3, violating the original 'explicit lethal intent nullifies remaining grace' rule. In v10 it correctly sets grace to0 on that same accepted world turn while preserving the existing 3x hazard/extraction calculation. Nonlethal ordinary grace and zero-time release remain unchanged.
**DEFECT 2 — G-002/G-003 (severity: contract breach).** v108 DIL rendered 'OPEN WEST EXIT?' with one direct 'Yes — Open' and 'No — Keep Closed'; this broke the mandatory two-stage accidental-release safeguard. v110 full-game UI now shows the exact initial Open Door / Keep Closed choices, locally arms the Confirm open doors? / No / Yes second view, cancels No zero-time and sends CONFIRM RELEASE JIM only on second-stage Yes. The engine already validates that a final choice is pending, switch is powered and lab interlock is satisfied. This UI correction has passed source-template checks; real receiving-client click behavior is NOT VERIFIED.
**DEFECT 3 — A-41 (severity: original-contract acceptance).** v108/v109 always asked for farewell once hazard>=22 regardless of remaining smoke turns. That disregarded powered extraction and unused grace. v10 now requests only when projected post-turn living ordinary turns <=5, including extraction rate and unused Hold grace, with the original hazard22 timing preserved in plain smoke. Family speech is due on the next living accepted world turn; rescue and sudden death cannot trigger a false family-farewell request/delivery. Separate real generated-family speech quality remains UNVERIFIED.
**DEFECT 4 — conflicting H84-only text in integrated master (documentation drift).** Stage 9 legacy text referred to 'H84 receipt only' for Talk, contradicting v108 H85I model-intent architecture. Reconciled in v109/v110: H85I is a request, model meaning gets resolved by the pinned native engine, while ACTION/choice still use locally computed H84 receipts.

## Executed regression observations
**710 preserved local mechanic checks PASS**: 630 facility ACTION state-transition comparisons and 80 zero-time final-choice state comparisons between v8 and v9 had zero differences, beyond the intentionally corrected lethal-grace treatment on qualifying Talk.
**27 original-contract numeric/intent probes on v8: 26 PASS, 1 FAIL before repair.** 7 pole boundaries (0/10/34/35/65/85/100); 9 trolley boundaries (0/35/64/65/75/85/86/90/100); five checks that cart is not prematurely cleared without already earned pole/identification; dark pending search resumes at legal lighting; no light-only discovery; speculative and hearsay input treated as none; earned auto-clear and door remains jammed. The single failure was explicit lethal intent leaving 3 unused grace, fixed in v9/v10.
**8 additional puzzle/hazard tests on v9 PASS**: firsthand obstruction remembered at glare100, subsequent light75 automatically identifies trolley; light-only setting does not expose cart/pole; identified cart without pole does not clear; identified cart+pole clears while keeping door at16%; powered extraction lowers smoke advance to0.5; gas is fatal after two powered time-bearing turns despite grace.
**14 adaptive farewell and transport checks on v10 PASS**: normal smoke hazard22 request; next living turn speech event; no repeat; extraction postpones until projected five half-hazard turns; Hold grace shifts the request; late protected smoke still gives a living requested and next-turn farewell; no family farewell triggered after real rescue or sudden gas/smoke death; G-011 direct lethal zeroes grace; H85I Talk and H84 ACTION remain distinct.
**13 v110 source/contract/UI invariants checked: 12 PASS, 1 test-fixture typo.** Rechecking the sole failed source-diff assertion showed the compared expected and actual v9 strings were byte-identical (63,504 characters). The test fixture omitted a closing parenthesis in its string replacement, not a runtime discrepancy. v110 full-game loader pins v10, local two-stage UI contains the exact labels, direct initial Yes is absent, and the integration end sentinel is intact.
**Prior 47 focused v108 checks PASS**: proof of semantic-envelope validation, typed H85I request handoff, invalid evidence/stale rejection, physical visibility gates, recovery/late rescue and unchanged local ACTION transport. These checks are not independent natural-language model accuracy measurements.

## Mandatory R2.8.29 QA matrix disposition
LT-P-01/P-02/P-03/P-04: ENGINE PASS based on threshold/pending/light-only tests; sensory spoken dialogue NOT VERIFIED.
LT-T-01/T-02/T-03/T-04/T-05/T-06/T-07: ENGINE PASS based on explicit numeric threshold tests, doorway warning persistence, auto-clear and distinct door-open operation; spoken too-dark/too-bright feedback NOT VERIFIED.
LT-S-01/S-02: SEMANTIC ENVELOPE/ENGINE-GATE PASS when correctly classified; generalisation of actual ChatGPT classification NOT VERIFIED.
LT-S-03/S-04: Not certified; lighting-dependent natural dialogue and one-time hint behaviour cannot be established from source-only tests.
G-002/G-003: Native DIL template now conforms in code, but client two-click sequence and local No cancellation NOT LIVE VERIFIED.
G-011: ENGINE PASS in v9/v10 following explicit cancel-all correction.
A-41: ENGINE PASS on 14 v10 targeted checks; prose timing and quality NOT LIVE VERIFIED.

## Remaining open acceptance gates — DO NOT CALL FULL CONTRACT PASSED
1. Live receiving-ChatGPT semantic interpretation: must correctly resolve difficult unscripted Talk references, corrections, pronouns, hearsay, negations, indirect searches and ambiguous mixed intent in one coherent world turn. Engine checks used manually supplied expected semantic envelopes; real language-model accuracy unmeasured.
2. Jim's *actual audible speech* at too-dark/too-bright thresholds and family farewell. The mandatory R2.8.29 QA demands human inspection of those outputs. Neither source strings nor deterministic event fields establish an audible Jim-response pass.
3. Exact first-stage/second-stage native button render and first-paint latency on actual ChatGPT Android/web client. UI source now respects G-002/G-003; actual click sequence/No cancellation/absence of input staggering remains unmeasured.
4. Actual approved background/image bytes and v3 48-pose placement/lighting visual comparisons were not re-rendered or pixel-tested in this audit. Source references and shader code were kept; that is not an asset/hash acceptance pass.
5. Full Q-008 end-to-end unscripted ten-stage trials: success, refused exit then rescue, prolonged farewell and death, sudden inert-gas death, overdose, overload, failed actions, neutral/reversed travel, board argument, organically varied character inner thoughts, multiple distinct endings, and all continuity/stage chronology. Not executed in a real receiving client.
6. P-012/P-013 one-time optional hint flags are preserved in panel and contract text, but actual one-time voiced hint occurrence and flag synchronization are not established by v10 engine regression. Optional hints must not become repeated/unearned coaching.
7. R2.8.30's specific 1-in-5 seeded disorientation choice was an implementation default, not a user-specified numeric probability. Actual live frequency and player understanding have not been measured; do not claim the numeric probability was directly requested by the user.

## Conclusion
Engineering audit catches and repairs specific drift against the ORIGINAL contract, rather than only checking newly added clauses. v110 deterministic candidate meets the targeted tested physics rules; **it cannot honestly be certified as full-contract compliant without the required in-chat story and UI acceptance runs.** Do not silently change puzzle, art, hint, timing, or narrative rules while resolving remaining gates.

## Links
Master: `playtest/HAPPY_TO_HELP_M89_v110_COMPLETE_10_STAGE_CHATGPT_PLAYTEST.md`
Engine: `m89-full-game/renderer_engine_compact_v10.js` pinned `eaf83deb8042ae7c9e8b2f01f6977cb4212a5713`
Addendum: `playtest/HAPPY_TO_HELP_M89_v110_R2_8_33_CONTRACT_ADDENDUM.md`
Prior audits and original authoritative R2.8.29 Library contract remain unchanged.