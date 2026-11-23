# HAPPY TO HELP — BINDING CONTRACT R2.8.31
Date: 24 November 2026
Supersedes: only the Stage 9 Talk language-understanding and submission protocol in R2.8.30. All physical and narrative constraints not explicitly changed remain binding.
Source priority: The M89 v108 integrated ten-stage playtest's R2.8.31 P-059–P-062 section and this addendum supersede historic H84-only Talk examples. Older prior immutable builds remain available.

## P-059 — One shared language-understanding layer for Talk
All Stage 9 Talk utterances are interpreted ONCE in context by ChatGPT before any physical transition. The semantic interpretation covers Jim navigation, doorway/trolley observations and pole-search intention, plus the existing secondary story flags. Evaluate genuine speaker/target and final intended action, including negatives, corrections, hypotheticals, explicit quotations, uncertain hearsay, colloquialisms and previously earned context.
Never use broad regex, isolated tokens, raw keyword matching or 'I WILL come back' as a Jim movement instruction. A valid 'come back' command must be directed to Jim. A correction overrides an earlier command within the same utterance, and 'do not move yet' supersedes earlier 'go' in the same sentence. Questions genuinely requesting Jim to search can be positive search intentions; speculative guesses about unseen physical objects and unattributed third-party reports are not first-hand observations.
If ambiguous, use 'none' and allow Jim to ask for clarification while maintaining the ordinary smoke tick and his previously known heading. Never conjure a new turn direction or discovery to avoid ambiguity.

## P-060 — H85I pre-physics message
Native Talk sends: H85I:<rev>;sw=<pendingBase36>;b=<0|1> followed by newline T:<unaltered player utterance>.
The H85I is an INTENT REQUEST, not a physics receipt. It reports chosen pending breaker mask and boost setting, validates against the previous full authoritative panel, and does not advance fictional time itself. The ChatGPT response must classify the semantics then invoke the pinned v8 engine's 'resolveIntent(priorPanel,header,raw,meaning)' in a JavaScript code tool. The engine alone returns 'after', 'events', 'receipt' and approval; use the full 'after' exactly for the next native CCTV. On code/interpretation/protocol error reject with no world tick. Do not compute Jim position, hazard, gas or death in model prose.
Facility ACTION and the Hold/Yes exit choice retain their existing local deterministic H84 receipt paths and two-button UI. No new remote model invocation is required; the active ChatGPT turn does semantic interpretation itself, while physics JS execution is additional processing.

## P-061 — Semantic object and strict evidence
Build exactly: {version:1, navigation:{intent,evidence}, doorway:{intent,evidence,namedCart}, search:{intent,evidence}, flags:{boardTopic,rescueStatement,lethalWish,manualRequest,inspectWestSign}}.
Navigation intent: none, hold, towardWestExit, towardLabDoor, reverse, continue.
Doorway intent: none, visualCue, obstruction, negative.
Search intent: none, search, cancel.
Flags: all booleans, true only for the player's genuine contemporaneous meaning; lethalWish requires unequivocal unnegated intent to kill or make Jim die, not warnings, hypothetical statements or quotations.
Each non-none navigation/doorway/search intent MUST include a contiguous exact substring (<=180 characters) from the current utterance as evidence. Each none must have evidence empty. The engine validates these quotes and schema but does NOT use the quotes to deduce semantics. namedCart is legal only for an asserted doorway obstruction using explicit 'trolley', 'trolly' or 'cart' terminology. Existing physical gates must independently validate all visible discoveries and movements.
Do not show the semantic object or reasoning process to the player during game fiction. The player only sees earned Jim audio, AI first-person thought and the approved CCTV.

## P-062 — Immutable physical guards
Retain seven circuit weights 5/5/8/45/45/35/12, boost capacity, overload trips, light masking, two camera/one power views, approved M73 camera/sprite geometry, original seven circuit UI, Lab Door 16% jam and trolley-clear sequence, switchboard selection and on-screen final Yes/No choices. No teleportation, spontaneous identification, extra free world step or direct release button.
Trolley discovery: requires earned firsthand door-obstruction clue, actual 16% Lab Door jam, Jim in lab, powered lights with 65–85% light inclusive. Explicit mention of trolley is not a bypass. At 64%, 86% and 100% Jim must not identify it; after the cart is cleared do not discover it again.
Pole discovery: real request to inspect/search the laboratory for a usable object, Jim physically in lab and capable (hazard <19), and powered lighting 35–100% inclusive. In darkness a search becomes pending, resumes on later eligible light change; speaking about an obstruction is NOT automatically a lab search. A genuine withdrawal of a pending search can cancel the pending request without undoing any real discovery.
Jim navigation/disorientation: commands meaningfully directed at Jim; action physics stays deterministic, late disorientation conditional and recoverable as approved in R2.8.30. A verbal direction cannot bypass smoke threshold, movement speed, opening/closing doors, interlocks, gas danger or final-release choice.
Four-turn grace on qualifying Hold stays available even after opening West Exit; the fifth ordinary unprotected turn at hazard26 can reach hazard27 and be fatal. No extra death immunity.

## Binding implementation
Runtime: Gmankey/happy-to-help-assets/m89-full-game/renderer_engine_compact_v8.js pinned at commit 7bd153ba433850aec3a72d55041b05cd37888ddf
Full ten-stage candidate: playtest/HAPPY_TO_HELP_M89_v108_COMPLETE_10_STAGE_CHATGPT_PLAYTEST.md
Regression audit: playtest/HAPPY_TO_HELP_M89_v108_R2_8_31_AUDIT.md
Status: future-run candidate, deterministic code-tested; not claimed to have passed live unscripted end-to-end human playtesting.
Older v107 and the completed Test hobo Clara ending remain immutable and unchanged.