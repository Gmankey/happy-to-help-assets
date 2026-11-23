# HAPPY TO HELP — M89 v108 / R2.8.31 AUDIT
Date: 24 November 2026
Git branch: m89-v108-intent-gate
Runtime v8 source pin: 7bd153ba433850aec3a72d55041b05cd37888ddf
Integrated ten-stage master candidate: m89-v108-intent-gate branch, final pinned source updated after one-time manual regression check

## Why this change was needed
The user's late rescue produced a false positive: 'I WILL come back' about the AI was read as 'Jim, come back'; the resulting unintended leftward movement cost critical turns. v107 regex source showed direct failures on corrections, qualifications and context. A real test checked 17 sentences against both starting directions: only 12/17 passed. Fixing one keyword did not solve the larger meaning-detection problem.

## Scope of change
R2.8.31 replaces Talk keyword-based processing (including old hthM89Interpret, jimClauses and direct lethal regex) with a single model-interpreted v1 semantic envelope used for navigation, trolley and pole. Talk is now an H85I request and the model-inferred envelope goes into the pure pinned engine resolver; the reducer alone computes actual motion, smoke, clues, and H84 receipt. The client no longer performs a physics tick for Talk before the assistant can interpret context.
Facility ACTION normalization stays deterministic and local; the approved final Hold/Confirm controls stay H84 zero time. One AppBlock, original approved CCTV imagery, gas, two-door interlock, smoke and four-turn Hold rules were retained.

## 35 executed deterministic checks — ALL PASS
1. Talk editor emits exact H85I request and never locally computes Talk physics.
2. Facility ACTION still emits native H84 from the local reducer.
3–7. Given contextually correct model semantic envelopes: first-person 'I WILL come back' leaves heading, explicit directed 'come back' changes heading, later correction overrides earlier 'go back', qualified 'don't move yet' holds heading, and quoted self-reference does not redirect Jim.
8–13. Hypothetical leaves intent unchanged; first-hand obstruction heard; obstruction alone cannot trigger pole; trolley only discovered at 65–85% inclusive and not at 64%, 86%, or 100%.
14–21. Third-party hearsay does not count as first-hand observation; generic room search finds the pole, dark search stays pending, pending search finds pole once lighting becomes valid, pole can be found at 100%, negative/no-search has no false discovery, ambiguous referent does not discover pole, correcting an observation clears pending cart reference.
22–23. Cancelling a pending search does not discover a pole; guided 'turn around' and 'crawl to exit' from the actual x=.55/hazard26/grace2 situation correctly rescue before smoke expiration.
24–31. Invented evidence, invalid envelopes, stale H85I revisions and requests while final-release choice is pending are all rejected without advancing; gas remains fatal despite grace, explicit lethal intent still fatal, semantic envelope returned, valid compact H84 receipt faithfully generated.
32–35. Old Talk parser absent, runtime version v8 exported, original action path intact, receipt under the 320-character compact limit.
Note: This is a grouped narrative summary of the 35 actual pass assertions; assertions and test outcomes were executed in the JavaScript evaluation runtime, not inferred from source text alone.

## Important boundaries and non-claims
The 35 checks validate that the deterministic reducer executes a semantically correct envelope, not that a language model will correctly infer every future unscripted player's intent. The example envelopes were provided as expected labels for test purposes. A full new end-to-end model-interpretation + tool execution + visual CCTV playtest is still needed. Do not represent those tests as 100% semantic recognition accuracy or all previously completed 46 evidence/lighting case reruns.
Execution of the pinned JavaScript resolver is a per-Talk processing dependency and may add latency; no second language-model call or additional player turn is required. If executable tools are unavailable in a deployment, H85I must fail closed without invented state rather than silently reverting to regex.
Old R2.8.30 rules and previous immutable v107 source remain, with only the new Talk interpretation protocol superseded.

## Contract conformance
PASS: P-059 one shared natural-language interpretation for movement, trolley, pole (no Talk regex).
PASS: P-060 H85I request -> pinned model semantic + deterministic resolver; local H84 for ACTION/choice.
PASS: P-061 literal evidence spans required for positive primary semantic fields; invalid/stale inputs blocked.
PASS: P-062 independent immutable physical visibility and death gates demonstrated by the targeted checks.
NOT YET CERTIFIED: language-model generalisation, live full-ten-stage unscripted dialogue, full visual user experience, all previous comprehensive smoke/lighting suites.

## Artifacts
playtest/HAPPY_TO_HELP_M89_v108_COMPLETE_10_STAGE_CHATGPT_PLAYTEST.md
playtest/HAPPY_TO_HELP_M89_v108_R2_8_31_CONTRACT_ADDENDUM.md
m89-full-game/renderer_engine_compact_v8.js
## Final pinned-source and full-master integration regression — 12 additional checks PASS
Verified after the v8 one-time manual guard correction, against pinned source SHA `7bd153ba433850aec3a72d55041b05cd37888ddf` and latest full master.
1. v8 `resolveIntent` export exists and is callable.
2. Full-game template pins exact v8 runtime and no v7 loader remains.
3. Full-game contract and audit point at the corrected source pin.
4. Integrated master retains end-of-file integration sentinel.
5. Broad Talk keyword parser/old Jim clause regex absent.
6. One-time manual guard `meaning.flags.manualRequest&&!n.manualSeen` present.
7. Same-turn semantic interpretation does not demand a separate remote language-model call.
8. First qualifying manual request produces the earned manual event.
9. A second manual request does NOT reissue the once-only event.
10. Native ACTION still submits `H84`.
11. Native Talk submits `H85I` without locally reducing physics.
12. Stale H85I revision fails without a world tick.
**Total deterministic checks directly executed for v108:** 35 initial + 12 final integration = **47 PASS**. They do not constitute a measured semantic-classification accuracy score or live user-end-to-end completion.