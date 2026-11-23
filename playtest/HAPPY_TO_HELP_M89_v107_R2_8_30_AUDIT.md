# HAPPY TO HELP — M89 v107 / R2.8.30 AUDIT
Date: 24 November 2026
Branch: m89-v107-navigation-grace
Native engine: m89-full-game/renderer_engine_compact_v7.js @ a1e2b2ad89501155986b99bb0a77c226e871b1a1
Master: playtest/HAPPY_TO_HELP_M89_v107_COMPLETE_10_STAGE_CHATGPT_PLAYTEST.md

## Exact live-playtest timeline
Hold receipt H84:25>26: hazard 26, grant fcg=4, zero-time.
Threat Talk H84:26>27: engine misunderstood first-person 'I WILL come back'; Jim went from x=.83 to x=.69 toward lab; fcg=3.
Open ACTION H84:27>28: Jim continued toward lab x=.55; fcg=2.
Yes choice H84:28>29: West Exit opened but old reducer and native DIL Yes forcibly reset fcg=0.
Final Talk H84:29>30: smoke hazard rose to 27 and Jim died before reaching the open exit.
The completed historical playthrough remains unchanged.

## Root-cause fixes
P-056: replace broad substring commands with grammar/subject-aware Jim-directed clauses; first-person AI return-threat no longer steers Jim.
P-057: optional severe-smoke disorientation with reproducible 1-in-5 eligible-turn roll, at most once, only if plausible smoke window remains. Reorient via explicit Jim-directed Talk; no automatic death, no teleportation, no extra risk override.
P-058: keep a full four-turn one-time smoke grace across both closed and opened exit states. Zero-time Yes preserves the balance; native Yes H84 packet no longer carries fcg=0. Actual rescue conditions unchanged.
H84 fields jdi/jdo and new event codes 11/12 added without shifting previous codes. No other puzzle/visual/gas rules deliberately modified.

## Regression checks, actually executed
First suite: 12/12 PASS. Tested first-person threat does not turn Jim; Jim-directed back instruction does; Hold/Yes behavior; conditional disorientation and its recovery; missing grace blocks near-lethal disorientation; H84 scalar encoding; v7 version export; and two-guided-turn rescue from the actual x=.55/hazard26 state with two grace turns remaining.
Second suite: 19/19 PASS. Validated zero-time Hold grants 4; receipt encodes it; repeat Hold does not replenish; four ordinary protected turns consume 4 to 0; fifth ordinary turn kills at hazard27; server and native DIL Yes/No receipts match exactly; Yes preserves 2 remaining grace; immediate rescue at West Exit still functions; player-guided rescue in 2 turns; gas remains lethal despite grace; explicit lethal statement remains lethal; event codes append; runtime pin and file end marker are intact; compact receipt length <320.
Total: 31 PASS across two suites.
Previous v104 lighting/evidence tests (46) were not rerun; underlying gates were untouched. Runtime tests do not substitute for unscripted narrative and visual playtesting.

## Audit contract
These exact changes were approved by the user. They are written into the top-priority R2.8.30 section of the v107 integrated full-game candidate and in the contract addendum. Future game turns must honor the actual native receipt, not improvise physics.