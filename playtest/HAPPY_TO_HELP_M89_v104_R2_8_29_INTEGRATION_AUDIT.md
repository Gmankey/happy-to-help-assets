# HAPPY TO HELP — M89 v104 — R2.8.29 integration and regression audit

**Audit date:** 24 November 2026  
**Full-game candidate:** `playtest/HAPPY_TO_HELP_M89_v104_COMPLETE_10_STAGE_CHATGPT_PLAYTEST.md`  
**Candidate commit:** `1b0d5d0c69b830bf7b8606d69da734d6ece4381a`  
**Pinned runtime (immutable):** `m89-full-game/renderer_engine_compact_v4.js` at `6033ad5d06c140ce095ff647c8a3fae4220ed3ea`  
**Expected runtime marker:** `HTH_M89_FULL_NATIVE_COMPACT_v4`  
**Authority:** `HAPPY_TO_HELP_CONTRACT_R2_8_29.txt`, P-052–P-055 and all preceding unsuperseded contract provisions.

## What changed and what did not

M89 v102 was preserved. M89 v103 integrated corrected v3 lighting visibility but an independent regression audit exposed two previously missed flaws: (1) credible-looking third-party hearsay such as `I heard someone say a cart is blocking the lab door` generated a confirmed warning; and (2) direct but unrelated doorway talk such as `I see something blocking the lab door` could accidentally trigger a pole search. The provisional v103 therefore must not be considered contract compliant.

The corrected v4 runtime applies narrow additional semantic guards to distinguish hearsay from firsthand player evidence and a room-search instruction from an obstruction observation. M89 v104 now pins that v4 runtime and updates the game file's developer-only contract notes. No edits were made to M89 v102 or v103; no emergency physics, gas, hazard, art, camera geometry, electrical costs, three endings, Stage 7 permissions or M84 receipt format were intentionally changed.

## Source/pin integration results

| Check | Result |
|---|---|
| Full-game source begins with original start marker and has complete integration end marker | PASS |
| Exactly one emergency CCTV AppBlock in the game file | PASS |
| Both CDN and fallback JS URLs point to immutable commit `6033ad5d...` and `renderer_engine_compact_v4.js` | PASS |
| Expected JS version `HTH_M89_FULL_NATIVE_COMPACT_v4` matches runtime's exported version | PASS |
| Older v3 loader URLs and expected version removed from v104 | PASS |
| Story ledger keys, original permissions, full integration and three-ending source markers retained | PASS |
| Live receiving-ChatGPT CCTV, control mounting, animation, image pins, speed or latency measured | NOT VERIFIED |

## Deterministic reducer tests

The exact pinned v4 JavaScript was fetched from the immutable GitHub commit and executed in a JavaScript isolate. The test harness accessed the real enclosed `hthM78Step` reducer through an in-memory test-only exposure; the published runtime source was not modified for test instrumentation. Each test supplied an explicit full state and valid circuit-load selection, and checked returned `ok`, events, knowledge fields, physical state and door/cart flags.

**46/46 executed test cases passed**:

| Contract group | Executed conditions | Engine result |
|---|---|---|
| LT-P-01 | Pending lab search at 0, 10, 34% | 3 PASS |
| LT-P-02 | Pending lab search at 35, 65, 85, 100% | 4 PASS |
| LT-P-03 | Search at 10%, lighting raised to 100% later | 1 PASS |
| LT-P-04 | Lighting to 100% with no prior lab search | 1 PASS |
| LT-T-01 | Grounded heard warning at 0, 35, 64% | 3 PASS |
| LT-T-02 | Warning, earned pole, light 65, 75, 85% | 3 PASS |
| LT-T-03 | Warning, earned pole, light 86, 90, 100% | 3 PASS |
| LT-T-04 | Genuine warning at 100%, then lighting to 75% | 1 PASS |
| LT-T-05 | Lights 75% alone without earned report | 1 PASS |
| LT-T-06 | Recognised trolley without earned pole | 1 PASS |
| LT-T-07 | Trolley cleared, Lab Door remains at 16% | 1 PASS |
| LT-S-01 | Exact original speculative utterance at 75 and 100% | 2 PASS |
| LT-S-02 | Twelve quoted, uncertain, negative and third-party-hearsay utterances | 12 PASS |
| P-052–055 | Five genuine doorway observations/questions do not conjure a lab pole | 5 PASS |
| P-053 | Unjammed door and unpowered lighting each block trolley recognition | 2 PASS |
| ACTION | Invalid action rejected | 1 PASS |
| P-054 | Hold position and post-hazard weakness each prevent clearance | 2 PASS |
| **Total** | | **46 PASS** |

### Concrete regressions resolved

- At lighting 100%, a speculative `no idea. maybe somethign blocking the door?` does not confirm a warning, identify the trolley, remove the cart or advance incorrectly through those milestones.
- At 65% and 85%, an earned doorway clue can identify the cart. At 64% and 86%, recognition is blocked, preserving both threshold edges.
- A genuine affirmative doorway report at 100% is remembered as *heard* evidence; it remains insufficient to confirm the cart until lighting returns to 65–85%.
- A player observation of a doorway obstruction at 75% may legitimately progress the cart clue but no longer creates a pole discovery. The pole requires an independent authorised search.
- Hearsay such as `Someone else said a cart is blocking the lab door` is not upgraded to `heardDoorwayWarning`, `jimCart` or `playerCart`.

## What remains unverified — no release claim

**ENGINE PASS is NOT a complete end-to-end game pass.** The following must be tested in an actual receiving ChatGPT session using the v104 full-game file:

1. Jim's audible, natural 'too dark' and 'too bright' responses after each relevant failed investigation, with no numeric threshold leak or unearned hint (LT-S-03 and LT-S-04; dialogue components of LT-P/T series).
2. Approved three-camera artwork, correct powered/offline feeds, pose calibration, normal tutorial brightness vs emergency glare, native Talk/ACTION field, immediate camera switching, and client first-paint latency.
3. Exact H84 transport, stale-event rejection and two-turn world state continuity with runtime v4 loaded; do not infer this from source markers.
4. Full ten-stage narrative, Stage 7 earned permissions, accurate relationship continuity, all three terminal branches and one-time post-story credits.
5. A live Stage 9 test from the pre-error revision 6 / hazard 7 / trolley-present checkpoint, rejecting the earlier invalid rev 7 transition. Do not treat the out-of-chat deterministic cases as advancing the played story.

**Disposition: M89 v104 is an integrated, deterministic-engine-audited PLAYTEST CANDIDATE; not release-approved.** Every subsequent full-game candidate must explicitly preserve this contract and rerun the boundary and semantic tests.
